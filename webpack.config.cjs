const path = require("path");

const babelPresets = [
    ["@babel/preset-env", { targets: "defaults" }],
    ["@babel/preset-react", { runtime: "automatic" }],
];

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "test"),
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: false,
                        configFile: false,
                        presets: babelPresets,
                    },
                },
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: false,
                        configFile: false,
                        presets: babelPresets,
                        plugins: ["babel-plugin-istanbul"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};
