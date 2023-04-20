export const ValidateAccount = (email,password) => {

    
    const emailStrongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
    const passwordStrongRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$");

    if (!emailStrongRegex.test(email)) {
      setShowErrorEmail(true);
    } else {
      setShowErrorEmail(false);
    }

    if (!passwordStrongRegex.test(password)) {
      setShowErrorPassword(true);
    } else {
      setShowErrorPassword(false);
    }
  }
  



export default function validateAccount(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [showErrorPassword, setShowErrorPassword] = useState(false);
    const [showErrorEmail, setShowErrorEmail] = useState(false);
  
    const signIn = (email, password) => {                          // <= Added this function
      const emailStrongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
      const passwordStrongRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$");
  
      if (!emailStrongRegex.test(email)) {
        setShowErrorEmail(true);
      } else {
        setShowErrorEmail(false);
      }
  
      if (!passwordStrongRegex.test(password)) {
        setShowErrorPassword(true);
      } else {
        setShowErrorPassword(false);
      }
    }
}