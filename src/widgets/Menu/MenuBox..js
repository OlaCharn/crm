import { Stack } from "../../shared/ui/Stack/Stack"
import { Menu } from "./Menu"
import styles from "./MenuBox.module.scss"
import logoPTB from "../../shared/assets/img/logo_ptb.png";

export const MenuBox = () => {
    return(
        <Stack 
            direction = "column"
            justify="justifyBetween"
            align = "alignCenter"
            className={styles.box}
        >
            <Menu />
            <img src={logoPTB} alt="logoPTB" width="150px" />

        </Stack>
    )
}