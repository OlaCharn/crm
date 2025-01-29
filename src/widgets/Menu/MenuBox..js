import { Stack } from "../../shared/ui/Stack/Stack"
import { Menu } from "./Menu"
import styles from "./MenuBox.module.scss"

export const MenuBox = () => {
    return(
        <Stack 
            direction = "column"
            justify="justifyBetween"
            align = "alignCenter"
            className={styles.box}
        >
            <Menu />
            <img src={null} alt="logo" width="150px" />

        </Stack>
    )
}