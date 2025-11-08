/*
 *
 */

import React from "react";
import styled from "styled-components";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

import colors from "../../../styles/colors";

const StyledButton = styled.button`
    display: flex;
    box-sizing: border-box;

    font-size: 1.2rem;
    background-color: ${colors.shade};
    color: ${colors.text};
    border: 2px solid ${colors.accent};
    border-radius: 10px;
    box-shadow: 1px 1px 2px ${colors.shade};

    transition:
    transform 0.1s ease,
    background-color 0.1s ease,
    box-shadow 0.1s ease,
    color 0.1s ease;

    -webkit-app-region: no-drag;
    align-items: center;
    justify-content: center;

    &:hover {
        transform: translateY(0.25px) translateX(0.25px);
        background-color: ${colors.good};
        color: ${colors.text};
        border: 2px solid ${colors.accent};
        box-shadow: 1px 1px 2px ${colors.shade};
    }

    &:disabled {
        transform: translateY(0.25px) translateX(0.25px);
        background-color: ${colors.bad};
        color: ${colors.text};
        border: 2px solid ${colors.accent};
        box-shadow: 1px 1px 2px ${colors.shade};
    }

    &:active {
        transform: translateY(1px) translateX(1px);
        color: ${colors.text};
        border: 2px solid ${colors.accent};
        box-shadow: inset 0 2px 6px ${colors.shade};
    }
`;

export const Button: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    );
}

Button.displayName = "Button";