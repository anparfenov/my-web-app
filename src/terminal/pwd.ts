export default function pwd(args: Array<string> = []) {
  if (args.length !== 0) {
    throw new Error("Expected 0 args");
  }
  return { res: window.location.pathname };
}
