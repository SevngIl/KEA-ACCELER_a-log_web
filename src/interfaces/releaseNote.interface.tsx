export interface ReleaseNoteData {
    version: string;
    date: string;
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
    content: string;
    issue?: string;
    key: number;
}
