import React, {useState} from 'react';
import NavigationPanel from "./NavigationPanel";
import {ActionButton, Col, ComponentRestricted} from "../SharedStyles";
import { withRouter } from "react-router";
import styled from "styled-components";
import fire from "../fire";
import {useStore} from "react-redux";

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

const LoginButton = styled(ActionButton)`
    
`;

const LogoutButton = styled(ActionButton)`
    margin: 0;
`;

const LoginPage = ({...otherProps}) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const store = useStore();
    const storeState = store.getState();
    const user = storeState.user;

    console.log(user);

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
        }).catch(error => {
            console.log(error.message);
        });
    };

    const onLogout = (event) => {
        event.preventDefault();
        fire.auth().signOut().then(() => {
        }).catch(error => {
            console.log(error.message);
        });
    };

    return (
        <>
            <NavigationPanel/>
            <ComponentRestricted>
                <MainWrapper>
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
                    <LogoutButton onClick={onLogout}>Logout</LogoutButton>
                </MainWrapper>
            </ComponentRestricted>
        </>
    )
};

export default withRouter(LoginPage);
