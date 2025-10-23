/* @author: dwclake
 * @created: 10-17-2025
 *
 * The view for the home page
 */

import { useEffect, useRef } from "react"

import { WebGLCanvas } from "../components/ui/webglcanvas"
import { init, render } from "../animations/flower/RainbowFlower"

import styles from "../styles/Home.module.css"

export const Home = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
    }

    function handleKeydown(this: HTMLTextAreaElement, event: KeyboardEvent) {
        if (event.key == 'Tab') {
            event.preventDefault()
            var start = this.selectionStart
            var end = this.selectionEnd

            this.value = this.value.substring(0, start) +
                "    " + this.value.substring(end)

            this.selectionStart =
                this.selectionEnd = start + 4
        }
    }

    useEffect(() => {
        const textarea = textareaRef.current!

        textarea.addEventListener('keydown', handleKeydown)

        return () => {
            textarea.removeEventListener('keydown', handleKeydown)
        }
    }, [textareaRef])

    return (
        <div className={styles.view}>
            <div className={styles.editor}>
                <textarea className={styles.editorText} ref={textareaRef} />
            </div>
        </div>
    )
}
