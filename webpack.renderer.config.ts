import type { Configuration } from "webpack";
import path from "path";

import { rules } from "./webpack.renderer.rules";
import { plugins } from "./webpack.plugins";

export const rendererConfig: Configuration = {
    target: "electron-renderer",
    externalsPresets: {
        node: false
    },
    module: {
        rules
    },
    plugins,
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".sass"],
        alias: {
            "styles": path.resolve(__dirname, "styles/")
        }
    }
};