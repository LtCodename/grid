import React, { useState } from 'react';
import styled from "styled-components";
import DriverInfo from "./DriverInfo";
import {ActionButton, Col} from "../../SharedStyles";

const DriverImage = styled.img`
	width: 100%;
`;

const DriverData = styled(Col)`
    display: flex;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;
    padding: 15px 15px 20px 15px;
    opacity: 0;
    color: #784d2b;
    background: #fff9de;
    border: 10px solid #fde3a7;
    transition: opacity .2s ease-in-out;
	align-items: center;
    justify-content: center;
	a:hover > & {
		opacity: 1;
	}
`;

const DriverLink = styled.a`
	position: relative;
	border: 10px solid #fde3a7;
	transition: all .2s;
	overflow: hidden;
	cursor: pointer;
	:hover {
		border: 0px solid #fde3a7;
	}
`;

const HiddenButton = styled.button`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
    :focus, :hover {
		outline: none;
	}
`;

const BackButton = styled(ActionButton)`
    position: absolute;
    bottom: -13%;
    background: #784d2b;
    width: fit-content;
    border-radius: 50%;
    height: auto;
    padding: 4px 8px 6px 8px;
    margin: 10px 0 0 0;
`;

const SVG = styled.svg`
    height: 20px;
    fill: #fff9de;
`;

const DriverBlock = ({driverId}) => {
    const [editMode, setEditModeInfo] = useState(false);

    const toggleShowInfo = () => {
        setEditModeInfo(!editMode);
    };

    const backButton = (
      <BackButton onClick={toggleShowInfo}>
          <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-alt-circle-left"
               role="img" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512">
              <path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm116-292H256v-70.9c0-10.7-13-16.1-20.5-8.5L121.2 247.5c-4.7 4.7-4.7 12.2 0 16.9l114.3 114.9c7.6 7.6 20.5 2.2 20.5-8.5V300h116c6.6 0 12-5.4 12-12v-64c0-6.6-5.4-12-12-12z"/>
          </SVG>
      </BackButton>
    );

    return (
        <DriverLink>
            <DriverImage src={`${process.env.PUBLIC_URL}/assets/drivers/${driverId}.jpg`}/>
            <DriverData>
                <DriverInfo driverId={driverId} editMode={editMode}/>
                {editMode ? '' : <HiddenButton onClick={toggleShowInfo}/>}
                {editMode ? backButton : ''}
            </DriverData>
        </DriverLink>
    )
};

export default DriverBlock;
