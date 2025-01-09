import styles from "./ArrowUpAndDown.module.scss";

export const ArrowUp = ({ onClick, isActive }) => {
    // Условно применяем стили в зависимости от isActive
    const arrowClass = isActive ? styles.activeArrow : styles.inactiveArrow; 

    return (
<div>
            <svg 
                onClick={onClick}
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                className={`${styles.arrowUp} ${arrowClass}`} // Стили для стрелки
            >
                <path 
                    d="M21 17L3 17M18 12L6 12M14 7L10 7" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                />
            </svg>
        </div>
            );
};


/*
export const ArrowUp = ({ onClick, isActive }) => {
    // Условно применяем стили в зависимости от isActive
    const arrowClass = isActive ? styles.activeArrow : styles.inactiveArrow; 

    return (
        <div>
            <svg 
                onClick={onClick}
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="20" 
                viewBox="0 0 14 20" 
                fill="none"
                className={`${styles.arrowUp} ${arrowClass}`} // Стили для стрелки
            >
                <path 
                    d="M13.0702 7.57L7.00018 1.5L0.930176 7.57M7.00018 18.5V1.67" 
                    strokeWidth="1.5" 
                    strokeMiterlimit="10" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};
*/