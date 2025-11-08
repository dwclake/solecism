/*
 * Styled Button converted from module SCSS to styled-components.
 * Preserves the original visual rules from styles/components/ui/button.module.scss.
 * The `styles` prop is optional for backward compatibility; if a class is provided
 * it will be appended to the generated styled-component class.
 */

import React from "react";
import styled from "styled-components";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    styles?: {
        [key: string]: string;
    };
};

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
  app-region: no-drag;
  align-items: center;
  justify-content: center;

  /* No padding here to match the original SCSS exactly (the original .button did not set padding) */

  &:hover {
    transform: translateY(0.25px) translateX(0.25px);
    background-color: ${colors.good};
    color: ${colors.text};
    border: 2px solid ${colors.accent};
    box-shadow: 1px 1px 2px ${colors.shade};
  }

  &:hover.active {
    transform: translateY(0.25px) translateX(0.25px);
    background-color: ${colors.bad};
    color: ${colors.fade};
    border: 2px solid ${colors.accent};
    box-shadow: 1px 1px 2px ${colors.shade};
  }

  &.active {
    color: ${colors.fade};
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

export const Button = React.forwardRef<HTMLButtonElement, Props>(({ children, styles, className, ...rest }, ref) => {
    // Keep backward compatibility: if caller passed a styles mapping with `.button`,
    // append that classname to the styled-component so any existing global/class rules continue to work.
    const extraClass = styles && (styles as any).button ? (styles as any).button : undefined;
    const combinedClass = [className, extraClass].filter(Boolean).join(" ") || undefined;

    return (
        <StyledButton ref={ref} {...rest} className={combinedClass}>
            {children}
        </StyledButton>
    );
});
Button.displayName = "Button";