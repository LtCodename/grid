import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ActionButton, ComponentRestricted, Item, Wrapper } from "../SharedStyles";
import { useStore } from "react-redux";
import { NavLink } from "react-router-dom";
import ManageDriverForm from "./ManageDriverForm";

const Drivers = () => {
	const [addDriverMode, changeAddDriverMode] = useState(false);

    const store = useStore();
    const storeState = store.getState();

    const drivers = storeState.drivers;

	const addDriver = () => {
		changeAddDriverMode(!addDriverMode);
	};

	const driversNode = (
		drivers.map((driver, index) => {
			return (
				<NavLink key={index} to={`/drivers/${driver.id}`}>
					<Item className="btn">{driver.name}</Item>
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
						onClick={addDriver}>
						{!addDriverMode ? "Add Driver" : "Hide"}
					</ActionButton>
				</Wrapper>
				{addDriverMode ? <ManageDriverForm mode={'add'}/> : ""}
				{driversNode}
			</ComponentRestricted>
		</>
	)
};

export default Drivers;
