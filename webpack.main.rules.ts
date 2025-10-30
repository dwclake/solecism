import type { ModuleOptions } from "webpack";
import { defineReactCompilerLoaderOption, reactCompilerLoader } from "react-compiler-webpack";

export const rules: Required<ModuleOptions>["rules"] = [
    {
        test: /native_modules[/\\].+\.node$/,
        use: "node-loader"
    },
    {
        test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
        parser: { amd: false },
        use: {
            loader: "@vercel/webpack-asset-relocator-loader",
            options: {
                outputAssetBase: "native_modules"
            }
        }
    },
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
        test: [/\.svg$/, /\.png$/, /\.ico$/, /\.icns$/],
        type: "asset/resource",
        generator: {
            filename: "assets/[name][ext][query]"
        }
    }
];