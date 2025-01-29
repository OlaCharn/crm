import { Stack } from "../../shared/ui/Stack/Stack"

const AboutPage = () =>{
    return(
        <div> 
            <Stack direction="column" gap={16} align="alignStart" >
            <img src={null} alt="logo" width="auto" />
            <Stack direction="column" align="alignStart" gap={8} >
            <h3>Ethics CRM</h3> 
            <h4>Version: 0.8.0</h4>
            <h4>Copyright &copy; 2024-2025 </h4>
            <h4>Abteilung: </h4>
            </Stack>
            </Stack>
        </div>
    )
}
export default AboutPage;