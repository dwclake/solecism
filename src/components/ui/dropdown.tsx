/**
 * @author: dwclake
 * @created: 10-17-2025
 *
 * The component responsible for rendering a dropdown menu
 */

import { useDispatch, useSelector } from "../../features/store";
import { setIsOpen } from "../../features/dropdown/Dropdown";

import { Button } from "./button";

// Make it so the style object is passed in so it's generic
type Props = {
     children: React.ReactNode[],
     dropdown: {
         [key: string]: string;
     },
     button: {
         [key: string]: string;
     }
}

export const Dropdown = ({ children, dropdown, button }: Props) => {
    const isOpen = useSelector(state => state.dropdown.isOpen);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setIsOpen(!isOpen))
    }

    return (
        <div className={dropdown.container}>
            {!isOpen ? (
                <Button styles={button} onClick={handleClick}>
                    nav
                </Button>
            ) : (
                <Button styles={button} onClick={handleClick}>
                        x
                </Button>
            )}
            <ul className={`${dropdown.list} ${isOpen ? dropdown.open : undefined}`}>{
                children.map((child, i) => {
                    return <li key={`${dropdown.list}-${i}`}>{child}</li>
                })
            }</ul>
        </div>
    );
}