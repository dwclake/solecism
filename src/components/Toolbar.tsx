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

import toolbar from "../styles/Toolbar.module.css";
import button from "../styles/ui/button.module.css";
import dropdown from "../styles/ui/dropdown.module.css";

export const Toolbar = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(setIsOpen(false));
    }

    const sendNotification = () => {
        window.electron.notification.send('Hello from React!');
    }

    return (
        <header className={toolbar.container}>
            <WebGLCanvas className={toolbar.logo} width="600" height="600" onInit={init} onRender={render} />
            <h1 className={toolbar.title}>solecism</h1>
            <Dropdown styles={{ ...dropdown, ...button }}>
                <NavLink
                    to="/"
                    end
                    onClick={onClick}
                    className={({ isActive }) => `${button.button} ${isActive ? dropdown.active : undefined}`}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    onClick={onClick}
                    className={({ isActive }) => `${button.button} ${isActive ? dropdown.active : undefined}`}
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
