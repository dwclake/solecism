/* @Author: dwclake
 * @Created: 10-17-2025
 *
 * The root layout for the website containing the header,
 * the footer, and outlet for the main content
 */

import { NavLink, Outlet } from "react-router-dom"

import { useDispatch, useSelector } from "./features/store"
import { setIsOpen } from "./features/dropdown/Dropdown"
import { Dropdown } from "./components/ui/dropdown"
import "./styles/Layout.css"

import Logo from "../assets/svg/ruka-green-transparent.svg"

export const Layout = () => {
    return (
        <div className="layout-container roboto">
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

const Header = () => {
    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(setIsOpen(false))
    }

    const sendNotification = () => {
        window.electron.notification.send('Hello from React!');
    }

    return (
        <header className="header-container" >
            <img className="header-logo" src={Logo} alt="logo" />
            <h1 className="header-title">Solecism</h1>
            <Dropdown className="header-nav-dropdown">
                <NavLink to="/" onClick={onClick}>Home</NavLink>
                <NavLink to="/about" onClick={onClick}>About</NavLink>
            </Dropdown>
            <nav className="header-socials">
                <button onClick={sendNotification}>Click me</button>
                { false && <ul className="header-socials-list">
                    <li><a href="https://github.com/dwclake" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    <li><a href="https://www.linkedin.com/in/dwclake" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                </ul> }
            </nav>
        </header>
    )
}

const Footer = () => {
    return (
        <footer className="footer-container">
            <p>Footer text</p>
        </footer>
    )
}
