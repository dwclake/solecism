import type { ModuleOptions } from "webpack";
import { defineReactCompilerLoaderOption, reactCompilerLoader } from "react-compiler-webpack";
import path from "path";

const stylesPath = path.resolve(__dirname, "styles");

export const rules: Required<ModuleOptions>["rules"] = [
    {
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: [
            {
                loader: reactCompilerLoader,
                options: defineReactCompilerLoaderOption({
                    compilationMode: "infer",
                    target: "19"
                })
            },
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    {
        test: /\.module\.(scss|css)$/,
        include: stylesPath,
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
        include: stylesPath,
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
];