import { getStyles } from "../../lib/getStyles";
import { Stack } from "../Stack/Stack";
import styles from "./Button.module.scss"

export const Button = ( {
    children,
    variant, // variant: green, blue
    className,
    ...otherProps
} ) => {

    const classes = getStyles(styles.button, {}, [className, styles[variant]]);

    return(
        <button 
            className= {classes} 
            {...otherProps} >
            <Stack 
                direction="row" 
                justify = "justifyCenter"
                align="alignCenter" 
                gap={8}
            >            
                {children} 
            </Stack>
        </button>
    )
}