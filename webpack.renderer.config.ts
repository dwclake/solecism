import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

import webpack from "webpack";
import path from "path";

const srcPath = path.resolve(__dirname, "src");
const mainPath = path.resolve(__dirname, "main");

/*
  Make sure the CSS Modules rule appears BEFORE the global rule,
  and exclude module files from the global rule. This prevents
  files like `Foo.module.scss` from being processed twice.
*/
rules.push(
    // CSS Modules (SCSS) - processed first
    {
        test: /\.module\.(scss|css)$/,
        include: srcPath,
        use: [
            { loader: "style-loader" },
            {
                loader: "css-loader",
                options: {
                    importLoaders: 2,
                    modules: {
                        localIdentName: "[name]__[local]___[hash:base64:5]"
                    }
                }
            },
            { loader: "postcss-loader" },
            { loader: "sass-loader" }
        ]
    },
    // Global styles (non-modules) - exclude module files
    {
        test: /\.(scss|css)$/,
        include: srcPath,
        exclude: /\.module\.(scss|css)$/,
        use: [
            { loader: "style-loader" },
            {
                loader: "css-loader",
                options: {
                    importLoaders: 2,
                    modules: false
                }
            },
            { loader: "postcss-loader" },
            { loader: "sass-loader" }
        ]
    }
);

export const rendererConfig: Configuration = {
    target: "electron-renderer",
    externalsPresets: {
        node: false
    },
    module: {
        rules
    },
    plugins: [
        ...plugins,
        new webpack.DefinePlugin({
            __dirname: JSON.stringify(path.resolve(__dirname)),
            __filename: JSON.stringify(path.resolve(__dirname, "index.js")),
        }),
        new webpack.BannerPlugin({
            banner: `var __dirname = ${JSON.stringify(path.resolve(process.cwd()))}; var __filename = ${JSON.stringify(path.resolve(process.cwd(), "index.js"))};`,
            raw: true,
            entryOnly: false,
        })
    ],
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".sass"]
    },
};