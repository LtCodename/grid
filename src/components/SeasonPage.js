import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ActionButton, ComponentRestricted, H3, Item, Wrapper} from "../SharedStyles";
import {connect} from "react-redux";
import ManageSeasonForm from "./ManageSeasonForm";
import {NavLink} from "react-router-dom";
import ManageRaceForm from "./ManageRaceForm";
import styled from "styled-components";
import AttachDrivers from "./SeasonPageComponents/AttachDrivers";
import Statistics from "./SeasonPageComponents/Statistics";
import DriversStandings from "./SeasonPageComponents/DriversStandings";
import ConstructorsStandings from "./SeasonPageComponents/ConstructorsStandings";

const SeasonInformation = styled.div`
    text-align: center;
`;

const InformationBit = styled.div`
    text-align: center;
`;

const H2 = styled.h2`
    width: 100%;
    text-align: center;
    color: #784d2b;
`;

class SeasonPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editSeasonMode: false,
            addRaceMode: false
        };
    }

    onEditSeason = () => {
        if (!this.state.editSeasonMode) {
            this.setState({
                editSeasonMode: true
            })
        }else {
            this.setState({
                editSeasonMode: false
            })
        }
    };

    addRace = () => {
        if (!this.state.addRaceMode) {
            this.setState({
                addRaceMode: true
            })
        }else {
            this.setState({
                addRaceMode: false
            })
        }
    };

    render() {
        const racesToDisplay = (
            this.props.races.filter(r => {
                return (
                    r['season-id'] === this.props.match.params.season_id
                )
            }).map((race, index) => {
                return (
                    <NavLink key={index} to={`/races/${this.props.match.params.season_id}/${race.id}`}>
                        <Item className="btn">{race.name}</Item>
                    </NavLink>
                )
            })
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <H2>{this.props.season.name}</H2>
                    {/*Add Grand Prix Button*/}
                    <Wrapper>
                        <ActionButton
                            className="btn btn-warning"
                            onClick={this.addRace}>
                            {!this.state.addRaceMode ? "Add Grand Prix" : "Hide"}
                        </ActionButton>
                    </Wrapper>
                    {this.state.addRaceMode ? <ManageRaceForm seasonId={this.props.season.id} mode={'add'}/> : ""}
                    {/*Races*/}
                    <Wrapper>
                        {racesToDisplay}
                    </Wrapper>
                    {/*General Information*/}
                    <SeasonInformation>
                        <InformationBit>
                            <H3>Statistics</H3>
                            {this.props.season.drivers ? <Statistics seasonDrivers={this.props.season.drivers}/> : 'No drivers selected'}
                        </InformationBit>
                        <InformationBit>
                            <H3>Drivers Standings</H3>
                            {this.props.season.drivers ? <DriversStandings seasonDrivers={this.props.season.drivers}/> : 'No drivers selected'}
                        </InformationBit>
                        <InformationBit>
                            <H3>Constructors Standings</H3>
                            {this.props.season.drivers ? <ConstructorsStandings seasonDrivers={this.props.season.drivers}/> : 'No drivers selected'}
                        </InformationBit>
                    </SeasonInformation>
                    {/*Edit Season Button*/}
                    <Wrapper>
                        <ActionButton
                            className="btn btn-warning"
                            onClick={this.onEditSeason}>
                            {!this.state.editSeasonMode ? "Edit Season" : "Hide"}
                        </ActionButton>
                    </Wrapper>
                    {this.state.editSeasonMode ? <ManageSeasonForm seasonId={this.props.match.params.season_id} mode={'edit'}/> : ''}
                    {/*Attach Drivers To Current Season*/}
                    <Wrapper>
                        <AttachDrivers seasonId={this.props.match.params.season_id}/>
                    </Wrapper>
                </ComponentRestricted>
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        season: state.seasons.find(season => {
            return season.id === props.match.params.season_id
        }),
        races: state.races
    }
};

const SeasonPageConnected = connect(mapStateToProps, null)(SeasonPage);

export default SeasonPageConnected;
