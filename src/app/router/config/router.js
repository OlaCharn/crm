import { IconSettings } from "../../../shared/assets/svg/SettingsIcon/IconSettings";
import { IconDashboard } from "../../../shared/assets/svg/DashboardIcon/IconDashboard";
import { IconBrowse } from "../../../shared/assets/svg/BrowseIcon/IconBrowse";
import { IconAbout } from "../../../shared/assets/svg/AboutIcon/IconAbout";
import { IconHelp } from "../../../shared/assets/svg/HelpIcon/IconHelp";
import DashboardPage from "../../../pages/DashboardPage/DashboardPage";
import BrowsePage from "../../../pages/BrowsePage/BrowsePage";
import SettingsPage from "../../../pages/SettingsPage/SettingsPage";
import AboutPage from "../../../pages/AboutPage/AboutPage";
import HelpPage from "../../../pages/HelpPage/HelpPage";
import { IconAboutHover } from "../../../shared/assets/svg/AboutIcon/IconAboutHover";
import { IconBrowseHover } from "../../../shared/assets/svg/BrowseIcon/IconBrowseHover";
import { IconDashboardHover } from "../../../shared/assets/svg/DashboardIcon/IconDashboardHover";
import { IconHelpHover } from "../../../shared/assets/svg/HelpIcon/IconHelpHover";
import { IconSettingsHover } from "../../../shared/assets/svg/SettingsIcon/IconSettingsHover";



export const routers = {
    dashboard: {
        path: "/",
        title: "Dashboard",
        icon: <IconDashboard />,
        hoveredIcon: <IconDashboardHover />,
        element: <DashboardPage />
    },
    browse: {
        path: "/browse",
        title: "Browse",
        icon: <IconBrowse />,
        hoveredIcon:<IconBrowseHover /> ,
        element: <BrowsePage/>
    },
    settings: {
        path: "/settings",
        title: "Settings",
        icon: <IconSettings />,
        hoveredIcon: <IconSettingsHover/>,
        element: <SettingsPage/>
    },
    about: {
        path: "/about",
        title: "About",
        icon: <IconAbout />,
        hoveredIcon: <IconAboutHover />,
        element: <AboutPage />
    },
    help: {
        path: "/help",
        title: "Help",
        icon: <IconHelp />,
        hoveredIcon: <IconHelpHover /> ,
        element: <HelpPage/>
    },
    


}