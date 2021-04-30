import {React,useState} from 'react'
import Button from '../Forms/Button';
import './style.scss';
import { signInWithGoogle,auth} from  './../../firebase/ultils';
import FormInput from './../Forms/Forminput';
import AuthWraper from '../AuthWraper';
import {Link,withRouter} from 'react-router-dom';


const Signin = ({props}) => {
 const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [err, setErr] = useState([]);

const initialState={
    email:'',
    password:''
}

const resetForm = ()=>{
    setPassword('');
    setEmail('');
}
 

const handleSubmit = async e =>{
    e.preventDefault();
  

    try {
        
        await auth.signInWithEmailAndPassword(email,password);

        resetForm();
        props.history.push('/');
    } catch (error) {
        console.log(error);
        setErr(error.message);
    }

}

const configAuthWrapper={
    headline : 'Login'
};
    return (
        <AuthWraper {...configAuthWrapper}>
                {err?err:''}
               <div className="formWrap">
                   <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="email"
                       handleChange={e=> setEmail(e.target.value)}
            
                    
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e=> setPassword(e.target.value)}
                    
                    />
                    <Button type="submit">
                        Login
                    </Button>


                        <div className="socialSignin">
                            <div className="row">
                            <Button onClick={signInWithGoogle}>
                                Sign in with Google
                            </Button>
                            </div>
                        </div>
                        <div className="links">
                            <Link to="/recovery">
                                Reset Password
                            </Link>
                        </div>

                   </form>
               </div>
        </AuthWraper>
    )
}

export default withRouter(Signin)
