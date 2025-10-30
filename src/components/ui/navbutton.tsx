/**
 * @author: dwclake
 * @created: 10-17-2025
 *
 */

import { NavLink, type NavLinkProps } from "react-router-dom";

type NavButtonProps = {
    to: NavLinkProps["to"];
    end?: boolean;
    className?: string;
    activeClassName?: string;
    onActivate?: () => void;
    preventActive?: boolean;
    children: React.ReactNode;
};

export const NavButton: React.FC<NavButtonProps> = ({
    to,
    end = false,
    className = "",
    activeClassName = "",
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
            {({ isActive }) => (
                <button
                    className={`${className} ${isActive ? activeClassName : ""}`}
                    onClick={createHandler(isActive)}
                >
                    {children}
                </button>
            )}
        </NavLink>
    );
}