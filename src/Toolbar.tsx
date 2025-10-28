/**
 * @author: dwclake
 * @created: 10-18-2025
 */

import { NavLink } from "react-router-dom";

import { useDispatch } from "./features/store";
import { setIsOpen } from "./features/dropdown/Dropdown";
import { Button, Dropdown } from "./components/ui";
import { WebGLCanvas } from "./components/ui/webglcanvas";
import { init, render } from "./animations/flower/RainbowFlower";

import toolbar from "./styles/Toolbar.module.scss";
import dropdown from "./styles/components/ui/dropdown.module.scss";

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
            <h1 className={`${toolbar.title} abril-fatface-regular`}>solecism</h1>
            <Dropdown dropdown={dropdown} button={toolbar}>
                <NavLink
                    to="/"
                    end
                    onClick={onClick}
                    className={({ isActive }) => `${toolbar.button} ${isActive ? toolbar.active : undefined}`}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    onClick={onClick}
                    className={({ isActive }) => `${toolbar.button} ${isActive ? toolbar.active : undefined}`}
                >
                    About
                </NavLink>
            </Dropdown>
            <nav className={toolbar.socials}>
                <Button styles={toolbar} onClick={sendNotification}>click me</Button>
            </nav>
        </header>
    );
}
