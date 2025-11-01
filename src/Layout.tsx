import { Outlet } from "react-router-dom";

import { Toolbar } from "./components/Titlebar";
import { Infobar } from "./components/Infobar";
import styles from "styles/Layout.module.scss";

/**
 * The root layout for the website containing the header,
 * the footer, and outlet for the main content
 *
 * @author dwclake
 */
export const Layout = () => {
    return (
        <div className={`${styles.container} roboto`}>
            <Toolbar />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Infobar />
        </div>
    );
}
