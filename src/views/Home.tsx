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
            <a href="Animation thanks to Dr. GPT" onClick={handleClick}>
                <WebGLCanvas width="600" height="600" onInit={init} onRender={render} />
            </a>
        </div>
    )
}