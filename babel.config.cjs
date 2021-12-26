module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    esmodules: true,
                },
                bugfixes: true,
            },
        ],
    ],
    plugins: ["@babel/plugin-syntax-import-meta"],
};
