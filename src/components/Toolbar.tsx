/* @Author: dwclake
 * @Created: 10-18-2025
 */

import { NavLink } from "react-router-dom"

import { useDispatch } from "../features/store"
import { setIsOpen } from "../features/dropdown/Dropdown"
import { Dropdown } from "./ui/dropdown"

import styles from "../styles/Toolbar.module.css"

export const Toolbar = () => {
     const dispatch = useDispatch()

     const onClick = () => {
         dispatch(setIsOpen(false))
     }

     const sendNotification = () => {
         window.electron.notification.send('Hello from React!')
     }

     // Move navDropdownList css into dropdown css

     return (
         <header className={styles.container}>
             <h1 className={styles.title}>Solecism</h1>
             <Dropdown styles={styles}>
                 <NavLink to="/" onClick={onClick}>Home</NavLink>
                 <NavLink to="/about" onClick={onClick}>About</NavLink>
             </Dropdown>
             <nav className={styles.socials}>
                 <button onClick={sendNotification}>Click me</button>
                 { false && <ul className={styles.socialsList}>
                     <li><a href="https://github.com/dwclake" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                     <li><a href="https://www.linkedin.com/in/dwclake" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                 </ul> }
             </nav>
         </header>
     )
 }