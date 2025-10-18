/* @Author: dwclake
 * @Created: 10-17-2025
 *
 * The main component for the website, providing client-side routing
 */

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom"

import { Layout } from "./Layout"
import {
    About,
    GoHome,
    Home
} from "./views"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/"                element={ <Layout /> }>
        <Route index               element={ <Home /> }/>
        <Route path="/main_window/index.html"  element={ <GoHome /> }/>
        <Route path="/about"       element={ <About /> }/>
    </Route>
))

export const App = () => {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}