/**
 * @author: dwclake
 * @created: 10-18-2025
 */

import { Menu, X } from "lucide-react";

import { useDispatch } from "./features/store";
import { setIsOpen } from "./features/dropdown/Dropdown";
import { Button, Dropdown } from "./components/ui";
import { NavButton } from "./components/ui/navbutton";
import { WebGLCanvas } from "./components/ui/webglcanvas";
import { init, render } from "./animations/flower/RainbowFlower";

import toolbar from "../styles/Toolbar.module.scss";

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
            <Dropdown styles={toolbar}>
            	<Menu size={12} strokeWidth={3} />
             	<X size={12} strokeWidth={3} />
                <NavButton
                    to="/"
                    end
                    className={toolbar.button}
                    activeClassName={toolbar.active}
                    onActivate={onClick}
                    preventActive={true}
                >
                    Home
                </NavButton>
                <NavButton
                    to="/about"
                    className={toolbar.button}
                    activeClassName={toolbar.active}
                    onActivate={onClick}
                    preventActive={true}
                >
                    About
                </NavButton>
            </Dropdown>
            <nav className={toolbar.socials}>
                <Button styles={toolbar} onClick={sendNotification}>click me</Button>
            </nav>
        </header>
    );
}
