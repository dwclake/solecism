import type { Configuration } from "webpack";
import path from "path";

import { rules as sharedRules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

const stylesPath = path.resolve(__dirname, "styles");

function usesAssetRelocator(rule: any): boolean {
    if (!rule) return false;

    const checkLoader = (u: any) => {
        if (!u) return false;
        if (typeof u === "string") return u.includes("webpack-asset-relocator-loader");
        if (typeof u.loader === "string") return u.loader.includes("webpack-asset-relocator-loader");
        return false;
    };

    if (Array.isArray(rule.use)) {
        return rule.use.some(checkLoader);
    }
    if (typeof rule.use === "object" || typeof rule.use === "string") {
        return checkLoader(rule.use);
    }
    return false;
}

const rendererRules = (sharedRules || []).filter((r) => !usesAssetRelocator(r));

rendererRules.push(
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
);

export const rendererConfig: Configuration = {
    target: "electron-renderer",
    externalsPresets: {
        node: false
    },
    module: {
        rules: rendererRules
    },
    plugins,
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".sass"],
        alias: {
            "styles": path.resolve(__dirname, "styles/")
        }
    }
};