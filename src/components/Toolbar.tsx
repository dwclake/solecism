/* @Author: dwclake
 * @Created: 10-18-2025
 */

import { NavLink } from "react-router-dom"

import { useDispatch } from "../features/store"
import { setIsOpen } from "../features/dropdown/Dropdown"
import { Dropdown } from "./ui/dropdown"
import { WebGLCanvas } from "../components/ui/webglcanvas"
import { init, render } from "../animations/flower/RainbowFlower"

import styles from "../styles/Toolbar.module.css"

export const Toolbar = () => {
    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(setIsOpen(false))
    }

    const sendNotification = () => {
        window.electron.notification.send('Hello from React!')
    }

    return (
        <header className={styles.container}>
            <WebGLCanvas className={styles.logo} width="600" height="600" onInit={init} onRender={render} />
            <h1 className={styles.title}>solecism</h1>
            <Dropdown styles={styles}>
                <NavLink
                    to="/"
                    end
                    onClick={onClick}
                    className={({ isActive }) => isActive ? styles.active : undefined}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    onClick={onClick}
                    className={({ isActive }) => isActive ? styles.active : undefined}
                >
                    About
                </NavLink>
            </Dropdown>
            <nav className={styles.socials}>
                <button className={styles.socialsButton} onClick={sendNotification}>click me</button>
            </nav>
        </header>
    )
}
