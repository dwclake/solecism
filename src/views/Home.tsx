/*
 * The view for the home page
 */

import { useEffect, useRef, useState } from "react";

import { Button } from "../components/ui/button";

import styles from "styles/views/Home.module.scss";
import button from "styles/components/ui/button.module.scss";

export const Home = () => {
    // @TODO move this stuff to textarea / text editor component, hook up with redux
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState("");

    function handleKeydown(this: HTMLTextAreaElement, event: KeyboardEvent) {
        if (event.key == "Tab") {
            event.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;

            this.value = this.value.substring(0, start) +
                "    " +
                this.value.substring(end);

            this.selectionStart = this.selectionEnd = start + 4;
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    useEffect(() => {
        const textarea = textareaRef.current!;

        textarea.addEventListener("keydown", handleKeydown);

        return () => {
            textarea.removeEventListener("keydown", handleKeydown);
        }
    }, [textareaRef]);

    return (
        <div className={styles.view}>
            <div className={styles.toolbar}>
                <ul className={styles.list}>
                    <li>
                        <Button
                            onClick={() => {}}
                            styles={button}
                        >
                            open
                        </Button>
                    </li>
                    <li>
                        <Button
                            onClick={() => {}}
                            styles={button}
                        >
                            save
                        </Button>
                    </li>
                    <li>
                        <Button
                            onClick={() => {}}
                            styles={button}
                        >
                            undo
                        </Button>
                    </li>
                    <li>
                        <Button
                            onClick={() => {}}
                            styles={button}
                        >
                            redo
                        </Button>
                    </li>
                </ul>
            </div>
            <div className={styles.container}>
                <textarea
                    className={styles.editor}
                    onChange={handleChange}
                    ref={textareaRef}
                />
            </div>
            <p>{text}</p>
        </div>
    );
}
