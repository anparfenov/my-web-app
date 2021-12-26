const path = require("path");

module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.vue$": "vue-jest",
        "^.+\\js$": path.resolve(__dirname, "jest/babelTransform.js"),
        "^.+\\.css$": path.resolve(__dirname, "jest/cssTransform.js"),
    },
    transformIgnorePatterns: ["node_modules"],
    moduleFileExtensions: ["vue", "js", "json"],
};
