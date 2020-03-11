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
    padding: 5px;
    align-items: center;
	:hover {
		text-decoration: none;
	}
`;

const ColorBlock = styled.div` {
	background: ${props => props.bg ? props.bg : 'transparent'}
	padding: 0 14px;
    height: 28px;
    border-radius: 50%;
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
    margin-bottom: 10px;
`;

const AttachButton = styled(ActionButton)`
    margin: 10px 0 0 0;
`;

const SelectDriverButton = styled(ActionButton)`
    margin: 0;
`;

const AttachDrivers = ({...otherProps}) => {
  const [driverSelectMode, changeDriverSelectMode] = useState(false);
  const [selectedDriver, changeSelectedDriver] = useState('');

  const store = useStore();
  const storeState = store.getState();

  const drivers = storeState.drivers;
  const teams = storeState.teams;
  const user = storeState.user;
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
    const driversSorted = season.drivers.map((drv) => {
      return drivers.find(dr => dr.id === drv);
    }).sort((a, b) => {
      const teamA = teams.find(tm => tm.id === a['team-id']);
      const teamB = teams.find(tm => tm.id === b['team-id']);

      if (teamA.name < teamB.name) {
        return -1;
      }
      if (teamA.name > teamB.name) {
        return 1;
      }
      return 0;
    });

    seasonDrivers = driversSorted.map((driver, index) => {
      let driversTeam = teams.find(tm => tm.id === driver['team-id']);
      return (
        <DriverItem key={index} to={`/drivers/${driver.id }`}>
          <ColorBlock bg={driversTeam.color}/>
          <Name clr={driversTeam.color}>{driver.name}</Name>
        </DriverItem>
      )
    })
  }

  const seasonDriversToShow = (
      <DriversGrid>
        {seasonDrivers}
      </DriversGrid>
  );

  const addDriverButton = (
      <SelectDriverButton
          onClick={onAttachDriver}>
        {!driverSelectMode ? "Select Driver" : "Hide"}
      </SelectDriverButton>
  );

  return (
    <>
      {driverSelectMode ? attachForm : seasonDriversToShow}
      {user.length === 0 ? "" : addDriverButton}
    </>
  )
};

export default AttachDrivers;
