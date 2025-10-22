/* @author: dwclake
 * @created: 10-17-2025
 * 
 * The view for the home page
 */

import { WebGLCanvas } from "../components/ui/webglcanvas"
import { init, render } from "../animations/flower/RainbowFlower"

import styles from "../styles/Home.module.css"

export const Home = () => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
    }

    return (
        <div className={styles.view}>
            <p>Home stuff</p>
        </div>
    )
}
