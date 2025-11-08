/*
 * NavButton - a link-like button that prevents re-activating when already active.
 * Styles are defined locally using `styled(Button)` so the NavButton visually
 * matches other buttons (dropdown toggle, social button, etc.).
 */

import { NavLink, type NavLinkProps } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./button";
import colors from "styles/colors";

type NavButtonProps = {
    to: NavLinkProps["to"];
    end?: boolean;
    className?: string;
    activeClassName?: string;
    onActivate?: () => void;
    preventActive?: boolean;
    children: React.ReactNode;
};

const NavButtonStyled = styled(Button)`
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
`;

export const NavButton: React.FC<NavButtonProps> = ({
    to,
    end = false,
    onActivate,
    preventActive = true,
    children
}) => {
    const createHandler = (isActive: boolean) => (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isActive && preventActive) {
            e.preventDefault();
            return;
        }

        if (onActivate) onActivate();
    };

    return (
        <NavLink to={to} end={end}>
            {({ isActive }) => {
                return (
                    <NavButtonStyled
                        className={isActive ? "active" : ""}
                        onClick={createHandler(isActive)}
                    >
                        {children}
                    </NavButtonStyled>
                );
            }}
        </NavLink>
    );
}