import { ArrowsIcon } from "../../shared/assets/svg/ArrowsIcon/ArrowsIcon";
import { BoxWhiteBackground } from "../../shared/ui/BoxWhiteBackground/BoxWhiteBackground";
import { Button } from "../../shared/ui/ButtonsPages/Button";

const DashboardPage = () =>{
    return(
        <>
        <BoxWhiteBackground>
            <p>100 persons should be anonymized</p>
            <Button variant="green" > Anonimize <ArrowsIcon/> </Button>
        
        </BoxWhiteBackground>
        </>
    )
}
export default DashboardPage;