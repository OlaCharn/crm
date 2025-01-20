import { SettingsTable } from "./ui/SettingsTable";
import { useAuth } from "../../features/auth/AuthProvider";

const SettingsPage = () =>{

    const { user } = useAuth();

    if (!user) {
        return <div>Please login to access the Settings</div>;
    }

    return(
        <div>
            <SettingsTable />
        </div>
    )
}
export default SettingsPage;