import React from 'react';
import NavigationPanel from "./NavigationPanel";
import { Col, ComponentRestricted } from "../SharedStyles";
import { withRouter } from "react-router";
import styled from "styled-components";

const MainWrapper = styled(Col)`
    align-items: center;
`;

const LoginPage = ({...otherProps}) => {
    return (
        <>
            <NavigationPanel/>
            <ComponentRestricted>
                <MainWrapper>
                    <span>LOGIN</span>
                </MainWrapper>
            </ComponentRestricted>
        </>
    )
};

export default withRouter(LoginPage);
