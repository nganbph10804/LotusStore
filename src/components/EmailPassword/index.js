import { React, useState,useEffect} from 'react'
import AuthWraper from '../AuthWraper';
import Button from '../Forms/Button';
import FormInput from '../Forms/Forminput';
import './style.scss';
import { auth } from './../../firebase/ultils';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllForms, resetPassword, resetPasswordStart, resetUserState } from '../../redux/User/user.actions';

const EmailPassword = () => {
    
    // const resetPasswordSuccess = useSelector(state=>state.user.resetPasswordSuccess);
    // const resetPasswordError = useSelector(state => state.user.resetPasswordError);
     const resetPasswordSuccess = useSelector(state=>state.user.resetPasswordSuccess);
    const userErr = useSelector(state => state.user.userErr);
    const dispatch= useDispatch();


    const configAuthWrapper = {
        headline: 'Email Password'
    }
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');


    let history = useHistory();
    useEffect(() => {
        if(resetPasswordSuccess){
            dispatch(resetUserState());
            setEmail('');
            history.push('/login');
            setErr([]);
        }
        
    }, [resetPasswordSuccess])
    useEffect(() => {
        if(userErr){
            setErr(userErr);
        }
        
    }, [userErr])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetPasswordStart({email}));

       

    }


    return (
        <AuthWraper {...configAuthWrapper}>
            <div className="formWrap">
                {err ? err : ''}
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />
                    <Button type="submit">
                        Submit
                </Button>

                </form>
            </div>

        </AuthWraper>
    )
}

export default EmailPassword
