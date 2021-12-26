import { COMMAND, OPERATION } from '@/terminal/command';

export type Token = {
    type: string;
    name: COMMAND | OPERATION;
    args?: Array<string>;
}

export as namespace TERMINAL;
