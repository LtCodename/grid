import React from 'react';
import NavigationPanel from "./NavigationPanel";
import {ComponentRestricted, ActionButton, InformationTable, Wrapper, H4, Textarea} from "../SharedStyles";
import {connect} from "react-redux";
import RaceBlueprint from "../blueprints/RaceBlueprint";
import {NavLink} from "react-router-dom";
import ManageRaceForm from "./ManageRaceForm";
import styled from "styled-components";
import fire from "../fire";

const NotesWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Notes = styled.span`
    min-width: 400px;
`;

const SummaryElement = styled.p`
    font-weight: 500;
`;

const NoteTextarea = styled(Textarea)`
    min-width: 400px;
`;

class RacePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editRaceMode: false,
            addPracticeNoteMode: false,
            addQualiNoteMode: false,
            addRaceNoteMode: false,
            addSummaryMode: false,
            addNoteInputValue: '',
            noteType: ''
        };
    }

    onEditRace = () => {
        if (!this.state.editRaceMode) {
            this.setState({
                editRaceMode: true
            })
        }else {
            this.setState({
                editRaceMode: false
            })
        }
    };

    onAddPracticeNote = () => {
        if (!this.state.addPracticeNoteMode) {
            this.setState({
                addPracticeNoteMode: true,
                noteType: 'practiceNotes',
                addNoteInputValue: '',
                addQualiNoteMode: false,
                addRaceNoteMode: false,
                addSummaryMode: false,
            })
        }else {
            this.setState({
                addPracticeNoteMode: false,
                noteType: '',
                addNoteInputValue: '',
            })
        }
    };

    onAddQualiNote = () => {
        if (!this.state.addQualiNoteMode) {
            this.setState({
                addQualiNoteMode: true,
                noteType: 'qualiNotes',
                addNoteInputValue: '',
                addPracticeNoteMode: false,
                addRaceNoteMode: false,
                addSummaryMode: false,
            })
        }else {
            this.setState({
                addQualiNoteMode: false,
                noteType: '',
                addNoteInputValue: '',
            })
        }
    };

    onAddRaceNote = () => {
        if (!this.state.addRaceMode) {
            this.setState({
                addRaceNoteMode: true,
                noteType: 'raceNotes',
                addNoteInputValue: '',
                addPracticeNoteMode: false,
                addQualiNoteMode: false,
                addSummaryMode: false,
            })
        }else {
            this.setState({
                addRaceNoteMode: false,
                noteType: '',
                addNoteInputValue: '',
            })
        }
    };

    onAddSummary = () => {
        if (!this.state.addSummaryMode) {
            this.setState({
                addSummaryMode: true,
                noteType: 'summary',
                addNoteInputValue: '',
                addPracticeNoteMode: false,
                addQualiNoteMode: false,
                addRaceNoteMode: false,
            })
        }else {
            this.setState({
                addSummaryMode: false,
                noteType: '',
                addNoteInputValue: '',
            })
        }
    };

    inputValuesChange = (event) => {
        this.setState({
            addNoteInputValue: event.target.value
        }, () => {
            /*console.log(this.state);*/
        });
    };

    onAddNote = () => {
        if (!this.state.addNoteInputValue) {
            return;
        }

        const raceReference = fire.firestore().collection("races").doc(this.props.race.id);
        const note = this.state.noteType;
        const previousNotes = this.props.race[this.state.noteType] || null;

        raceReference.update({
            [note]: previousNotes ? [...this.props.race[this.state.noteType], this.state.addNoteInputValue] : [this.state.addNoteInputValue]
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

        this.setState({
            noteType: '',
            addPracticeNoteMode: false,
            addQualiNoteMode: false,
            addRaceNoteMode: false,
            addSummaryMode: false,
            addNoteInputValue: '',
        });
    };

    render() {
        const tableRows = RaceBlueprint.map((elem, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{elem.name}</th>
                    <td>{this.props.race[elem.db]}</td>
                </tr>
            )
        });

        /* Pole Position */
        let poleDriver = '';
        if (this.props.race.pole) {
            poleDriver = this.props.drivers.find(driver=> {
                return driver.id === this.props.race.pole;
            });
        }

        const polePosition = (
            <tr>
                <th scope="row">Pole position</th>
                <td>{poleDriver.name}</td>
            </tr>
        );

        /* Fastest Lap */
        let lapDriver = '';
        if (this.props.race.lap) {
            lapDriver = this.props.drivers.find(driver=> {
                return driver.id === this.props.race.lap;
            });
        }

        const fastestLap = (
            <tr>
                <th scope="row">Fastest lap</th>
                <td>{lapDriver.name}</td>
            </tr>
        );

        /* All Race Data */
        const raceDataToDisplay = (
            <InformationTable className="table">
                <tbody>
                {tableRows}
                {this.props.race.pole ? polePosition : null}
                {this.props.race.lap ? fastestLap : null}
                </tbody>
            </InformationTable>
        );

        let practiceNotes;
        if (this.props.race.practiceNotes) {
            practiceNotes = this.props.race.practiceNotes.map((elem, index) => {
                return (
                    <p key={index}>
                        {elem}
                    </p>
                )
            });
        }

        let qualiNotes;
        if (this.props.race.qualiNotes) {
            qualiNotes = this.props.race.qualiNotes.map((elem, index) => {
                return (
                    <p key={index}>
                        {elem}
                    </p>
                )
            });
        }

        let raceNotes;
        if (this.props.race.raceNotes) {
            raceNotes = this.props.race.raceNotes.map((elem, index) => {
                return (
                    <p key={index}>
                        {elem}
                    </p>
                )
            });
        }

        let summary;
        if (this.props.race.summary) {
            summary = this.props.race.summary.map((elem, index) => {
                return (
                    <SummaryElement key={index}>
                        {elem}
                    </SummaryElement>
                )
            });
        }

        const addNoteForm = (
            <>
                <NoteTextarea
                    className="form-control"
                    placeholder={''}
                    type="text"
                    rows="3"
                    value={this.state.addNoteInputValue}
                    onChange={this.inputValuesChange}
                    required>
                </NoteTextarea>
                <ActionButton
                    className="btn btn-warning"
                    onClick={this.onAddNote}>
                    {"Add note"}
                </ActionButton>
            </>
        );

        const notes = (
            <NotesWrapper>
                <Notes>
                    <H4>Practice:</H4>
                    {practiceNotes}
                    <ActionButton
                        className="btn btn-warning"
                        onClick={this.onAddPracticeNote}>
                        {!this.state.addPracticeNoteMode ? "Add Practice Note" : "Hide"}
                    </ActionButton>
                    {!this.state.addPracticeNoteMode ? "" : addNoteForm}
                    <H4>Qualification:</H4>
                    {qualiNotes}
                    <ActionButton
                        className="btn btn-warning"
                        onClick={this.onAddQualiNote}>
                        {!this.state.addQualiNoteMode ? "Add Qualification Note" : "Hide"}
                    </ActionButton>
                    {!this.state.addQualiNoteMode ? "" : addNoteForm}
                    <H4>Race:</H4>
                    {raceNotes}
                    <ActionButton
                        className="btn btn-warning"
                        onClick={this.onAddRaceNote}>
                        {!this.state.addRaceNoteMode ? "Add Race Note" : "Hide"}
                    </ActionButton>
                    {!this.state.addRaceNoteMode ? "" : addNoteForm}
                    <H4>Summary:</H4>
                    {summary}
                    <ActionButton
                        className="btn btn-warning"
                        onClick={this.onAddSummary}>
                        {!this.state.addSummaryMode ? "Add Summary" : "Hide"}
                    </ActionButton>
                    {!this.state.addSummaryMode ? "" : addNoteForm}
                </Notes>
            </NotesWrapper>
        );

        return (
            <>
                <NavigationPanel />
                <ComponentRestricted>
                    <NavLink to={`/seasons/${this.props.match.params.season_id}`}>
                        <Wrapper>
                            <ActionButton
                                className="btn btn-warning">
                                {`Back to ${this.props.season.name}`}
                            </ActionButton>
                        </Wrapper>
                    </NavLink>
                    <ActionButton
                        className="btn btn-warning"
                        onClick={this.onEditRace}>
                        {!this.state.editRaceMode ? "Edit Grand Prix" : "Hide"}
                    </ActionButton>
                    <br/>
                    {this.state.editRaceMode ?
                        <ManageRaceForm
                            raceId={this.props.match.params.race_id}
                            seasonId={this.props.match.params.season_id}
                            mode={'edit'}
                        /> : raceDataToDisplay}
                    {notes}
                </ComponentRestricted>
            </>
        )
    }
}

const mapStateToProps = (state = {}, props) => {
    return {
        race: state.races.find(race => {
            return race.id === props.match.params.race_id
        }),
        season: state.seasons.find(season => {
            return season.id === props.match.params.season_id
        }),
        drivers: state.drivers
    }
};

const RacePageConnected = connect(mapStateToProps, null)(RacePage);

export default RacePageConnected;
