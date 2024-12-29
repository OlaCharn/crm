import { Stack } from "../../shared/ui/Stack/Stack"
import styles from "./Header.module.scss"
import { UserIcon } from "../../shared/assets/svg/UserIcon/UserIcon"

export const Header = ( {title} ) => {
    return (
        <Stack 
            direction = "row"
            justify = "justifyBetween"
            align = "alignCenter"
            max
        >
            <p className={styles.p} > {title} </p>
            <UserIcon />
        </Stack>
    )
}
