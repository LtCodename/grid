import styled from "styled-components";

export const Row = styled.div`
    display: flex;
    flex-flow: row;
`;

export const Col = styled.div`
    display: flex;
    flex-flow: column;
`;

export const ComponentRestricted = styled(Col)`
    max-width: 2000px;
    margin: 0 auto;
    padding: 10px;
`;

export const ActionButton = styled.button`
    margin: 10px 0;
    padding: 0px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 0;
    color: #784d2b;
    width: 120px;
    height: 30px;
    border: none;
    background: #fde3a7;
    outline: none;
    :focus, :hover {
		outline: none;
		color: #0056b3;
	}
`;

export const InformationTable = styled.table`
    color: #784d2b;
    margin-bottom: 10px;
`;

export const Form = styled.form`
`;

export const Properties = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
`;

export const Textarea = styled.textarea`
    resize: none;
`;

export const Label = styled.label`
    margin-bottom: 5px;;
    color: #784d2b;
`;

export const TR = styled.tr`
    border: 1px solid #784d2b;
`;

export const TH = styled.th`
    padding: 0px 10px;
`;

export const TD = styled.td`
    border-right: 1px solid #784d2b;
    padding: 0 5px;
`;

export const EditNoteTextarea = styled.textarea`
	margin-bottom: 10px;
`;

export const DeleteButton = styled(ActionButton)`
	margin: 0 0 0 5px;
	width: auto;
	height: auto;
	background: transparent;
`;

export const NoteRow = styled(Row)`
	align-items: center;
	justify-content: space-between;
`;

export const DeleteIcon = styled.svg`
	height: 20px;
	fill: #774d2b;
`;


