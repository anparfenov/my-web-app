import { router } from '@/router';
import { cd, pwd, ls, clear, exit } from "./index";

export enum COMMAND {
    CD = "cd",
    PWD = "pwd",
    LS = "ls",
    CLEAR = "clear",
    EXIT = "exit",
};

export enum OPERATION {
    AND = "and",
    OR = "or",
    XOR = "xor",
    NEXT = "next",
};

/*
 * run a terminal command, it must be run in vue setup method
 * @param {Array<{command: string, args: string}>} commandList
 * @return { string } output
 */
export async function runCommand(command: TERMINAL.Token) {
    let res;
    if (command.name === COMMAND.CD) {
        res = await cd(router, command.args);
    } else if (command.name === COMMAND.PWD) {
        res = pwd(command.args);
    } else if (command.name === COMMAND.LS) {
        res = ls(command.args);
    } else if (command.name === COMMAND.CLEAR) {
        res = clear(command.args);
    } else if (command.name === COMMAND.EXIT) {
        res = exit(command.args);
    }
    return res;
}

const commandRegex = /^(cd|pwd|ls|clear|exit)$/;
const wordRegex = /(\w|\d|-|_|\.|,|:|\/)/;
const splitRegex = /([;&|])/;

export function parse(line: string): Array<TERMINAL.Token> {
    const tokens: Array<TERMINAL.Token> = [];
    if (!line) {
        return tokens;
    }
    const splitted = line.split("");
    for (let i = 0; i < splitted.length; i++) {
        if (wordRegex.test(splitted[i])) {
            let str = "";
            while (wordRegex.test(splitted[i]) && i < splitted.length) {
                str += splitted[i];
                i++;
            }
            if (commandRegex.test(str)) {
                let node = {
                    type: "command",
                    name: str as OPERATION,
                    args: [] as Array<string>,
                };
                let arg = "";
                // loop till splitted char or end of line
                while (!splitRegex.test(splitted[i]) && i < splitted.length) {
                    while (wordRegex.test(splitted[i]) && i < splitted.length) {
                        arg += splitted[i];
                        i++;
                    }
                    if (/\s/.test(splitted[i])) {
                        i++;
                    }
                    if (arg) {
                        node.args.push(arg);
                    }
                }
                if (splitted.length !== i) {
                    i--;
                }
                tokens.push(node);
            } else {
                throw new Error("Expected command. Try cd, pwd, ls");
            }
        } else if (splitRegex.test(splitted[i])) {
            if (tokens.length === 0) {
                throw new Error("Expected command. Try cd, pwd, ls");
            }
            let j = 0;
            let str = "";
            while (splitRegex.test(splitted[i]) && i < splitted.length) {
                str += splitted[i];
                // split item counter
                j++;
                i++;
            }
            if (j > 2) {
                throw new Error(`Expected a command but instead found a ${splitted[i - 1]}`);
            }
            switch (str) {
                case "&&":
                    tokens.push({ type: "operation", name: OPERATION.AND });
                    break;
                case "||":
                    tokens.push({ type: "operation", name: OPERATION.XOR });
                    break;
                case ";":
                    tokens.push({ type: "operation", name: OPERATION.NEXT });
                    break;
                default:
                    throw new TypeError("No such operation");
            }
            if (splitted.length !== i) {
                i--;
            }
        }
    }
    return tokens;
}

/*
 * @param { Array<Token> } tokens - parsed commands
 * @return { Array<string> } output - command results
 */
export async function evaluate(tokens: Array<TERMINAL.Token>) {
    let output = [];
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].type === "command") {
            const res = await runCommand(tokens[i]);
            output.push(res);
        } else if (tokens[i].type === "operation") {
            if (tokens[i].name === "and") {
                if (output[output.length - 1].error) {
                    break;
                }
            } else if (tokens[i].name === "xor") {
                if (!output[output.length - 1].error) {
                    break;
                }
            }
        }
    }
    return output;
}
