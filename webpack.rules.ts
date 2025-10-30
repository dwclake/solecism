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
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            },
            {
                loader: reactCompilerLoader,
                options: defineReactCompilerLoaderOption({
                    // React Compiler options goes here
                })
            }
        ]
    },
    {
        test: [/\.svg$/, /\.png$/, /\.ico$/],
        type: "asset/resource",
        generator: {
            filename: "assets/[name][ext][query]"
        }
    }
];