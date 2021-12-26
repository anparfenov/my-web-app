export default function exit(args) {
    if (!Array.isArray(args)) {
        throw new TypeError("args must be an array type");
    }
    if (args.length !== 0) {
        throw new Error("Expected 0 args");
    }
    return { exit: "exit" };
}
