/**
 * @author: dwclake
 * @created: 10-18-2025
 */

import { NavLink } from "react-router-dom";

import { useDispatch } from "../features/store";
import { setIsOpen } from "../features/dropdown/Dropdown";
import { Button, Dropdown } from "./ui";
import { WebGLCanvas } from "../components/ui/webglcanvas";
import { init, render } from "../animations/flower/RainbowFlower";

import toolbar from "../styles/components/Toolbar.module.css";
import button from "../styles/components/ui/button.module.css";
import dropdown from "../styles/components/ui/dropdown.module.css";

export const Toolbar = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(setIsOpen(false));
    }

    const sendNotification = () => {
        window.electron.os.notify.send("Hello from React!");
    }

    return (
        <header className={toolbar.container}>
            <WebGLCanvas className={toolbar.logo} width="600" height="600" onInit={init} onRender={render} />
            <h1 className={toolbar.title}>solecism</h1>
            <Dropdown dropdown={dropdown} button={button}>
                <NavLink
                    to="/"
                    end
                    onClick={onClick}
                    className={({ isActive }) => `${button.button} ${isActive ? button.active : undefined}`}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    onClick={onClick}
                    className={({ isActive }) => `${button.button} ${isActive ? button.active : undefined}`}
                >
                    About
                </NavLink>
            </Dropdown>
            <nav className={toolbar.socials}>
                <Button styles={button} onClick={sendNotification}>click me</Button>
            </nav>
        </header>
    );
}
