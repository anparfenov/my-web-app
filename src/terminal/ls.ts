import { RouteRecordRaw } from "vue-router";
import { routes } from "../router";

type Options = {
    showHiddenFiles?: boolean;
}

function parseArgs(args: Array<string>) {
    let options: Options = {};
    args.forEach((arg) => {
        if (arg === "-a") {
            options.showHiddenFiles = true;
        }
    });
    return options;
}

function buildOutput(routes: Array<RouteRecordRaw>) {
    return {
        res: routes
            .filter(route => route.path.search(/\/:/ /* find /: in path */) === -1)
            .reduce((acc, val) => acc + " " + val.path, "")
            .substring(1),
    };
}

export default function ls(args: Array<string> = []) {
    const options = parseArgs(args);
    if (options.showHiddenFiles) {
        return buildOutput(routes);
    }
    return buildOutput(routes);
}
