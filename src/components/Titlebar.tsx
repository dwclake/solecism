import { Menu, X } from "lucide-react";

import { useDispatch } from "../features/store";
import { setIsOpen } from "../features/dropdown/Dropdown";
import { Button, Dropdown, NavButton, WebGLCanvas } from "./ui";
import { init, render } from "../animations/flower/RainbowFlower";

import styles from "styles/components/Titlebar.module.scss";

/**
 *
 * @author dwclake
 */
export const Toolbar = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(setIsOpen(false));
    }

    const sendNotification = () => {
        window.electron.os.notify.send("Hello from React!");
    }

    return (
        <header className={styles.container}>
            <WebGLCanvas
                className={styles.logo}
                width="600"
                height="600"
                onInit={init}
                onRender={render}
            />
            <h1 className={`${styles.title} abril-fatface-regular`}>solecism</h1>
            <Dropdown styles={styles}>
            	<Menu size={12} strokeWidth={3} />
             	<X size={12} strokeWidth={3} />
                <NavButton
                    to="/"
                    end
                    className={styles.button}
                    activeClassName={styles.active}
                    onActivate={onClick}
                    preventActive={true}
                >
                    Home
                </NavButton>
                <NavButton
                    to="/about"
                    className={styles.button}
                    activeClassName={styles.active}
                    onActivate={onClick}
                    preventActive={true}
                >
                    About
                </NavButton>
            </Dropdown>
            <nav className={styles.socials}>
                <Button styles={styles} onClick={sendNotification}>click me</Button>
            </nav>
        </header>
    );
}
