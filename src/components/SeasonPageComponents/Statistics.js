import React from 'react';
import { useStore } from "react-redux";
import styled from "styled-components";

export const StatisticsTable = styled.table`
    margin: 10px auto;
    color: #784d2b;
`;

const Statistics = ({...otherProps}) => {
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
        <td>{seasonDriver.podiums}</td>
        <td>{'No data'}</td>
        <td>{seasonDriver.poles}</td>
        <td>{'No data'}</td>
        <td>{seasonDriver.wins}</td>
        <td>{'No data'}</td>
        <td>{seasonDriver.championships}</td>
      </tr>
    )
  });

  const statistics = (
    <StatisticsTable className="table">
      <tbody>
      <tr>
        <th>Driver</th>
        <th>Podiums</th>
        <th>Podiums this season</th>
        <th>Poles</th>
        <th>Poles this season</th>
        <th>Wins</th>
        <th>Wins this season</th>
        <th>World Championships</th>
      </tr>
      {tableRows}
      </tbody>
    </StatisticsTable>
  );

  return (
    <>
      {statistics}
    </>
  )
};

export default Statistics;
