import { parse, evaluate, deps } from "../../src/terminal/command";
import { cd, pwd, ls } from "../../src/terminal";
import { routes } from "../../src/router/index.js";

const routePaths = routes
    .filter(route => !route.path.includes(":"))
    .map(route => route.path)
    .reduce((acc, val) => acc + " " + val);

describe("terminal functions", () => {
    let windowSpy;

    beforeEach(() => {
        windowSpy = jest.spyOn(global, "window", "get");
        windowSpy.mockImplementation(() => ({
            location: {
                origin: "https://example.com",
                pathname: "/",
            },
        }));
    });

    afterEach(() => {
        windowSpy.mockRestore();
    });

    describe("parse function", () => {
        test("returns empty array on empty line", () => {
            expect(parse()).toMatchObject([]);
        });

        test("correct result with one valid command", () => {
            const command1 = "cd path";
            expect(parse(command1)).toMatchObject([
                { type: "command", name: "cd", args: ["path"] },
            ]);

            const command2 = "pwd";
            expect(parse(command2)).toMatchObject([
                { type: "command", name: "pwd", args: [] },
            ]);

            const command3 = "ls -l";
            expect(parse(command3)).toMatchObject([
                { type: "command", name: "ls", args: ["-l"] },
            ]);
        });

        test("correct result with two or more valid commands", () => {
            const command1 = "cd path && ls";
            expect(parse(command1)).toMatchObject([
                { type: "command", name: "cd", args: ["path"] },
                { type: "operation", name: "and" },
                { type: "command", name: "ls", args: [] },
            ]);

            const command2 = "pwd;ls ";
            expect(parse(command2)).toMatchObject([
                { type: "command", name: "pwd", args: [] },
                { type: "operation", name: "next" },
                { type: "command", name: "ls", args: [] },
            ]);

            const command3 = "ls -l || pwd";
            expect(parse(command3)).toMatchObject([
                { type: "command", name: "ls", args: ["-l"] },
                { type: "operation", name: "xor" },
                { type: "command", name: "pwd", args: [] },
            ]);
        });

        test("throws error on triple &", () => {
            const command = "cd path &&&";
            expect(() => parse(command)).toThrowError(
                new Error("Expected a command but instead found a &"),
            );
        });

        test("throws error if command is does exist", () => {
            const command = "cdd path";
            expect(() => parse(command)).toThrowError(
                new Error("Expected command. Try cd, pwd, ls"),
            );

            const command2 = "&& cd path";
            expect(() => parse(command2)).toThrowError(
                new Error("Expected command. Try cd, pwd, ls"),
            );
        });
        test("throws error if operation is wrong", () => {
            const command = "cd path &";
            expect(() => parse(command)).toThrowError(new Error("No such operation"));
        });
    });

    describe("cd command", () => {
        let router;
        beforeEach(() => {
            router = { back: jest.fn(), push: jest.fn() };
        });
        test("returns res object and calls push function, if path is correct", async () => {
            const args = ["home"];
            const res = await cd(router, args);
            expect(res).toMatchObject({res: ""});
            expect(router.push).toHaveBeenCalled();
        });
        test("returns res object and calls back function, if path is ..", async () => {
            const args = [".."];
            const res = await cd(router, args);
            expect(res).toMatchObject({res: ""});
            expect(router.back).toHaveBeenCalled();
        });
        test("returns error object, if path is not exits", async () => {
            const args = ["path"];
            const res = await cd(router, args);
            expect(res).toMatchObject({ error: `cd: Route /path does not exist` });
        });
        test("throws error if args is not an array", async () => {
            const args = "path";
            expect.assertions(1);
            try {
                await cd(router, args);
            } catch (e) {
                expect(e).toEqual(new TypeError("args must be an array type"));
            }
        });
        test("throws error if there are too many arguments", async () => {
            const args = ["path", "path2"];
            expect.assertions(1);
            try {
                await cd(router, args);
            } catch (e) {
                expect(e).toEqual(new Error("Too many arguments"));
            }
        });
    });

    describe("pwd command", () => {
        test("returns current window location", () => {
            expect(pwd([])).toEqual({res: "/"});
        });
        test("throws error, if args is not an array", () => {
            expect(() => pwd()).toThrowError(new Error("args must be an array type"));
        });
        test("throws error, if args is not an empty array", () => {
            expect(() => pwd(["arg"])).toThrowError(new Error("Expected 0 args"));
        });
    });

    describe("ls command", () => {
        test("returns path list", () => {
            expect(ls([]))
                .toEqual({res: routePaths});
        });
        test("returns all paths list, if -a is provided", () => {
            expect(ls(["-a"]))
                .toEqual({res: routePaths});
        });
        test("throws error, if args is not an array", () => {
            expect(() => ls()).toThrowError(new Error("args must be an array type"));
        });
    });

    describe("evaluate function", () => {

        test("calls", async () => {
            deps.useRouter = () => ({back: jest.fn(), push: jest.fn()});
            // $ pwd; ls
            const tokens = [
                { type: "command", name: "pwd", args: [] },
                { type: "operation", name: "next" },
                { type: "command", name: "ls", args: [] },
            ];
            expect.assertions(1);
            const res = await evaluate(tokens);
            expect(res).toMatchObject([{res: "/"}, {res: routePaths}]);
        });
    });
});
