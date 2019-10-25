import React from 'react';
import styled from "styled-components";
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
`;

const Tab = styled.button`
    margin: 0;
    padding: 10px;
    cursor: pointer;
    margin: 0 5px;
`;

class NavigationPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <>
                <NavigationWrapper className="navigationWrapper">
                    <TabsWrapper className="navigationTabs">
                        <li>
                            <NavLink to="/dashboard"><Tab className="btn navigationButton">Dashboard</Tab></NavLink>
                        </li>
                        <li>
                            <NavLink to="/season-2019"><Tab className="btn navigationButton">2019 Season</Tab></NavLink>
                        </li>
                        <li>
                            <NavLink to="/drivers-standings"><Tab className="btn navigationButton">Drivers Standings</Tab></NavLink>
                        </li>
                        <li>
                            <NavLink to="/constructors-standings"><Tab className="btn navigationButton">Constructor Standings</Tab></NavLink>
                        </li>
                        <li>
                            <NavLink to="/drivers"><Tab className="btn navigationButton">Drivers</Tab></NavLink>
                        </li>
                        <li>
                            <NavLink to="/teams"><Tab className="btn navigationButton">Teams</Tab></NavLink>
                        </li>
                    </TabsWrapper>
                </NavigationWrapper>
            </>
        )
    }
}

export default NavigationPanel;
