import React, { useState } from 'react';
import { ActionButton, Label } from "../../SharedStyles";
import { useStore } from "react-redux";
import fire from "../../fire";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const DriverItem = styled(NavLink)`
    background-color: #fde3a7;
    font-weight: 700;
    color: #784d2b;
    border-radius: 0;
    text-align: center;
    display: flex;
    align-items: center;
	:hover {
		text-decoration: none;
	}
`;

const ColorBlock = styled.div` {
	background: ${props => props.bg ? props.bg : 'transparent'}
	padding: 0 5px;
	height: 34px;
	margin-right: 10px;
`;

const Name = styled.span` {
	:hover {
		//color: ${props => props.clr ? props.clr : '#000000'}
	}
`;

const DriversGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 5px;
`;

const AttachButton = styled(ActionButton)`
    margin: 10px 0 0 0;
`;

const AttachDrivers = ({...otherProps}) => {
  const [driverSelectMode, changeDriverSelectMode] = useState(false);
  const [selectedDriver, changeSelectedDriver] = useState('');

  const store = useStore();
  const storeState = store.getState();

  const drivers = storeState.drivers;
  const teams = storeState.teams;
  const season = storeState.seasons.find(season => {
    return season.id === otherProps.seasonId
  });

  const inputValuesChange = (event) => {
    changeSelectedDriver(event.target.value);
  };

  const onAttachDriver = () => {
    changeDriverSelectMode(!driverSelectMode);
  };

  const onAttachDriverConfirm = () => {
    if (!selectedDriver.length) {
      console.log("Nothing selected!");
      return;
    }

    const seasonDrivers = season.drivers || [];
    const newDriversData = [...seasonDrivers, selectedDriver];

    fire.firestore().collection('seasons').doc(otherProps.seasonId).update({
      'drivers': newDriversData
    }).then(() => {
      console.log("Data updated successfully!");
    }).catch(error => {
      console.log(error.message);
    });
  };

  const driversForOptions = drivers.filter((driver) => {
    return !season.drivers || season.drivers.indexOf(driver.id) === -1
  });

  const driversToAttach = [{name: "Not selected", value: undefined}, ...driversForOptions].map((driver, index) => {
    return (
      <option key={index} value={driver.id}>{driver.name}</option>
    );
  });

  const attachForm = (
    <div>
      <Label htmlFor="driver">Select driver</Label>
      <select
        value={undefined}
        id="driver"
        className="custom-select"
        onChange={inputValuesChange}>
        {driversToAttach}
      </select>
      <AttachButton
        onClick={onAttachDriverConfirm}>
        Attach Driver
      </AttachButton>
    </div>
  );

  let seasonDrivers = "";
  if (season.drivers) {
    seasonDrivers = season.drivers.map((driver, index) => {
      let driverToDisplay = drivers.find(dr => dr.id === driver);
      let driversTeam = teams.find(tm => tm.id === driverToDisplay['team-id']);
      return (
        <DriverItem key={index} to={`/drivers/${driverToDisplay.id }`}>
          <ColorBlock bg={driversTeam.color}/>
          <Name clr={driversTeam.color}>{driverToDisplay.name}</Name>
        </DriverItem>
      )
    })
  }

  const seasonDriversToShow = (
      <DriversGrid>
        {seasonDrivers}
      </DriversGrid>
  );

  return (
    <>
      {driverSelectMode ? attachForm : seasonDriversToShow}
      <ActionButton
          onClick={onAttachDriver}>
        {!driverSelectMode ? "Select Driver" : "Hide"}
      </ActionButton>
    </>
  )
};

export default AttachDrivers;
