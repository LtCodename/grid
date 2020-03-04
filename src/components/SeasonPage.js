import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ActionButton, ComponentRestricted, H3, Item, Wrapper } from "../SharedStyles";
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

const SeasonTitle = styled.h2`
    width: 100%;
    text-align: center;
	color: #784d2b;
	font-weight: 900;
`;

const RacesWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 5px;
	margin-bottom: 8px;
`;

const RaceLink = styled(NavLink)`
	border: 5px solid #fde3a7;
	transition: all .2s;
	color: #784d2b;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
	height: 45px;
	:hover {
		color: #784d2b;
		text-decoration: none;
		//border: 6px solid #fde3a7;
	}
`;

const RacesBlocks = styled.div`
	display: flex;
	justify-content: center;
    align-items: center;
    height: 100%;
`;

const RaceName = styled.span`
`;

const AddDriversWrapper = styled.div`
    width: 100%;
	margin-bottom: 10px;
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
				{/*Races*/}
				<RacesWrapper>
					{racesToDisplay}
				</RacesWrapper>
				{/*Add Grand Prix Button*/}
				<Wrapper>
					<ActionButton
						className="btn btn-warning"
						onClick={addRace}>
						{!addRaceMode ? "Add Grand Prix" : "Hide"}
					</ActionButton>
				</Wrapper>
				{addRaceMode ? <ManageRaceForm seasonId={season.id} mode={'add'}/> : ""}
				{/*Attach Drivers To Current Season*/}
				<AttachDrivers seasonId={otherProps.match.params.season_id}/>
				{/*General Information*/}
				<SeasonInformation>
					<InformationBit>
						<H3>Statistics</H3>
						{season.drivers ?
							<Statistics seasonDrivers={season.drivers}/> : 'No drivers selected'}
					</InformationBit>
					<InformationBit>
						<H3>Drivers Standings</H3>
						{season.drivers ?
							<DriversStandings seasonDrivers={season.drivers}/> : 'No drivers selected'}
					</InformationBit>
					<InformationBit>
						<H3>Constructors Standings</H3>
						{season.drivers ?
							<ConstructorsStandings seasonDrivers={season.drivers}/> : 'No drivers selected'}
					</InformationBit>
				</SeasonInformation>
				{/*Edit Season Button*/}
				<Wrapper>
					<ActionButton
						className="btn btn-warning"
						onClick={onEditSeason}>
						{!editSeasonMode ? "Edit Season" : "Hide"}
					</ActionButton>
				</Wrapper>
				{editSeasonMode ?
					<ManageSeasonForm seasonId={otherProps.match.params.season_id} mode={'edit'}/> : ''}
			</ComponentRestricted>
		</>
	)
};

export default SeasonPage;
