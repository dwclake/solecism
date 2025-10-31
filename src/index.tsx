/**
 * The entrypoint for the frontend, sourced from index.html
 *
 * @author dwclake
 */

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./features/store";
import { App } from "./App";
import "../styles/index.scss";

const container = document.getElementById("root")!;

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

const root = createRoot(container);
root.render(app);