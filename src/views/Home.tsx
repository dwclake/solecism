/*
 * The view for the home page
 *
 * Converted to use styled-components with styles colocated in this file.
 * Note: the project Button component expects a `styles` object containing class names.
 * To avoid changing that component in this edit, a small global CSS class is injected
 * and its name is passed to the Button via the `styles` prop.
 */

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Button } from "../components/ui";

import colors from "styles/colors";

// Global legacy `.hc-button` styles removed — use the shared styled `Button`
// component everywhere so appearance is consistent (dropdown toggle was already correct).

const View = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
  grid-template-areas:
    "toolbar"
    "editor";
  width: 100%;
  height: 100%;
`;

const Toolbar = styled.div`
  display: flex;
  margin: 0rem 2rem;
  height: 100%;
  width: 100%;
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
  padding: 0rem 2rem 2rem 2rem;

  align-self: stretch;
  justify-self: stretch;
`;

const Editor = styled.textarea`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;

  padding: 2rem;

  border: 2px solid ${colors.text};
  border-radius: 10px;
  color: ${colors.tint};
  background-color: ${colors.accent};

  resize: none;
  font-family: inherit;
  font-size: 1rem;
`;

// Legacy styles object removed — Buttons now use the shared styled `Button` component directly.

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
