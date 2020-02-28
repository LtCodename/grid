import React from 'react';
import styled, { ThemeProvider } from "styled-components";
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";

const NavigationWrapper = styled.div`
    background-color: #fde3a7;
    display: flex;
    justify-content: center;
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

const Tab = styled.button`
    border: 5px solid ${props => {
		return ((props.id === props.pageIndex) ? props.theme.borderColor : "transparent")
	}};
	font-weight: ${props => {
		return ((props.id === props.pageIndex) ? 800 : 500)
	}};
    background: ${props => props.theme.backGround};
    color: ${props => props.theme.foreGround};
    margin: 0;
    padding: 10px;
    cursor: pointer;
	margin: 5px;
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
			<NavigationWrapper className="navigationWrapper">
				<TabsWrapper className="navigationTabs">
					<li>
						<NavLink to="/seasons">
							<Tab className="navigationButton" pageIndex={pageIndex} id={"seasons"}>Seasons</Tab>
						</NavLink>
					</li>
					<li>
						<NavLink to="/drivers">
							<Tab className="navigationButton" pageIndex={pageIndex} id={"drivers"}>Drivers</Tab>
						</NavLink>
					</li>
					<li>
						<NavLink to="/teams">
							<Tab className="navigationButton" pageIndex={pageIndex} id={"teams"}>Teams</Tab>
						</NavLink>
					</li>
				</TabsWrapper>
			</NavigationWrapper>
		</ThemeProvider>
	)
};

export default withRouter(NavigationPanel);
