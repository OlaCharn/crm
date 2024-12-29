import { useLocation } from "react-router-dom";
import { routers } from "../../app/router/config/router";
import { Header } from "./Header";
import { Stack } from "../../shared/ui/Stack/Stack";

const Main = ( {children} ) => {
    const location = useLocation();

    const currentRoute = Object.values(routers).find(
        (route) => route.path === location.pathname
    );

    return (
        <Stack
        direction = "column"
        justify = "justifyCenter"
        align = "alignStart"
        gap={54}
        max
        >
            <Header title={currentRoute?.title || "Dashboard"} />
            <> {children} </>
        </Stack>
    )
}
export default Main;