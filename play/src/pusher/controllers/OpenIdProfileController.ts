import { z } from "zod";
import { openIDClient } from "../services/OpenIDClient";
import { OPID_CLIENT_ISSUER } from "../enums/EnvironmentVariable";
import { validateQuery } from "../services/QueryValidator";
import { BaseHttpController } from "./BaseHttpController";

export class OpenIdProfileController extends BaseHttpController {
    routes(): void {
        //eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.app.get("/profile", async (req, res) => {
            const query = validateQuery(
                req,
                res,
                z.object({
                    accessToken: z.string(),
                })
            );
            if (query === undefined) {
                return;
            }

            const { accessToken } = query;

            const { email, name, profile, tags } = await openIDClient.checkTokenAuth(accessToken);
            res.atomic(() => {
                res.setHeader("Content-Type", "text/html");
                res.send(
                    this.buildHtml(
                        OPID_CLIENT_ISSUER,
                        email as string | undefined,
                        name as string | undefined,
                        profile as string | undefined,
                        tags as string[] | undefined
                    )
                );
            });
            return;
        });
    }

    buildHtml(domain: string, email?: string, name?: string, pictureUrl?: string, tags?: string[]): string {
        return `
                <!DOCTYPE>
                <html>
                    <head>
                        <style>
                            *{
                                font-family: Roboto, monospace;
                            }
                            body{
                                text-align: center;
                                color: white;
                            }
                            section{
                                margin: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <section>
                                <img src="${pictureUrl ? pictureUrl : "/static/images/logo-WA-min.png"}">
                            </section>
                            <section>
                                Profile validated by domain: <span style="font-weight: bold">${domain}</span>
                            </section>
                            <section>
                                ${
                                    email != undefined &&
                                    `<p style="margin: 0;font-size: 12px;">Your email or application id:</p><p style="margin: 0 0 5px 0;font-weight: bold;">${email}</p>`
                                }
                                ${
                                    name != undefined &&
                                    `<p style="margin: 0;font-size: 12px;">Your name:</p><p style="margin: 0 0 5px 0;font-weight: bold;">${name}</p>`
                                }
                                ${
                                    tags != undefined &&
                                    `<p style="margin: 0;font-size: 12px;">Your access right:</p><p style="margin: 0 0 5px 0;font-weight: bold;">${tags?.join(
                                        ", "
                                    )}</p>`
                                }
                                ${
                                    email == undefined && name == undefined && tags == undefined
                                        ? `<p style="margin: 0;">No information about your profile provided 😱</p>`
                                        : ""
                                }
                            </section>
                        </div>
                    </body>
                </html>
            `;
    }
}
