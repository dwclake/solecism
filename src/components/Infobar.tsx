/*
 *
 * @TODO Should display word count, current file name, etc; which will be
 * accessed from the redux store
 */

import styles from "styles/components/Infobar.module.scss";

export const Infobar = () => {
    return (
        <footer className={styles.container}>
            <span className={styles.project}>{"odyssey"}</span>
            <span className={styles.filename}>{"scene one"}</span>
            <span className={styles.wordcount}>word count: {12}</span>
            <span className={styles.saved}>last saved: {"now" || "12 minutes ago"}</span>
        </footer>
    );
}
