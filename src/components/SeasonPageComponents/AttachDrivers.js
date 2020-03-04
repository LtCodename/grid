import React, { useState } from 'react';
import { ActionButton, Label, Select, Wrapper } from "../../SharedStyles";
import { useStore } from "react-redux";
import fire from "../../fire";
import styled from "styled-components";

const DriverItem = styled.div`
    padding: 10px;
    background-color: #fde3a7;
    color: #784d2b;
    border-radius: 0;
    text-align: center;
`;

const DriversGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 5px;
`;

const AttachDrivers = ({...otherProps}) => {
  const [driverSelectMode, changeDriverSelectMode] = useState(false);
  const [selectedDriver, changeSelectedDriver] = useState('');

  const store = useStore();
  const storeState = store.getState();

  const drivers = storeState.drivers;
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
      <Select
        value={undefined}
        id="driver"
        className="custom-select"
        onChange={inputValuesChange}>
        {driversToAttach}
      </Select>
      <ActionButton
        className="btn btn-warning"
        onClick={onAttachDriverConfirm}>
        Attach driver
      </ActionButton>
    </div>
  );

  let seasonDrivers = "";
  if (season.drivers) {
    seasonDrivers = season.drivers.map((driver, index) => {
      return (
        <DriverItem key={index}>
          {drivers.find(dr => dr.id === driver).name}
        </DriverItem>
      )
    })
  }

  return (
    <>
      <Wrapper>
        <ActionButton
            className="btn btn-warning"
            onClick={onAttachDriver}>
            {!driverSelectMode ? "Select driver" : "Hide"}
        </ActionButton>
      </Wrapper>
      {driverSelectMode ? attachForm : ""}
      <Wrapper>
        <DriversGrid>
          {seasonDrivers}
        </DriversGrid>
      </Wrapper>
    </>
  )
};

export default AttachDrivers;
