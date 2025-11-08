/*
 * The component responsible for rendering a dropdown menu
 */

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "./button";
import colors from "styles/colors";

type Props = {
    children: React.ReactNode[]
}

const Container = styled.div`
    grid-area: nav;
    display: flex;
    position: relative;
    justify-self: right;
    align-items: center;

    -webkit-app-region: no-drag;
`;

const DropdownList = styled.ul<{ open?: boolean }>`
    display: flex;
    flex-flow: wrap;
    max-width: 150px;
    height: auto;
    padding: 5px 5px;

    position: absolute;
    top: 0;
    left: 0;
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
`;

export const Dropdown: React.FC<Props> = ({ children }) => {
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

    return (
        <Container ref={containerRef}>
            <Button onClick={handleClick}>
                {!isOpen ? <>{buttonClosed}</> : <>{buttonOpen}</>}
            </Button>
            <DropdownList open={isOpen}>
                {children.slice(2).map((child, i) => {
                    return <li key={`dropdown-item-${i}`}>{child}</li>
                })}
            </DropdownList>
        </Container>
    );
}
