import React, {useEffect, useState} from 'react';
import NavigationPanel from "./NavigationPanel";
import { ActionButton, ComponentRestricted } from "../SharedStyles";
import { NavLink } from "react-router-dom";
import { useStore } from "react-redux";
import ManageSeasonForm from "./ManageSeasonForm";
import styled from "styled-components";

const SeasonsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 10px;
`;

const SeasonLink = styled(NavLink)`
	transition: all .2s;
	color: #784d2b;
    background: #fde3a7;
    font-size: 24px;
    font-weight: 800;
	height: 200px;
	text-align: center;
	:hover {
		color: #784d2b;
		text-decoration: none;
	}
`;

const NameWrapper = styled.div`
	display: flex;
	justify-content: center;
    align-items: center;
    height: 100%;
`;

const SeasonName = styled.span`
	
`;

const Seasons = () => {
	const [addSeasonMode, changeAddSeasonMode] = useState(false);

	const store = useStore();
	const storeState = store.getState();
	const seasons = storeState.seasons;
	const user = storeState.user;

	const addSeason = () => {
		changeAddSeasonMode(!addSeasonMode);
	};

	const seasonsToDisplay = (
		seasons.map((season, index) => {
			return (
				<SeasonLink key={index} to={`/seasons/${season.id}`}>
					<NameWrapper>
						<SeasonName>
							{season.name}
						</SeasonName>
					</NameWrapper>
				</SeasonLink>
			)
		})
	);

	const addButton = (
		<ActionButton
			onClick={addSeason}>
			{!addSeasonMode ? "Add" : "Hide"}
		</ActionButton>
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				<SeasonsWrapper>{seasonsToDisplay}</SeasonsWrapper>
				{user.length === 0 ? "" : addButton}
				{addSeasonMode ? <ManageSeasonForm mode={'add'}/> : ""}
			</ComponentRestricted>
		</>
	)
};

export default Seasons;
