import {
    createHashRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";

import { Layout } from "./Layout";
import { About, Home } from "./views";

const router = createHashRouter(createRoutesFromElements(
    <Route path="/"         element={ <Layout /> }>
        <Route index        element={ <Home /> }/>
        <Route path="about" element={ <About /> }/>
    </Route>
));

/**
 * The main component for the website, providing client-side routing
 *
 * @author dwclake
 */
export const App = () => {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}
