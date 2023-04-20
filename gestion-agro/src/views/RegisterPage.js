import RegisterForm from "../components/common/RegisterForm";
import AppBarComponent from "../components/layouts/AppBarComponent";
import { PersonaApiGetRequest } from "../requests/Persona/PersonaApiGetRequest";

  
  export default function RegisterPage() {
    
  
    return (
     <>
      <AppBarComponent/>
     <RegisterForm/>
     
     </>


    );
  }