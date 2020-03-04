import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ActionButton, ComponentRestricted, Wrapper } from "../SharedStyles";
import { NavLink } from "react-router-dom";
import { useStore } from "react-redux";
import ManageSeasonForm from "./ManageSeasonForm";
import styled from "styled-components";

const SeasonsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 20px;
	margin-bottom: 20px;
`;

const SeasonLink = styled(NavLink)`
	border: 10px solid #fde3a7;
	transition: all .2s;
	color: #784d2b;
    font-size: 21px;
    font-weight: 800;
	height: 100px;
	text-align: center;
	:hover {
		color: #784d2b;
		text-decoration: none;
		border: 15px solid #fde3a7;
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

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				{addSeasonMode ? <ManageSeasonForm mode={'add'}/> : ""}
				<SeasonsWrapper>{seasonsToDisplay}</SeasonsWrapper>
				<Wrapper>
					<ActionButton
						className="btn btn-warning"
						onClick={addSeason}>
						{!addSeasonMode ? "Add Season" : "Hide"}
					</ActionButton>
				</Wrapper>
			</ComponentRestricted>
		</>
	)
};

export default Seasons;
