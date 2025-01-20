import styles from "./ArrowUpAndDown.module.scss";

export const ArrowDown = ({ onClick, isActive }) => {
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
            className={`${styles.arrowDown} ${arrowClass}`}
        >
            <path 
                d="M3 7H21M6 12H18M10 17H14" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
            />
        </svg>
    </div>
        );
};


