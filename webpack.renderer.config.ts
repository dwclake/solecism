import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

import webpack from "webpack";
import path from "path";

rules.push(
    {
        test: /\.module\.(scss|css)$/,
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
    {
        test: /\.(scss|css)$/,
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
        new webpack.BannerPlugin({
            banner: `
                var __dirname = ${JSON.stringify(path.resolve(process.cwd()))};
                var __filename = ${JSON.stringify(path.resolve(process.cwd(), "index.js"))};
            `,
            raw: true,
            entryOnly: true
        })
    ],
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".sass"],
        alias: {
            "styles": path.resolve(__dirname, "styles/")
        }
    },
};