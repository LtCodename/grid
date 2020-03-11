import React from 'react';
import styled, { ThemeProvider } from "styled-components";
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import { Row } from "../SharedStyles";

const NavigationWrapper = styled(Row)`
    background-color: #fde3a7;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
`;

const TabsWrapper = styled.ul`
    display: flex;
    justify-content: center;
    list-style: none;
    margin-bottom: 0;
    flex-wrap: wrap;
`;

const SVG = styled.svg`
    height: 20px;
    fill: #784d2b;
`;

const LoginButton = styled(NavLink)`
    background: #fff9de;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    border-radius: 50%;
    border: 3px solid transparent;
    transition: border .2s;
    :hover {
    	border: 3px solid #784d2b;
    }
`;


const Tab = styled.button`
    /*border: 5px solid ${props => {
		return ((props.id === props.pageIndex) ? props.theme.borderColor : "transparent")
	}};*/
	border none;
	font-weight: ${props => {
		return ((props.id === props.pageIndex) ? 800 : 500)
	}};
    background: ${props => props.theme.backGround};
    color: ${props => props.theme.foreGround};
    padding: 10px;
    cursor: pointer;
	margin: 0 5px;
	outline: none;
	:focus, :hover {
		outline: none;
	}
`;

const theme = {
	foreGround: "#784d2b",
	backGround: "#fff9de",
	borderColor: '#784d2b'
};

const NavigationPanel = ({...otherProps}) => {
	const pathParts = otherProps.match.path.split('/');
	const pageIndex = pathParts[1];

	return (
		<ThemeProvider theme={theme}>
			<NavigationWrapper>
				<TabsWrapper>
					<li>
						<NavLink to="/seasons">
							<Tab pageIndex={pageIndex} id={"seasons"}>Seasons</Tab>
						</NavLink>
					</li>
					<li>
						<NavLink to="/drivers">
							<Tab pageIndex={pageIndex} id={"drivers"}>Drivers</Tab>
						</NavLink>
					</li>
					<li>
						<NavLink to="/teams">
							<Tab pageIndex={pageIndex} id={"teams"}>Teams</Tab>
						</NavLink>
					</li>
				</TabsWrapper>
				<Row>
					<LoginButton to={'/admin'}>
						<SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
							 role="img" xmlns="http://www.w3.org/2000/svg"
							 viewBox="0 0 448 512">
							<path
	d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
						</SVG>
					</LoginButton>
				</Row>
			</NavigationWrapper>
		</ThemeProvider>
	)
};

export default withRouter(NavigationPanel);
