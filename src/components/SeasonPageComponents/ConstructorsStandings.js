import React from 'react';
import { useStore } from "react-redux";
import { InformationTable } from "../../SharedStyles";

const ConstructorsStandings = ({...otherProps}) => {
  const store = useStore();
  const storeState = store.getState();

  const drivers = storeState.drivers;
  const teams = storeState.teams;

  const tableRows = otherProps.seasonDrivers.map((elem, index) => {
    let seasonDriver = drivers.find(driver => {
      return driver.id === elem;
    });
    let team = teams.find(team => {
      return team.id === seasonDriver['team-id'];
    });

    return (
      <tr key={index}>
        <td>{team.name}</td>
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

export default ConstructorsStandings;
