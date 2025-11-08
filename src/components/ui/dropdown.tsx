/*
 * The component responsible for rendering a dropdown menu
 * Updated to use styled-components for its styles while remaining compatible
 * with an optional `styles` classname mapping.
 */

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "./button";
import colors from "styles/colors";

// Make it so the style object is passed in so it's generic
type Props = {
    children: React.ReactNode[],
    styles?: {
        [key: string]: string;
    }
}

const Container = styled.div`
  grid-area: nav;
  display: flex;
  position: relative;
  justify-self: right;
`;

const DropdownList = styled.ul<{ open?: boolean }>`
  display: flex;
  flex-flow: wrap;
  max-width: 150px;
  height: auto;
  padding: 5px 5px;

  position: absolute;
  top: 36px;
  right: 0;
  z-index: ${p => (p.open ? 10 : 0)};

  align-items: center;
  justify-items: center;

  list-style: none;
  gap: 1rem;
  background-color: ${colors.bg};
  border: 2px solid ${colors.accent};
  border-radius: 10px;

  opacity: ${p => (p.open ? 1 : 0)};
  transform: translateY(${p => (p.open ? "10px" : "0px")}) translateX(${p => (p.open ? "20px" : "0px")});
  transition: opacity 100ms ease, transform 100ms ease;
  pointer-events: ${p => (p.open ? "auto" : "none")};
  visibility: ${p => (p.open ? "visible" : "hidden")};

  padding: 8px;

  li {
    display: flex;
    justify-content: center;
  }

  a {
    display: flex;
    text-decoration: none;
    color: ${colors.text};
  }

  button {
    display: flex;
    text-decoration: none;
    color: ${colors.text};
  }

  .active {
    color: ${colors.fade};
  }
`;

export const Dropdown: React.FC<Props> = ({ children, styles = {} }) => {
    const [isOpen, setIsOpen] = useState(false);

    const buttonClosed = children.at(0);
    const buttonOpen = children.at(1);

    const handleClick = () => {
        setIsOpen(v => !v);
    }

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentPointer = (event: MouseEvent | TouchEvent) => {
            const container = containerRef.current;
            const target = event.target as Node | null;
            if (!target || !container) return;
            if (!container.contains(target) && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleDocumentPointer);
        document.addEventListener("touchstart", handleDocumentPointer);

        return () => {
            document.removeEventListener("mousedown", handleDocumentPointer);
            document.removeEventListener("touchstart", handleDocumentPointer);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen]);

    const listClass = `${styles["dropdown-list"] ?? ""} ${isOpen ? (styles.open ?? "open") : ""}`.trim();

    return (
        <Container className={styles["dropdown-container"]} ref={containerRef}>
            <Button styles={styles} onClick={handleClick}>
                {!isOpen ? <>{buttonClosed}</> : <>{buttonOpen}</>}
            </Button>
            <DropdownList className={listClass} open={isOpen}>
                {children.slice(2).map((child, i) => {
                    return <li key={`dropdown-item-${i}`}>{child}</li>
                })}
            </DropdownList>
        </Container>
    );
}
