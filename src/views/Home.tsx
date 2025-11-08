/*
 * The view for the home page
 *
 */

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Button } from "../components/ui";

import colors from "styles/colors";

const View = styled.div`
    display: grid;
    grid-template-rows: 30px 1fr;
    grid-template-areas:
        "toolbar"
        "editor";
    width: 100%;
    height: 100%;
    padding: 0rem 2rem;
`;

const Toolbar = styled.div`
    display: flex;
    height: 100%;
    align-self: center;
`;

const ToolbarList = styled.ul`
    display: flex;
    list-style: none;
    align-items: center;
    gap: 1rem;
    margin: 0;
    padding: 0;
`;

const Container = styled.div`
    display: flex;
    grid-area: editor;
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    align-self: stretch;
    justify-self: stretch;
`;

const Editor = styled.textarea`
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    flex: 1 1 auto;

    border: 2px solid ${colors.text};
    border-radius: 10px;
    color: ${colors.tint};
    background-color: ${colors.accent};

    resize: none;
    font-family: inherit;
    font-size: 1rem;
`;

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
        <>

            <View>
                <Toolbar>
                    <ToolbarList>
                        <li>
                            <Button onClick={() => {}}>open</Button>
                        </li>
                        <li>
                            <Button onClick={() => {}}>save</Button>
                        </li>
                        <li>
                            <Button onClick={() => {}}>undo</Button>
                        </li>
                        <li>
                            <Button onClick={() => {}}>redo</Button>
                        </li>
                    </ToolbarList>
                </Toolbar>
                <Container>
                    <Editor
                    onChange={handleChange}
                    ref={textareaRef}
                    />
                </Container>
                <p>{text}</p>
            </View>
        </>
    );
}