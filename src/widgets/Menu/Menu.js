import { useState, useEffect } from "react";
import { routers } from "../../app/router/config/router"
import { MenuButton } from "../../shared/ui/MenuButton/MenuButton"
import { Link } from 'react-router-dom';

export const Menu = () => {
    // Читаем активный маршрут из localStorage или ставим дефолтное значение "/"
    const storedActive = localStorage.getItem("activeRoute") || "/";
    const [active, setActive] = useState(storedActive); //состояние для отслеживания активного маршрута
    
    // Обновляем localStorage при изменении активного маршрута
    useEffect(() => {
    localStorage.setItem("activeRoute", active);
    }, [active]);

    return (
        <nav>
            <ul>
                {Object.values(routers).map((router) => (
                    
                    <li key={router.path} >
                        <Link to={router.path} >
                            <MenuButton 
                                icon= {router.icon} 
                                hoveredIcon={router.hoveredIcon}
                                isActive = {active === router.path}
                                onClick= { () => setActive(router.path)}
                                >
                                {router.title}
                            </MenuButton>
                        </Link>

                    </li>
                    
                ))}
            </ul>
        </nav>
    )
}