/* @author: dwclake
 * @created: 10-17-2025
 *
 * The component responsible for rendering a dropdown menu
 */

import { useDispatch, useSelector } from "../../features/store"
import { setIsOpen } from "../../features/dropdown/Dropdown"

// Make it so the style object is passed in so it's generic
type Props = {
     children: React.ReactNode[],
     styles: {
         [key: string]: string
     }
}

export const Dropdown = ({ children, styles }: Props) => {
    const isOpen = useSelector(state => state.dropdown.isOpen)
    const dispatch = useDispatch()

    return (
        <div className={styles.dropdown}>
            {!isOpen ? (
                // Make use Button component
                <button className={styles.dropdownButton} onClick={() => dispatch(setIsOpen(true))}>
                    Nav
                </button>
            ) : (
                <>
                    <button className={styles.dropdownButton} onClick={() => dispatch(setIsOpen(false))}>
                        Nav
                    </button>
                    <ul className={styles.dropdownList}>{
                        children.map((child, i) => <li key={`${styles.dropdownList}-${i}`}>{child}</li>)
                    }</ul>
                </>
            )}
        </div>
    )
}