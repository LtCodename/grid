import React from 'react';
import { useStore } from "react-redux";
import { InformationTable } from "../../SharedStyles";

const DriversStandings = ({...otherProps}) => {
  const store = useStore();
  const storeState = store.getState();

  const drivers = storeState.drivers;

  const tableRows = otherProps.seasonDrivers.map((elem, index) => {
    let seasonDriver = drivers.find(driver => {
      return driver.id === elem;
    });

    return (
      <tr key={index}>
        <td>{seasonDriver.name}</td>
        <td>{'No data'}</td>
      </tr>
    )
  });

  const statistics = (
    <InformationTable className="table">
      <tbody>
      <tr>
        <th>Driver</th>
        <th>Points</th>
      </tr>
      {tableRows}
      </tbody>
    </InformationTable>
  );

  return (
    <>
      {statistics}
    </>
  )
};

export default DriversStandings;
