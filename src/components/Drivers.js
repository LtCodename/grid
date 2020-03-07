import React, { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import { ActionButton, ComponentRestricted, Item, Wrapper } from "../SharedStyles";
import { useStore } from "react-redux";
import { NavLink } from "react-router-dom";
import ManageDriverForm from "./ManageDriverForm";
import styled from "styled-components";

const DriverImage = styled.img`
	width: 100%;
`;

const DriverName = styled.span`
	position: absolute;
	top: 50%;
	transform: translateY(-50%) translateX(-50%);
	left: 50%;
	opacity: 0;
	color: #784d2b;
	background: #fff9de;
	font-size: 25px;
	font-weight: 800;
	padding: 0 10px;
	text-align: center;
	transition: opacity .2s ease-in-out;
	a:hover > & {
		opacity: 1;
	}
`;

const DriversWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-gap: 10px;
	margin-bottom: 10px;
`;

const DriverLink = styled(NavLink)`
	position: relative;
	border: 10px solid #fde3a7;
	transition: all .2s;
	overflow: hidden;
	:hover {
		border: 0px solid #fde3a7;
	}
`;

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
				<DriverLink key={index} to={`/drivers/${driver.id}`}>
					<DriverImage src={driver.picture}/>
					<DriverName>{driver.name}</DriverName>
				</DriverLink>
			)
		})
	);

	return (
		<>
			<NavigationPanel/>
			<ComponentRestricted>
				{addDriverMode ? <ManageDriverForm mode={'add'}/> : <DriversWrapper>{driversNode}</DriversWrapper>}
				<Wrapper>
					<ActionButton
						className="btn btn-warning"
						onClick={addDriver}>
						{!addDriverMode ? "Add Driver" : "Hide"}
					</ActionButton>
				</Wrapper>
			</ComponentRestricted>
		</>
	)
};

export default Drivers;
