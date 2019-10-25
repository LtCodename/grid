import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted} from "../sharedStyles";
/*import styled from "styled-components";

const NavBar = styled.nav`

`;*/

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <>
               <NavigationPanel />
                <ComponentRestricted>
                    <p>Dashboard</p>
                </ComponentRestricted>
            </>
        )
    }
}

export default Dashboard;
