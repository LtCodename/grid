import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ActionButton, ComponentRestricted, Item, Wrapper } from "../SharedStyles";
import { NavLink } from "react-router-dom";
import { useStore } from "react-redux";
import ManageSeasonForm from "./ManageSeasonForm";

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
				<NavLink key={index} to={`/seasons/${season.id}`}>
					<Item className="btn">{season.name}</Item>
				</NavLink>
			)
		})
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				<Wrapper>
					<ActionButton
						className="btn btn-warning"
						onClick={addSeason}>
						{!addSeasonMode ? "Add Season" : "Hide"}
					</ActionButton>
				</Wrapper>
				{addSeasonMode ? <ManageSeasonForm mode={'add'}/> : ""}
				{seasonsToDisplay}
			</ComponentRestricted>
		</>
	)
};

export default Seasons;
