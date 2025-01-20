import { getStyles } from "../../lib/getStyles";
import styles from "./ActionButton.module.scss";

export const ActionButton = ({
    children,
    variant, // 'green' / 'blue'
    onClick,   
    action,    // 'add', 'delete', 'edit'
    dataType,  
    className,
    disabled,
    ...otherProps
}) => {
    const classes = getStyles(styles.button, {}, [
        className,
        styles[variant], // `styles.green` / `styles.blue`
        disabled ? 'disabled' : ''
    ]);
    const handleClick = () => {
        if (!disabled) {
            onClick(action, dataType); // disabled
        }
    };

    return (
        <button 
        action="scroll"
            className={classes}
            onClick={handleClick}
            disabled={disabled}
            {...otherProps}>
                {children}
        </button>
    );
};
