import {React,useState} from 'react'
import Button from '../Forms/Button';
import FormInput from '../Forms/Forminput';
import './style.scss';

import {auth,handleUserProfile} from './../../firebase/ultils';
import AuthWraper from '../AuthWraper';
import { withRouter } from 'react-router-dom';


const Signup = ({props}) => {

        const initialState='';
const [displayName, setDisplayName] = useState(initialState);
const [email, setEmail] = useState(initialState);
const [password, setPassword] = useState(initialState);
const [confirmPassword, setConfirmPassword] = useState(initialState);


const resetForm = ()=>{
    setPassword('');
    setEmail('');
    setConfirmPassword("");
    setDisplayName('');
}
const [err,setErr] =useState([]);
const handleSubmit = async event=>{
    event.preventDefault();


    if(password !== confirmPassword){
      setErr('Password dont match!');
      
        return;
    }
    try {
     
     
        const {user} =  await auth.createUserWithEmailAndPassword(email,password);

        await handleUserProfile(user,{displayName});
        
       resetForm();
       props.history.push('/');

    } catch (error) {
        console.log(error);
        setErr(error.message);
       
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
                    value={displayName}
                    placeholder="Fullname"
                    handleChange={e=>setDisplayName(e.target.value)}
                    />
                    <FormInput
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Email"
                    handleChange={e=>setEmail(e.target.value)}
                    />

                    <FormInput
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    handleChange={e=>setPassword(e.target.value)}
                    />

                    <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    handleChange={e=>setConfirmPassword(e.target.value)}
                    />

                    <Button type="submit">
                        REGISTER
                    </Button>
                </form>
                </div>
        </AuthWraper>
    )
}

export default withRouter(Signup)