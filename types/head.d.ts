export type HeadConfig = {
    title: string;
    description?: string;
}

export type HeadState = {
    config: HeadConfig;
}

export as namespace HEAD;
