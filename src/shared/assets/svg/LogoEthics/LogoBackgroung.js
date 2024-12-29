import { LogoEthicsSvg } from "./LogoEthicsSvg"
import styles from "./LogoBackground.module.scss"
import { Stack } from "../../../ui/Stack/Stack"

export const LogoBackground = () =>{
    return(
        <Stack className={styles.logo} >
            <LogoEthicsSvg />
        </Stack>
    )
}