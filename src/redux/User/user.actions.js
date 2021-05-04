import userTypes from './user.types';
import { auth, handleUserProfile, GoogleProvider } from '../../firebase/ultils';

export const emailSignInStart = userCredential =>({
    type: userTypes.EMAIL_SIGN_IN_START,
    payload: userCredential
});

export const signInsuccess = user =>({
    type :userTypes.SIGN_IN_SUCCESS,
    payload : user
});


export const checkUserSession =()=>({
    type: userTypes.CHECK_USER_SESSION
    
});

export const signOutUserStart =()=>({
    type: userTypes.SIGN_OUT_USER_START
});
export const signOutUserSuccess =()=>({
    type: userTypes.SIGN_OUT_USER_SUCCESS
});

export const signUpUserStart = userCredential =>({
    type: userTypes.SIGN_UP_USER_START,
    payload: userCredential
});
export const userError =err =>({
    type:userTypes.USERs_ERROR,
    payload: err
})

export const resetPasswordStart = userCredentials => ({
    type: userTypes.RESET_PASSWORD_START,
    payload: userCredentials
  });
  
  export const resetPasswordSuccess = () => ({
    type: userTypes.RESET_PASSWORD_DONE,
    payload: true
  });

  export const resetUserState = ()=>({
      type:userTypes.RESET_USER_STATE
  });

  export const googleSignInStart =()=>({
      type:userTypes.GOOGLE_SIGNIN_START
  });






// export const setCurrentUser = (user) => ({
//     type: userTypes.SET_CURRENT_USER,
//     payload: user
// });

// // export const signInUser = ({ email, password }) => async dispatch => {
    
// // };

// export const resetAllForms =()=>({
//             type: userTypes.RESET_AUTH_USER

// });

// export const signOut =() => async dispatch =>{
//             try {
//                 await auth.signOut();
//                 dispatch({
//                     type :userTypes.SET_CURRENT_USER,
//                     payload : null
//                 });

//                 dispatch({
//                     type :userTypes.SIGN_IN_SUCCESS,
//                     payload : false
//                 });
                
//             } catch (error) {
//                 console.log(error);
//             }

// };

// export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
//     if(password !== confirmPassword) {
//         const err = ['Password dont match!'];
//         dispatch({
//         type: userTypes.SIGN_UP_ERROR,
//         payload : err
//     });
//        return;
//     }
//        try {


//     const { user } = await auth.createUserWithEmailAndPassword(email, password);

//     await handleUserProfile(user, { displayName });
//     dispatch({
//         type: userTypes.SIGN_UP_SUCCESS,
//         payload : true
//     })
   

//    } catch (error) {
//     dispatch({
//         type: userTypes.SIGN_UP_ERROR,
//         payload : error.message
//     });
    
   

// }

// };

// export const resetPassword =({email}) => async dispatch =>{
   
   
    
//     try {

//         const config = {
//             url: 'http://localhost:3000/login'
//         }

        

//         await auth.sendPasswordResetEmail(email, config)
//             .then(() => {
//                 dispatch({
//                     type: userTypes.RESET_PASSWORD_SUCCESS,
//                     payload:true
//                 });

              
//             })
//             .catch((er) => {
//                 const err =['Email not Found!']+[er.message];
//                 dispatch({
//                     type : userTypes.RESET_PASSWORD_ERROR,
//                     payload : err
//                 });
//             })

//     } catch (error) {
        
//         dispatch({
//             type : userTypes.RESET_PASSWORD_ERROR,
//             payload : error.message
//         });
//     }
// };
// export const signInWithGoogle = () => async dispatch =>{
//    try {
//    await  auth.signInWithPopup(GoogleProvider)
//    .then(()=>{
//             dispatch({
//                 type: userTypes.SIGN_IN_SUCCESS,
//                 payload: true
//             })
//    });


//    } catch (error) {
//        console.log(error);
//    }
// };