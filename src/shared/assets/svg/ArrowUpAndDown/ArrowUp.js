import styles from "./ArrowUpAndDown.module.scss";

export const ArrowUp = ({ onClick, isActive }) => {
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
                className={`${styles.arrowUp} ${arrowClass}`} 
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


