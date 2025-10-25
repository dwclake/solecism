/**
 * @author: dwclake
 * @created: 10-17-2025
 *
 * The main component for the website, providing client-side routing
 */

import {
    createHashRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";

import { Layout } from "./components/Layout";
import {
    About,
    Home
} from "./views";

const router = createHashRouter(createRoutesFromElements(
    <Route path="/"         element={ <Layout /> }>
        <Route index        element={ <Home /> }/>
        <Route path="about" element={ <About /> }/>
    </Route>
));

export const App = () => {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}