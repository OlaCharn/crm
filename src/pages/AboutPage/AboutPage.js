import logoPTB from "../../shared/assets/img/logo_ptb.png"
import { Stack } from "../../shared/ui/Stack/Stack"

const AboutPage = () =>{
    return(
        <div> 
            <Stack direction="column" gap={16} align="alignStart" >
            <img src={logoPTB} alt="logoPTB" width="auto" />
            <Stack direction="column" align="alignStart" gap={8} >
            <h3>Ethics CRM</h3> 
            <h4>Version: 0.8.0</h4>
            <h4>Copyright &copy; 2024-2025 National Metrology Instutute</h4>
            <h4>Department 8.1 Biomedical Magnetic Resonance</h4>
            </Stack>
            </Stack>
        </div>
    )
}
export default AboutPage;