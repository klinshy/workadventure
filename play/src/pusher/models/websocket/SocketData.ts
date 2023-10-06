import type { ClientDuplexStream } from "@grpc/grpc-js";
import type { compressors } from "hyper-express";
import type {
    MucRoomDefinition,
    ApplicationDefinitionInterface,
    CompanionTextureMessage,
    SubMessage,
    BatchMessage,
    PusherToBackMessage,
    ServerToClientMessage,
    BackToPusherSpaceMessage,
    PusherToBackSpaceMessage,
    SpaceFilterMessage,
    SpaceUser,
    CharacterTextureMessage,
    ErrorApiData,
} from "@workadventure/messages";
import { AvailabilityStatus } from "@workadventure/messages";
import type { Zone } from "../Zone";
import type { PusherRoom } from "../PusherRoom";
import { CustomJsonReplacerInterface } from "../CustomJsonReplacerInterface";
import { Space } from "../Space";
import type { ViewportInterface } from "./ViewportMessage";
import type { PointInterface } from "./PointInterface";
import { WASocketData } from "./WASocketData";

export type BackConnection = ClientDuplexStream<PusherToBackMessage, ServerToClientMessage>;
export type BackSpaceConnection_ = ClientDuplexStream<PusherToBackSpaceMessage, BackToPusherSpaceMessage>;

export interface BackSpaceConnection extends BackSpaceConnection_ {
    pingTimeout: NodeJS.Timeout | undefined;
}

export interface UserSocketData extends WASocketData {
    rejected: false;
    token: string;
    roomId: string;
    userUuid: string; // A unique identifier for this user
    userJid: string;
    isLogged: boolean;
    IPAddress: string; // IP address
    name: string;
    characterTextures: CharacterTextureMessage[];
    position: PointInterface;
    viewport: ViewportInterface;
    companionTexture?: CompanionTextureMessage;
    availabilityStatus: AvailabilityStatus;
    lastCommandId?: string;
    /**
     * Pushes an event that will be sent in the next batch of events
     */
    // emitInBatch: (payload: SubMessage) => void;
    // batchedMessages: BatchMessage;
    // batchTimeout: NodeJS.Timeout | null;
    messages: unknown[];
    tags: string[];
    visitCardUrl: string | null;
    // backConnection?: BackConnection;
    // listenedZones: Set<Zone>;
    userRoomToken: string | undefined;
    // pusherRoom: PusherRoom | undefined;
    jabberId: string;
    jabberPassword: string | undefined | null;
    activatedInviteUser: boolean | undefined;
    mucRooms?: Array<MucRoomDefinition>;
    applications?: Array<ApplicationDefinitionInterface> | null;
    canEdit: boolean;
    spaceUser: SpaceUser;
    // spaces: Space[];
    // spacesFilters: Map<string, SpaceFilterMessage[]>;
    // cameraState?: boolean;
    // microphoneState?: boolean;
    // screenSharingState?: boolean;
    // megaphoneState?: boolean;
}

export type FailedInvalidData = {
    rejected: true;
    reason: "tokenInvalid" | "invalidVersion" | null;
    message: string;
    status: number;
    roomId: string;
};

export type FailedErrorData = {
    rejected: true;
    reason: "error";
    status: number;
    error: ErrorApiData;
};

export type FailedInvalidTextureData = {
    rejected: true;
    reason: "invalidTexture";
    entityType: "character" | "companion";
};

export type FailedData = FailedInvalidData | FailedErrorData | FailedInvalidTextureData;
export type SocketData = UserSocketData | FailedData;