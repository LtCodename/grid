import React from 'react';
import styled, { ThemeProvider } from "styled-components";
import { NavLink } from 'react-router-dom';

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
    //border: 2px solid ${props => props.theme.fg};
    border: none;
    background: ${props => props.theme.bg};
    color: ${props => props.theme.fg};
  
    margin: 0;
    padding: 10px;
    cursor: pointer;
    margin: 5px;
`;

const theme = {
    fg: "#784d2b",
    bg: "#fff9de"
};

/*const invertTheme = ({ fg, bg }) => ({
    fg: bg,
    bg: fg
});*/

class NavigationPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <NavigationWrapper className="navigationWrapper">
                    <TabsWrapper className="navigationTabs">
                        <li>
                            <ThemeProvider theme={theme}>
                                <NavLink to="/seasons">
                                    <Tab className="btn navigationButton">Seasons</Tab>
                                </NavLink>
                            </ThemeProvider>
                        </li>
                        {/*<li>
                            <NavLink to="/dashboard">
                                <Tab className="btn navigationButton">Dashboard</Tab>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/drivers-standings"><Tab className="btn navigationButton">Drivers Standings</Tab></NavLink>
                        </li>
                        <li>
                            <NavLink to="/constructors-standings"><Tab className="btn navigationButton">Constructor Standings</Tab></NavLink>
                        </li>*/}
                        <li>
                            <NavLink to="/drivers"><Tab className="btn navigationButton">Drivers</Tab></NavLink>
                        </li>
                        <li>
                            <NavLink to="/teams"><Tab className="btn navigationButton">Teams</Tab></NavLink>
                        </li>
                    </TabsWrapper>
                </NavigationWrapper>
            </ThemeProvider>
        )
    }
}

export default NavigationPanel;
