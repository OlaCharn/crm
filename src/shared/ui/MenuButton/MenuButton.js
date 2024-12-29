import { getStyles } from "../../lib/getStyles";
import styles from "./MenuButton.module.scss"
import { Stack } from "../Stack/Stack";
import { useState } from "react";

export const MenuButton = ( {
    children,
    icon,
    hoveredIcon,
    isActive,
    className,
    ...otherProps
} ) => {
    const [isHovered, setIsHovered] = useState(false);

    const classes = getStyles(
        styles.button, 
        { [styles.active]: isActive }, 
        [className]
    );

    return(
        <button 
            className= {classes} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...otherProps} >
            <Stack 
                direction="row" 
                justify = "justifyStart"
                align="alignCenter" 
                gap={16}
                className={styles.paddingLeft}
                >
                    
                
                    <Stack >
                    {isHovered || isActive ? hoveredIcon : icon}
                    </Stack>
            
                <Stack>
                {children} 
                </Stack>
            </Stack>
        </button>
    )
}