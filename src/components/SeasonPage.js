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
	margin-bottom: 10px;
	@media (max-width: 736px) {
		grid-template-columns: 1fr 1fr;
	}
`;

const RaceLink = styled(NavLink)`
    color: #784d2b;
    font-weight: 700;
    text-align: center;
    background: #fde3a6;
    display: flex;
	:hover {
		text-decoration: none;
	}
`;

const RaceName = styled.span`
	padding: 0 5px;
`;

const RaceMainColumn = styled(Col)`
	width: 100%;
`;

const PodiumsColumn = styled(Col)`
	border-top: 3px solid #fff9de;
`;

const PoleRow = styled(Row)`
	align-items: center;
	justify-content: center;
	border-top: 3px solid #fff9de;
	border-right: 3px solid #fff9de;
`;

const PlacesRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

const ColorAndName = styled(Row)`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const ColorBlock = styled.div` {
	background: ${props => props.bg ? props.bg : 'transparent'}
	padding: 0 6px;
	height: 12px;
	border-radius: 50%;
	margin-right: 3px;
`;

const StandingsRow = styled(Row)`
	justify-content: space-around;
`;

const TableHeader = styled.span`
	color: #784d2b;
    font-size: 20px;
    background: #fde3a6;
    padding: 10px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 10px;
    text-align: center;
`;

const StandingsWrapper = styled(Col)`
	align-items: center;
`;

const AddGrandPrix = styled(ActionButton)`
	margin: 0 0 10px 0;
`;

const Name = styled.span`
	text-align: left;
	width: 60%;
	font-weight: 900;
`;

const SeasonPage = ({...otherProps}) => {
	const [editSeasonMode, changeEditSeasonMode] = useState(false);
	const [addRaceMode, changeAddRaceMode] = useState(false);

	const store = useStore();
	const storeState = store.getState();

	const races = storeState.races;
	const drivers = storeState.drivers;
	const teams = storeState.teams;
	const user = storeState.user;
	const season = storeState.seasons.find(season => {
		return season.id === otherProps.match.params.season_id;
	});

	const onEditSeason = () => {
		changeEditSeasonMode(!editSeasonMode);
	};

	const addRace = () => {
		changeAddRaceMode(!addRaceMode);
	};

	let seasonRaces = races.filter(r => {
		return (
			r['season-id'] === otherProps.match.params.season_id
		)
	}).sort((a, b) => (parseInt(a.round) > parseInt(b.round)) ? 1 : -1);

	const racesToDisplay = (
		seasonRaces.map((race, index) => {
			let poleShortName = undefined;
			let poleTeam = undefined;
			if (race.pole) {
				const poleSitter = drivers.find(dr => dr.id === race.pole);
				const poleArray = poleSitter['name'].split(' ');
				const poleLastName = poleArray[1];
				poleShortName = poleLastName.slice(0, 3).toUpperCase();
				poleTeam = teams.find(tm => tm.id === poleSitter['team-id']);
			}

			let firstShortName = undefined;
			let firstTeam = undefined;
			let secondShortName = undefined;
			let secondTeam = undefined;
			let thirdShortName = undefined;
			let thirdTeam = undefined;
			if (race.places) {
				const firstPlace = drivers.find(dr => dr.id === race.places[1].driver);
				const firstArray = firstPlace['name'].split(' ');
				const firstLastName = firstArray[1];
				firstShortName = firstLastName.slice(0, 3).toUpperCase();
				firstTeam = teams.find(tm => tm.id === firstPlace['team-id']);

				const secondPlace = drivers.find(dr => dr.id === race.places[2].driver);
				const secondArray = secondPlace['name'].split(' ');
				const secondLastName = secondArray[1];
				secondShortName = secondLastName.slice(0, 3).toUpperCase();
				secondTeam = teams.find(tm => tm.id === secondPlace['team-id']);

				const thirdPlace = drivers.find(dr => dr.id === race.places[3].driver);
				const thirdArray = thirdPlace['name'].split(' ');
				const thirdLastName = thirdArray[1];
				thirdShortName = thirdLastName.slice(0, 3).toUpperCase();
				thirdTeam = teams.find(tm => tm.id === thirdPlace['team-id']);
			}
			return (
				<RaceLink key={index} to={`/races/${otherProps.match.params.season_id}/${race.id}`}>
					<RaceMainColumn>
						<RaceName>{race.name}</RaceName>
						<PlacesRow>
							<PoleRow>
								<ColorAndName>
									<ColorBlock bg={race.pole ? poleTeam.color : 'transparent'}/>
									<Name>{race.pole ? poleShortName : ''}</Name>
								</ColorAndName>
							</PoleRow>
							<PodiumsColumn>
								<ColorAndName>
									<ColorBlock bg={race.places ? firstTeam.color : 'transparent'}/>
									<Name>{race.places ? firstShortName : ''}</Name>
								</ColorAndName>
								<ColorAndName>
									<ColorBlock bg={race.places ? secondTeam.color : 'transparent'}/>
									<Name>{race.places ? secondShortName : ''}</Name>
								</ColorAndName>
								<ColorAndName>
									<ColorBlock bg={race.places ? thirdTeam.color : 'transparent'}/>
									<Name>{race.places ? thirdShortName : ''}</Name>
								</ColorAndName>
							</PodiumsColumn>
						</PlacesRow>
					</RaceMainColumn>
				</RaceLink>
			)
		})
	);

	const racesNode = (
		<RacesWrapper>
			{racesToDisplay}
		</RacesWrapper>
	);

	const editNameButton = (
		<ActionButton
			onClick={onEditSeason}>
			{!editSeasonMode ? "Edit Name" : "Hide"}
		</ActionButton>
	);

	const addGrandPrixButton = (
		<AddGrandPrix
			onClick={addRace}>
			{!addRaceMode ? "Add Grand Prix" : "Hide"}
		</AddGrandPrix>
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				<SeasonTitle>{season.name}</SeasonTitle>
				{/*Edit Season Name Button*/}
				{user.length === 0 ? "" : editNameButton}
				{editSeasonMode ?
					<ManageSeasonForm seasonId={otherProps.match.params.season_id} mode={'edit'}/> : ''}
				{/*Add Grand Prix Button*/}
				<TableHeader>Season Races</TableHeader>
				{addRaceMode ? <ManageRaceForm seasonId={season.id} mode={'add'}/> : racesNode}
				{user.length === 0 ? "" : addGrandPrixButton}
				{/*Attach Drivers To Current Season*/}
					<TableHeader>Season Drivers</TableHeader>
					<AttachDrivers seasonId={otherProps.match.params.season_id}/>
				{/*General Information*/}
				<SeasonInformation>
					<StandingsWrapper>
						<TableHeader>Statistics</TableHeader>
						<InformationBit>
							{season.drivers ?
								<Statistics seasonData={season}/> : 'No drivers selected'}
						</InformationBit>
					</StandingsWrapper>
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
