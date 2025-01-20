import { useState, useEffect } from "react";
import { routers } from "../../app/router/config/router"
import { MenuButton } from "../../shared/ui/MenuButton/MenuButton"
import { Link, useLocation  } from 'react-router-dom';


export const Menu = () => {
    const location = useLocation();  
    const [active, setActive] = useState(localStorage.getItem("activeRoute") || "/"); // localStorage or "/"
    
    useEffect(() => {
        setActive(location.pathname);  
    }, [location]);

    useEffect(() => {
        localStorage.setItem("activeRoute", active);
    }, [active]);

    return (
        <nav>
            <ul>
                {Object.values(routers).map((router) => (
                    <li key={router.path}>
                        <Link to={router.path}>
                            <MenuButton 
                                icon={router.icon} 
                                hoveredIcon={router.hoveredIcon}
                                isActive={active === router.path}  
                                onClick={() => setActive(router.path)}  
                            >
                                {router.title}
                            </MenuButton>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

