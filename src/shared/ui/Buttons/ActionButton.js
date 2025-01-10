import { getStyles } from "../../lib/getStyles";
import styles from "./ActionButton.module.scss";

export const ActionButton = ({
    children,
    variant, // 'green' или 'blue'
    onClick,   // Функция для обработки клика, которая будет вызываться при нажатии на кнопку
    action,    // Тип действия: 'add', 'delete', 'edit'
    dataType,  // Тип данных, например 'person', 'info' или другой
    className,
    ...otherProps
}) => {
    const classes = getStyles(styles.button, {}, [
        className,
        styles[variant], // Используем `styles.green` или `styles.blue`
    ]);
    const handleClick = () => {
        // Передаем action и dataType, а также onClick с требуемым действием
        onClick(action, dataType); 
    };

    return (
        <button 
        action="scroll"
            className={classes}
            onClick={handleClick}
            {...otherProps}>
                {children}
        </button>
    );
};
