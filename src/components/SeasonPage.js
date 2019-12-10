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

const H2 = styled.h2`
    width: 100%;
    text-align: center;
    color: #784d2b;
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
				<NavLink key={index} to={`/races/${otherProps.match.params.season_id}/${race.id}`}>
					<Item className="btn">{race.name}</Item>
				</NavLink>
			)
		})
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				<H2>{season.name}</H2>
				{/*Add Grand Prix Button*/}
				<Wrapper>
					<ActionButton
						className="btn btn-warning"
						onClick={addRace}>
						{!addRaceMode ? "Add Grand Prix" : "Hide"}
					</ActionButton>
				</Wrapper>
				{addRaceMode ? <ManageRaceForm seasonId={season.id} mode={'add'}/> : ""}
				{/*Races*/}
				<Wrapper>
					{racesToDisplay}
				</Wrapper>
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
				{/*Attach Drivers To Current Season*/}
				<Wrapper>
					<AttachDrivers seasonId={otherProps.match.params.season_id}/>
				</Wrapper>
			</ComponentRestricted>
		</>
	)
};

export default SeasonPage;
