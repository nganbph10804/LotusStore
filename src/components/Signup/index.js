import {React,useState} from 'react'
import Button from '../Forms/Button';
import FormInput from '../Forms/Forminput';
import './style.scss';

import {auth,handleUserProfile} from './../../firebase/ultils';
import AuthWraper from '../AuthWraper';


const Signup = () => {

        const initialState={
            displayName:'',
            email:'',
            password: '',
            confirmPassword:''
        }
const [signup, setSignup] = useState(initialState);

const handleChange =(e)=>{
    const {name,value} =e.target;
    
    setSignup(prev=>({
        ...prev,
        [name] :value
    }));
   
}
console.log(signup);
const [err,setErr] =useState('');
const handleSubmit = async event=>{
    event.preventDefault();

    const {displayName, email,password,confirmPassword} = signup;

    if(password !== confirmPassword){
      setErr('Password dont match!');
      
        return;
    }
    try {
     
     
        const {user} =  await auth.createUserWithEmailAndPassword(email,password);

        await handleUserProfile(user,{displayName});
        
        setSignup({
            ...initialState
        });

    } catch (error) {
        console.log(error);
    }

}

const configAuthWrapper={
    headline: 'Registration'
}


    return (
       <AuthWraper {...configAuthWrapper}>
                {err? err :''}
                <div className="formWrap">

                
                <form onSubmit={handleSubmit}>
                    
                    <FormInput
                    type="text"
                    name="displayName"
                    value={signup.displayName}
                    placeholder="Fullname"
                    onChange={handleChange}
                    />
                    <FormInput
                    type="text"
                    name="email"
                    value={signup.email}
                    placeholder="Email"
                    onChange={handleChange}
                    />

                    <FormInput
                    type="password"
                    name="password"
                    value={signup.password}
                    placeholder="Password"
                    onChange={handleChange}
                    />

                    <FormInput
                    type="password"
                    name="confirmPassword"
                    value={signup.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    />

                    <Button type="submit">
                        REGISTER
                    </Button>
                </form>
                </div>
        </AuthWraper>
    )
}

export default Signup
