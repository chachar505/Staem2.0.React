module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        files: [
            { pattern: "test/index.js", watched: false },
            {
                pattern: "public/**/*",
                watched: false,
                included: false,
                served: true,
                nocache: true,
            },
        ],
        proxies: {
            "/animal-crossing-new-horizons.jpg": "/base/public/animal-crossing-new-horizons.jpg",
            "/cyberpunk-2077.jpg": "/base/public/cyberpunk-2077.jpg",
            "/doom-eternal.jpg": "/base/public/doom-eternal.jpg",
            "/elden-ring.jpg": "/base/public/elden-ring.jpg",
            "/forza-horizon-5.jpg": "/base/public/forza-horizon-5.jpg",
            "/god-of-war.jpg": "/base/public/god-of-war.jpg",
            "/hades.jpg": "/base/public/hades.jpg",
            "/halo-infinite.jpg": "/base/public/halo-infinite.jpg",
            "/minecraft.jpg": "/base/public/minecraft.jpg",
            "/pokemon-escarlata.jpg": "/base/public/pokemon-escarlata.jpg",
            "/portal-2.jpg": "/base/public/portal-2.jpg",
            "/red-dead-redemption-2.jpg": "/base/public/red-dead-redemption-2.jpg",
            "/resident-evil-4.jpg": "/base/public/resident-evil-4.jpg",
            "/stardew-valley.jpg": "/base/public/stardew-valley.jpg",
            "/starfield.jpg": "/base/public/starfield.jpg",
            "/street-fighter-6.jpg": "/base/public/street-fighter-6.jpg",
            "/super-mario-odyssey.jpg": "/base/public/super-mario-odyssey.jpg",
            "/the-last-of-us-part-2.jpg": "/base/public/the-last-of-us-part-2.jpg",
            "/the-witcher-3.jpg": "/base/public/the-witcher-3.jpg",
        },
        preprocessors: {
            "test/index.js": ["webpack"],
        },
        webpack: require("./webpack.config.cjs"),
        webpackMiddleware: { stats: "errors-only" },
        reporters: ["progress", "coverage"],
        coverageReporter: {
            dir: "coverage",
            reporters: [
                { type: "html", subdir: "html" },
                { type: "text-summary" },
                { type: "lcovonly", subdir: ".", file: "lcov.info" },
            ],
        },
        browsers: ["ChromeHeadless"],
        singleRun: true,
        restartOnFileChange: false,
        client: {
            jasmine: { random: false },
        },
        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-webpack"),
            require("karma-coverage"),
        ],
    });
};
