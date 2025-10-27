/**
 * @author: dwclake
 * @created: 10-17-2025
 *
 * The root layout for the website containing the header,
 * the footer, and outlet for the main content
 */

import { Outlet } from "react-router-dom";

import { Toolbar } from "./Toolbar";
import { Infobar } from "./Infobar";
import styles from "./styles/Layout.module.scss";

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
