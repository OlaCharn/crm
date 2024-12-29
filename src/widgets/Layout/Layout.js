import { AppRouter } from "../../app/router/ui/AppRouter"
import { LogoBackground } from "../../shared/assets/svg/LogoEthics/LogoBackgroung"
import { Stack } from "../../shared/ui/Stack/Stack"
import Main from "../MainContext/Main"
import { MenuBox } from "../Menu/MenuBox."

export const Layout = (  ) => {
    return(
        <Stack
            direction = "row"
            justify = "justifyStart"
            align = "alignStart"
            gap={16}
            

        >
            <Stack 
                direction = "column"
                justify = "justifyCenter"
                align = "alignStart"
                gap={16}
                
                >
                <LogoBackground />
                <MenuBox />
            </Stack>

            <>
                <Main>
                    <AppRouter/>
                </Main>
            </>
        </Stack>
    )
}