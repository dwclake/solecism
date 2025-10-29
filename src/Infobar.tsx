/**
 * @author: dwclake
 * @created: 10-18-2025
 */

import styles from "../styles/Infobar.module.scss";

// Should display word count, current file name, etc; which will be
// accessed from the redux store
export const Infobar = () => {
    return (
        <footer className={styles.container}>
            <span className={styles.project}>{"oddessey"}</span>
            <span className={styles.filename}>{"scene one"}</span>
            <span className={styles.wordcount}>word count: {12}</span>
            <span className={styles.saved}>last saved: {"now" || "12 minutes ago"}</span>
        </footer>
    );
}
