import { Router } from "vue-router"
import { routes } from "../router";

function resolvePath(path: string) {
    const splittedPath = path.split("/");
    const res = splittedPath.filter((item, i ,arr) => {
        if (arr[i+1] === ".." || item === "..") {
            return false;
        }
        return true;
    })
        .reduce((acc, val) => acc + "/" + val);

    if (res) {
        return res;
    }
    return "/";
}

/*
 * changes window location to path in args
 */
export default async function cd(router: Router, args: Array<string> = []): Promise<unknown> {
    if (!Array.isArray(args)) {
        throw new TypeError("args must be an array type");
    }
    if (args.length > 1) {
        throw new Error("Too many arguments");
    }

    const res = { res: "" };
    if (args[0].length === 0) {
        // routes[0] - home path
        await router.push(routes[0]);
        return res;
    }

    if (args[0] === ".") {
        return res;
    }

    if (args[0] === "..") {
        router.back();
        return res;
    }

    let str = args[0];
    if (str[0] !== "/" && window.location.pathname !== "/") {
        str = "/" + str;
    }

    const fullPath = window.location.pathname + str;
    const resolvedPath = resolvePath(fullPath);
    const foundRoute = routes.find(route => route.path === resolvedPath);
    if (foundRoute) {
        await router.push(foundRoute);
        return res;
    }

    return { error: `cd: Route ${resolvedPath} does not exist` };
}
