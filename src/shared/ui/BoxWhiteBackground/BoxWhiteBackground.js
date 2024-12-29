import { Stack } from "../Stack/Stack"
import styles from "./BoxWhiteBackground.module.scss"

export const BoxWhiteBackground = ({children}) =>{
    return(
        <Stack
            gap={32}
            max
            direction="column"
            justify = "justifyStart"
            align = "alignStart"
            className={styles.box}
        >
            {children}
        </Stack>
    )
}