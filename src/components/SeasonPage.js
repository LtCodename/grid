import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ActionButton, ButtonWrapper, ComponentRestricted, Item} from "../SharedStyles";
import {connect} from "react-redux";
import ManageSeasonForm from "./ManageSeasonForm";
import {NavLink} from "react-router-dom";
import ManageRaceForm from "./ManageRaceForm";
import styled from "styled-components";

export const SeasonInformation = styled.div`
    text-align: center;
`;

export const InformationBit = styled.div`
        text-align: center;
        border: 1px solid #fde3a7;
        margin: 10px 0;
        padding: 10px;
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
                    {/*Edit Season Button*/}
                    <ActionButton
                        className="btn btn-warning"
                        onClick={this.onEditSeason}>
                        {!this.state.editSeasonMode ? "Edit Season" : "Hide"}
                    </ActionButton>
                    {this.state.editSeasonMode ? <ManageSeasonForm seasonId={this.props.match.params.season_id} mode={'edit'}/> : ''}
                    {/*General Information*/}
                    <SeasonInformation>
                        <h2>{this.props.season.name}</h2>
                        <InformationBit>
                            Statistics
                        </InformationBit>
                        <InformationBit>
                            Drivers Standings
                        </InformationBit>
                        <InformationBit>
                            Constructors Standings
                        </InformationBit>
                    </SeasonInformation>
                    {/*Add Race Button*/}
                    <ButtonWrapper>
                        <ActionButton
                            className="btn btn-warning"
                            onClick={this.addRace}>
                            {!this.state.addRaceMode ? "Add Race" : "Hide"}
                        </ActionButton>
                    </ButtonWrapper>
                    {this.state.addRaceMode ? <ManageRaceForm seasonId={this.props.season.id} mode={'add'}/> : ""}
                    {/*Races*/}
                    {racesToDisplay}
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
