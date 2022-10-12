import { DeepPartial } from "../../Utils/DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    input: {
        name: {
            placeholder: "Entrez votre nom",
            empty: "Le nom est vide",
        },
    },
    terms: 'En continuant, vous acceptez nos {links}.',
    termsOfUse: "nos conditions d'utilisation",
    privacyPolicy: "notre politique de confidentialité",
    cookiePolicy: "notre politique relative aux cookies",
    continue: "Continuer",
};

export default login;
