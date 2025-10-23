/* @author: dwclake
 * @created: 10-17-2025
 *
 * The entrypoint for the frontend, linked from index.html
 */

import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"

import { store } from "./features/store"
import { App } from "./App"
import "./styles/index.css"

const container = document.getElementById("root")!

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

const root = createRoot(container)
root.render(app)