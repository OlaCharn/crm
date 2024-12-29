import { Route, Routes } from "react-router-dom"
import { routers } from "../config/router"

export const AppRouter = () => {
    return(
        <Routes>
            {Object.values(routers).map((router) => (
                <Route 
                    key={router.path}
                    path={router.path}
                    element={router.element}
                />
            ))}
        </Routes>
    )
}