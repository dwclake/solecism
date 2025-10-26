/**
 * @author: dwclake
 * @created: 10-17-2025
 *
 */

type Props = {
    children?: React.ReactNode[] | string;
    onClick?: () => void;
    styles: {
        [key: string]: string
    };
}

export const Button = ({ children, onClick, styles }: Props) => {
    return (
        <>
            <button
                className={styles.button}
                onClick={onClick}
            >
                {children}
            </button>
        </>
    );
}