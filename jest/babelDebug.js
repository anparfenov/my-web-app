const fs = require("fs");
const bj = require("./babelTransform.js");

bj.process("import.meta.env.glob()", "dummy_file.js", {
    configString: fs.readFileSync("../babel.config.cjs"),
    instrument: false,
});
