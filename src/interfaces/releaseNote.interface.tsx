export interface ReleaseNoteData {
    version: string;
    date: string;
    content: Content[];
}

export interface Content {
    tag: RNTag;
    content: string[];
}

export type RNTag = "new" | "featured" | "changed" | "fixed" | "deprecated" | "bug";

export interface ReleaseNoteColumnData {
    key: number;
    tag: RNTag;
    show: boolean;
}
export interface RNColumnContentData {
    content: string;
    issue?: string;
    key: number;
}
