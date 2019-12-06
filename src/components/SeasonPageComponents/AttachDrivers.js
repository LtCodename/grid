import React, { useState } from 'react';
import { ActionButton, Label, Select, SmallItem, Wrapper } from "../../SharedStyles";
import { useStore } from "react-redux";
import fire from "../../fire";

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
      <Wrapper>
        <ActionButton
          className="btn btn-warning"
          onClick={onAttachDriverConfirm}>
          Attach driver
        </ActionButton>
      </Wrapper>
    </div>
  );

  let seasonDrivers = "";
  if (season.drivers) {
    seasonDrivers = season.drivers.map((driver, index) => {
      return (
        <span key={index}>
                    <SmallItem className="btn">{drivers.find(dr => dr.id === driver).name}</SmallItem>
                </span>
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
        {seasonDrivers}
      </Wrapper>
    </>
  )
};

export default AttachDrivers;
