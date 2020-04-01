import React, { useState } from 'react';
import styled from "styled-components";
import TeamInfo from "./TeamInfo";
import { Col } from "../../SharedStyles";

const TeamButton = styled.div`
	transition: all .2s;
	cursor: pointer;
	background: #fde3a7;
	overflow: hidden;
	position: relative;
`;

const ColorAndName = styled(Col)` {
	align-items: center;
`;

const ColorBlock = styled.div` {
	background: ${props => props.bg ? props.bg : 'transparent'};
	height: 30px;
	width: 100%;
	transition: padding .2s;
	div:hover > & {
		padding: 0 20px;
	}
`;

const TeamName = styled.span`
	color: #784d2b;
    font-size: 24px;
    font-weight: 800;
	text-align: center;
	transition: opacity .2s ease-in-out;
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

const TeamBlock = ({teamData}) => {
    const [editMode, setEditModeInfo] = useState(false);

    const toggleShowInfo = () => {
        setEditModeInfo(!editMode);
    };

    const face = (
        <ColorAndName onClick={toggleShowInfo}>
            <ColorBlock bg={teamData.color}/>
            <TeamName>{teamData['name']}</TeamName>
        </ColorAndName>
    );

    return (
        <TeamButton>
            <Col>
                {face}
                <TeamInfo editMode={editMode} teamId={teamData.id}/>
                {editMode ? '' : <HiddenButton onClick={toggleShowInfo}/>}
            </Col>
        </TeamButton>
    )
};

export default TeamBlock;
