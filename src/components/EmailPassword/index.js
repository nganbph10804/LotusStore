import {React,useState} from 'react'
import AuthWraper from '../AuthWraper';
import Button from '../Forms/Button';
import FormInput from '../Forms/Forminput';
import './style.scss';
import {auth} from './../../firebase/ultils';
import {withRouter,useHistory} from 'react-router-dom';

const EmailPassword = () => {
    const configAuthWrapper={
        headline:'Email Password'
    }
    const [state, setState] = useState({
        email:''
        });
 const [err, setErr] = useState('');
    
    const handleChange = (e)=>{
        const {name,value} = e.target;

        setState({
           
            [name] :value
        });


    }
    let history =useHistory();
    const handleSubmit= async (e)=>{
        e.preventDefault();


        try {
            
            const {email} = state;
            console.log(state.email);
            const config={
                url: 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email,config)
                .then(()=>{
               
                history.push('/login');
                })
                .catch(()=>{
                   setErr('Email not found ! Please try again');
                })

        } catch (error) {
            console.log(error);
        }

    }


    return (
       <AuthWraper {...configAuthWrapper}>
        <div className="formWrap">
           {err?err:''}
            <form onSubmit={handleSubmit}>
                <FormInput
                type="email"
                name="email"
                value={state.email}
                placeholder="Email"
                onChange={handleChange}
                />
                <Button type="submit">
                    Email Password
                </Button>

            </form>
        </div>

       </AuthWraper>
    )
}

export default EmailPassword
