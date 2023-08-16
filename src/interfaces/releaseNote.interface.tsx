import { type Counter as YorkieCounter } from 'yorkie-js-sdk'

export interface ReleaseNoteData {
    version: {
        editing: Presence[];
        content: string;
    }
    date: {
        editing: Presence[];
        content: string;
    }
    content: ReleaseNoteColumnData[];
}

export type RNTag = "new" | "featured" | "changed" | "fixed" | "deprecated" | "bug";

export interface ReleaseNoteColumnData {
    tag: RNTag;
    content: RNColumnContentData[];
    key: number;
    show?: boolean;
}
export interface RNColumnContentData {
    content: {
        editing: Presence[];
        content: string;
    }
    issue?: string;
}

export interface Peer {
    clientID: string;
    presence: {
        name: string;
        color: string;
    }
}

export interface Presence {
    name: string;
    color: string;
}