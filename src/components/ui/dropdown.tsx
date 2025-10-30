/**
 * @author: dwclake
 * @created: 10-17-2025
 *
 * The component responsible for rendering a dropdown menu
 */

import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "../../features/store";
import { setIsOpen } from "../../features/dropdown/Dropdown";

import { Button } from "./button";

// Make it so the style object is passed in so it's generic
type Props = {
    children: React.ReactNode[],
    styles: {
        [key: string]: string;
    }
}

export const Dropdown: React.FC<Props> = ({ children, styles }) => {
    const isOpen = useSelector(state => state.dropdown.isOpen);
    const dispatch = useDispatch();

	const buttonClosed = children.at(0);
	const buttonOpen = children.at(1);

    const handleClick = () => {
        dispatch(setIsOpen(!isOpen))
    }

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentPointer = (event: MouseEvent | TouchEvent) => {
            const container = containerRef.current!;
            const target = event.target as Node | null;
            if (!target) return;
            if (!container.contains(target) && isOpen) {
                dispatch(setIsOpen(false));
            }
        };

        document.addEventListener("mousedown", handleDocumentPointer);
        document.addEventListener("touchstart", handleDocumentPointer);

        return () => {
            document.removeEventListener("mousedown", handleDocumentPointer);
            document.removeEventListener("touchstart", handleDocumentPointer);
        };
    }, [isOpen, dispatch]);

    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                dispatch(setIsOpen(false));
            }
        };

        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, dispatch]);

    return (
        <div className={styles["dropdown-container"]} ref={containerRef}>
            {!isOpen ? (
                <Button styles={styles} onClick={handleClick}>
                	<>{buttonClosed}</>
                </Button>
            ) : (
                <Button styles={styles} onClick={handleClick}>
					<>{buttonOpen}</>
                </Button>
            )}
            <ul className={`${styles["dropdown-list"]} ${isOpen ? styles.open : undefined}`}>{
                children.slice(2).map((child, i) => {
                    return <li key={`${styles["dropdown-list"]}-${i}`}>{child}</li>
                })
            }</ul>
        </div>
    );
}
