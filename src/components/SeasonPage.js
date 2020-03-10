import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ActionButton, Col, ComponentRestricted, Row } from "../SharedStyles";
import { useStore } from "react-redux";
import ManageSeasonForm from "./ManageSeasonForm";
import { NavLink } from "react-router-dom";
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

const SeasonTitle = styled.span`
    width: 100%;
    text-align: center;
	color: #784d2b;
	font-weight: 900;
	font-size: 25px;
`;

const RacesWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 5px;
`;

const RaceLink = styled(NavLink)`
    color: #784d2b;
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    background: #fde3a6;
    padding: 5px 0;
	:hover {
		text-decoration: none;
	}
`;

const RacesBlocks = styled.div`
	display: flex;
	justify-content: center;
    align-items: center;
    height: 100%;
`;

const StandingsRow = styled(Row)`
	justify-content: space-around;
`;

const RaceName = styled.span`
`;

const TableHeader = styled.span`
	color: #784d2b;
    font-size: 20px;
    background: #fde3a6;
    padding: 10px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 10px;
`;

const StandingsWrapper = styled(Col)`
	align-items: center;
`;

const SeasonPage = ({...otherProps}) => {
	const [editSeasonMode, changeEditSeasonMode] = useState(false);
	const [addRaceMode, changeAddRaceMode] = useState(false);

	const store = useStore();
	const storeState = store.getState();

	const races = storeState.races;
	const season = storeState.seasons.find(season => {
		return season.id === otherProps.match.params.season_id;
	});

	const onEditSeason = () => {
		changeEditSeasonMode(!editSeasonMode);
	};

	const addRace = () => {
		changeAddRaceMode(!addRaceMode);
	};

	const racesToDisplay = (
		races.filter(r => {
			return (
				r['season-id'] === otherProps.match.params.season_id
			)
		}).map((race, index) => {
			return (
				<RaceLink key={index} to={`/races/${otherProps.match.params.season_id}/${race.id}`}>
					<RacesBlocks>
						<RaceName>{race.name}</RaceName>
					</RacesBlocks>
				</RaceLink>
			)
		})
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				<SeasonTitle>{season.name}</SeasonTitle>
				{/*Edit Season Name Button*/}
				<ActionButton
					onClick={onEditSeason}>
					{!editSeasonMode ? "Edit Name" : "Hide"}
				</ActionButton>
				{editSeasonMode ?
					<ManageSeasonForm seasonId={otherProps.match.params.season_id} mode={'edit'}/> : ''}
				{/*Races*/}
				<RacesWrapper>
					{racesToDisplay}
				</RacesWrapper>
				{/*Add Grand Prix Button*/}
				<ActionButton
					onClick={addRace}>
					{!addRaceMode ? "Add Grand Prix" : "Hide"}
				</ActionButton>
				{addRaceMode ? <ManageRaceForm seasonId={season.id} mode={'add'}/> : ""}
				{/*Attach Drivers To Current Season*/}
				<AttachDrivers seasonId={otherProps.match.params.season_id}/>
				{/*General Information*/}
				<SeasonInformation>
					<InformationBit>
						{season.drivers ?
							<Statistics seasonData={season}/> : 'No drivers selected'}
					</InformationBit>
					<StandingsRow>
						<StandingsWrapper>
							<TableHeader>Drivers Standings</TableHeader>
							{season.drivers ?
								<DriversStandings seasonData={season}/> : 'No drivers selected'}
						</StandingsWrapper>
						<StandingsWrapper>
							<TableHeader>Constructors Standings</TableHeader>
							{season.drivers ?
								<ConstructorsStandings seasonData={season}/> : 'No drivers selected'}
						</StandingsWrapper>
					</StandingsRow>
				</SeasonInformation>
			</ComponentRestricted>
		</>
	)
};

export default SeasonPage;
