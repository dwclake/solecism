/* @author: dwclake
 * @created: 10-17-2025
 *
 * The component responsible for rendering a dropdown menu
 */

import { useDispatch, useSelector } from "../../features/store"
import { setIsOpen } from "../../features/dropdown/Dropdown"

type Props = {
     children: React.ReactNode[],
     className: string
}

export const Dropdown = ({ children, className }: Props) => {
    const isOpen = useSelector(state => state.dropdown.isOpen)
    const dispatch = useDispatch()

    return (
        <div className={className}>
            {!isOpen ? (
                // Make use Button component
                <button className={`${className}-button`} onClick={() => dispatch(setIsOpen(true))}>
                    Nav
                </button>
            ) : (
                <>
                    <button className={`${className}-button`} onClick={() => dispatch(setIsOpen(false))}>
                        Nav
                    </button>
                    <ul className={`${className}-list`}>{
                        children.map((child, i) => <li key={`${className}-${i}`}>{child}</li>)
                    }</ul>
                </>
            )}
        </div>
    )
}