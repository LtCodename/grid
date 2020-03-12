import React, {useEffect, useState} from 'react';
import NavigationPanel from "./NavigationPanel";
import { ActionButton, Col, ComponentRestricted } from "../SharedStyles";
import { withRouter } from "react-router";
import styled from "styled-components";
import fire from "../fire";
import { useDispatch, useStore } from "react-redux";
import userReducer from "../redux/reducers/UserReducer";

const MainWrapper = styled(Col)`
    align-items: center;
`;

const InputWrapper = styled(Col)`
    min-width: 250px;
`;

const Label = styled.label`
    text-align: center;
    color: #774d2b;
    margin-bottom: 5px;
`;

const Input = styled.input`
    margin-bottom: 10px;
`;

const AuthPanel = styled(Col)`
    align-items: center;
`;

const LoginButton = styled(ActionButton)`
    margin: 0 0 10px 0;
`;

const LogoutButton = styled(ActionButton)`
    margin: 0;
`;

/*const AdminInput = styled.input`
`;

const AdminCol = styled(Col)`
    align-items: center;
`;*/

const LoginPage = ({...otherProps}) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userData, setUserData] = useState('');
    /*const [adminEmail, setAdminEmail] = useState('');*/

    const store = useStore();
    const storeState = store.getState();
    const user = storeState.user;

    const dispatch = useDispatch();

    useEffect(() => {
        setUserData(user);
    }, [user]);

    const inputValuesChange = (event) => {
        if (event.target.id === 'loginEmail') {
            setUserEmail(event.target.value);
        }
        if (event.target.id === 'loginPassword') {
            setUserPassword(event.target.value);
        }
    };

    const onLogin = (event) => {
        event.preventDefault();
        if (userEmail === '' || userPassword === '') {
            return;
        }

        fire.auth().signInWithEmailAndPassword(userEmail, userPassword).then(credential => {
            setUserEmail('');
            setUserPassword('');
            setUserData('user');
        }).catch(error => {
            console.log(error.message);
        });
    };

    const onLogout = (event) => {
        event.preventDefault();
        fire.auth().signOut().then(() => {
            setUserData('');
            dispatch({type: userReducer.actions.USER_CLEAR});
        }).catch(error => {
            console.log(error.message);
        });
    };

    const logoutButton = (
        <LogoutButton onClick={onLogout}>Logout</LogoutButton>
    );

    const authPanel = (
        <AuthPanel>
            <InputWrapper>
                <Label htmlFor="loginEmail">Email Address</Label>
                <Input
                    className="form-control"
                    autoComplete="username email"
                    placeholder="Enter email"
                    type="email"
                    id="loginEmail"
                    value={userEmail}
                    onChange={inputValuesChange} required/>
            </InputWrapper>
            <InputWrapper>
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                    className="form-control"
                    autoComplete="current-password"
                    placeholder="Enter password"
                    type="password"
                    id="loginPassword"
                    value={userPassword}
                    onChange={inputValuesChange} required/>
            </InputWrapper>
            <LoginButton onClick={onLogin}>Login</LoginButton>
        </AuthPanel>
    );

    /*const adminValueChange = (event) => {
        setAdminEmail(event.target.value);
    };

    const onMakeAdmin = (event) => {
        event.preventDefault();
        const addAdminRole = fire.functions().httpsCallable('addAdminRole');
        addAdminRole({ email: adminEmail }).then(result => {
            console.log(result);
        })
    };*/

    /*const makeAdmin = (
        <form onSubmit={onMakeAdmin}>
            <AdminCol>
                <AdminInput
                    className="form-control"
                    autoComplete="username email"
                    placeholder="Enter email"
                    type="email"
                    value={adminEmail}
                    onChange={adminValueChange} required/>
                <ActionButton>Make Admin</ActionButton>
            </AdminCol>
        </form>
    );*/

    return (
        <>
            <NavigationPanel/>
            <ComponentRestricted>
                <MainWrapper>
                    {/*{makeAdmin}*/}
                    {userData.length === 0 ? authPanel : ""}
                    {userData.length === 0 ? "" : logoutButton}
                </MainWrapper>
            </ComponentRestricted>
        </>
    )
};

export default withRouter(LoginPage);
