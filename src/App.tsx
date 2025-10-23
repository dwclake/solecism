/* @author: dwclake
 * @created: 10-17-2025
 *
 * The main component for the website, providing client-side routing
 */

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom"

import { Layout } from "./components/Layout"
import {
    About,
    Home
} from "./views"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/webview"              element={ <Layout /> }>
        <Route path="index.html"        element={ <Home /> }/>
        <Route path="about"             element={ <About /> }/>
    </Route>
))

export const App = () => {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}