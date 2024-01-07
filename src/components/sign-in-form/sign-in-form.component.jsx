import { useState, } from 'react'

import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import {ButtonsContainer, SignupContainer, SignupHeading} from './sign-in-form.styles.jsx'

const defaultFormFields={
    email: '',
    password: '',
}



const SignInForm =()=>{
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email,password} = formFields;

    

    const resetFormFields =()=>{
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async ()=>{
        await signInWithGooglePopup();
        
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        try{
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            //setCurrentUser(user);

            resetFormFields()
        }catch(error){
            console.log(error)
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error)
            }
            // if(error.code === 'auth/wrong-password'){
            //     alert('incorrect password for email')
            // } else if(error.code === 'auth/user-not-found'){

            // }
           }
    }
    
    const handleChange =(event)=>{
        const {name,value} = event.target;

        setFormFields({...formFields, [name]:value})
    }
    return(
        <SignupContainer>
            <SignupHeading>Already have an account?</SignupHeading>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                label="Email"
                type="email"
                onChange={handleChange}
                name='email'
                value={email}
                required
                />
                
                <FormInput
                label="Password"
                type="password"
                onChange={handleChange}
                name='password'
                value={password}
                required
                 />
                 <ButtonsContainer>
                    <Button type="submit">
                        Sign In
                    </Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle} >Google sign in</Button>
                 </ButtonsContainer>
                
            </form>
        </SignupContainer>
    )
}

export default SignInForm