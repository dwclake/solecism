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
    styles: {
        [key: string]: string;
    }
}

export const Dropdown = ({ children, styles }: Props) => {
    const isOpen = useSelector(state => state.dropdown.isOpen);
    const dispatch = useDispatch();

	const buttonClosed = children.at(0);
	const buttonOpen = children.at(1);

    const handleClick = () => {
        dispatch(setIsOpen(!isOpen))
    }

    return (
        <div className={styles["dropdown-container"]}>
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
