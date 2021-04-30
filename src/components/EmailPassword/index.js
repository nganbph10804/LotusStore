import { React, useState } from 'react'
import AuthWraper from '../AuthWraper';
import Button from '../Forms/Button';
import FormInput from '../Forms/Forminput';
import './style.scss';
import { auth } from './../../firebase/ultils';
import { withRouter, useHistory } from 'react-router-dom';

const EmailPassword = ({ props }) => {
    const configAuthWrapper = {
        headline: 'Email Password'
    }
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');


    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {


            const config = {
                url: 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {

                    history.push('/login');
                })
                .catch(() => {
                    setErr('Email not found ! Please try again');
                })

        } catch (error) {
            console.log(error);
        }

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
