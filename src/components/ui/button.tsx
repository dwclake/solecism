type Props = {
    children?: React.ReactNode[] | React.ReactElement | string;
    onClick?: () => void;
    styles: {
        [key: string]: string
    };
}

/**
 *
 * @author dwclake
 */
export const Button: React.FC<Props> = ({ children, onClick, styles }) => {
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