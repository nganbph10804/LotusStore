import userTypes from './user.types';
import { takeLatest, call, all, put, take } from 'redux-saga/effects';
import { resetPasswordSuccess, signInsuccess, signOutUserSuccess, userError } from './user.actions';
import { auth, handleUserProfile, GoogleProvider, getCurrentUser } from '../../firebase/ultils';
import { handleResetPasswordAPI } from './user.helper';

export function* getSnapShotFromUserAuth(user,additionalData={}) {
    try {

        const userRef = yield call(handleUserProfile, { userAuth: user,additionalData});
        const snapshot = yield userRef.get();
        yield put(
            signInsuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        );




    } catch (error) {

    }
}


export function* emailSignIn({ payload: { email, password } }) {
    try {

        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user)


        // dispatch({
        //     type: userTypes.SIGN_IN_SUCCESS,
        //     payload: true
        // });

    } catch (error) {
        // console.log(error);
        // dispatch({
        //     type: userTypes.SIGN_IN_ERROR,
        //     payload : error.message

        // });

    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}
export function* isAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) {
            return;
        }
        yield getSnapShotFromUserAuth(userAuth);

    } catch (err) {
        console.log(err);
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isAuthenticated);
}
export function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(
            signOutUserSuccess()
        )

    } catch (error) {
        console.log(error);
    }

}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({
    payload: {
        displayName,
        email,
        password,
        confirmPassword
    }
}) {

    if (password !== confirmPassword) {
        const err = ['Password dont match!'];
        yield put(
            userError(err)
        )
      
        return;
    }
    try {


        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const additonalData = {displayName};
        yield getSnapShotFromUserAuth(user,additonalData);
        


    } catch (error) {
        console.log(error);
        yield put(
            userError(error.message)
        )



    }
}
 
export function* onSignUpUserStart() {
  yield  takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export function* resetPassword({ payload: { email }}) {
    try {
      yield call(handleResetPasswordAPI, email);
      yield put(
        resetPasswordSuccess()
      )
  
    } catch (err) {
      
      yield put(
        userError(err)
      )
    }
  }


export function* onResetPasswordStart(){
   yield takeLatest(userTypes.RESET_PASSWORD_START,resetPassword)
}
export function* googleSignIn(){
    
        try {
       const{user} = yield auth.signInWithPopup(GoogleProvider);
       yield getSnapShotFromUserAuth(user);
     
     
        } catch (error) {
            console.log(error);
        }
}

export function* onGoogleSignInStart(){
    yield takeLatest(userTypes.GOOGLE_SIGNIN_START,googleSignIn)
}



export default function* userSaga() {
    yield all([call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart)
    ])
}