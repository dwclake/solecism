import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

rules.push(
    {
        test: /\.(scss|css)$/,
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
    },{
        test: /\.module\.(scss|css)$/,
        use: [
            { loader: "style-loader" },
            {
                loader: "css-loader",
                options: {
                    importLoaders: 2,
                    modules: {
                        localIdentName: "[name]__[local]___[hash:base64:5]",
                    },
                },
            },
            { loader: "postcss-loader" },
            { loader: "sass-loader" },
        ]
    }
);

export const rendererConfig: Configuration = {
    module: {
        rules
    },
    plugins,
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".sass"]
    }
}
