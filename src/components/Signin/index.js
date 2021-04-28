import {React,useState} from 'react'
import Button from '../Forms/Button';
import './style.scss';
import { signInWithGoogle,auth} from  './../../firebase/ultils';
import FormInput from './../Forms/Forminput';
const Signin = () => {

const initialState={
    email:'',
    password:''
}
const  [sigin, setSigin] = useState(initialState);

const handleChange=(e)=>{
    const {name,value}= e.target;

    setSigin(prevValue=>({
        ...prevValue,
        [name]:value
    }));
}


const handleSubmit = async e =>{
    e.preventDefault();
    const {email,password} =sigin;

    try {
        
        await auth.signInWithEmailAndPassword(email,password);

        setSigin({...initialState});

    } catch (error) {
        console.log(error);
    }

}
    return (
        <div className="signin">
            <div className="wrap">
                <h2>
                    Login
                </h2> 

               <div className="formWrap">
                   <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={sigin.email}
                        placeholder="email"
                        onChange={handleChange}
                    
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={sigin.password}
                        placeholder="Password"
                        onChange={handleChange}
                    
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

                   </form>
               </div>
            </div>
        </div>
    )
}

export default Signin
