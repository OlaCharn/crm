import {BrowseTable} from './ui/BrowseTable';
import { useAuth } from '../../features/auth/AuthProvider';

const BrowsePage = () =>{
    const { user } = useAuth();

    if (!user) {
        return <div>Please login to access the Browse</div>;
    }
    return(
        <>        
            <BrowseTable/>
        </>
        
    )
}
export default BrowsePage;