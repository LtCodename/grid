import React from 'react';
import styled, { ThemeProvider } from "styled-components";
import { NavLink } from 'react-router-dom';
import {connect} from "react-redux";
import pageIndexReducer from "../redux/reducers/PageIndexReducer";

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
    border: 2px solid ${props => {
        //console.log(props);
        return ((props.id === props.pageIndex) ? props.theme.borderColor : "none")
    }};
    
    border: none;
    background: ${props => props.theme.backGround};
    color: ${props => props.theme.foreGround};
  
    margin: 0;
    padding: 10px;
    cursor: pointer;
    margin: 5px;
`;

const theme = {
    foreGround: "#784d2b",
    backGround: "#fff9de",
    borderColor: '#FFF'
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

    changeIndex = (event) => {
        this.props.setIndex(event.target.id);
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <NavigationWrapper className="navigationWrapper">
                    <TabsWrapper className="navigationTabs">
                        <li>
                            <ThemeProvider theme={theme} pageIndex={this.props.pageIndex} id={"seasons"}>
                                <NavLink to="/seasons">
                                    <Tab className="btn navigationButton" pageIndex={this.props.pageIndex} id={"seasons"} onClick={this.changeIndex}>Seasons</Tab>
                                </NavLink>
                            </ThemeProvider>
                        </li>
                        <li>
                            <NavLink to="/drivers"><Tab className="btn navigationButton" id={"drivers"} onClick={this.changeIndex}>Drivers</Tab></NavLink>
                        </li>
                        <li>
                            <NavLink to="/teams"><Tab className="btn navigationButton" id={"teams"} onClick={this.changeIndex}>Teams</Tab></NavLink>
                        </li>
                    </TabsWrapper>
                </NavigationWrapper>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state = {}) => {
    return {
        pageIndex: state.pageIndex
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIndex: (pageIndex) => {
            dispatch({ type: pageIndexReducer.actions.PAGE_CHANGE, pageIndex: pageIndex });
        }
    }
};


const TeamsNavigationPanel = connect(mapStateToProps, mapDispatchToProps)(NavigationPanel);

export default TeamsNavigationPanel;
