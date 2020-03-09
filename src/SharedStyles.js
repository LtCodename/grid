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
    margin-bottom: 0;
    padding: 5px;
    font-weight: 900;
    cursor: pointer;
    margin: 0;
    border-radius: 0;
    color: #784d2b;
    width: 150px;
    height: 50px;
    border: none;
    background: #fde3a7;
    outline: none;
    :focus, :hover {
		outline: none;
	}
`;

export const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

export const InformationTable = styled.table`
    color: #784d2b;
`;

export const Form = styled.form`
    padding: 10px 0;
`;

export const Properties = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
`;

export const Property = styled.div`
    
`;

export const Textarea = styled.textarea`
    margin: 5px 0;
    resize: none;
`;

export const Label = styled.label`
    margin: 0;
    padding: 0;
    color: rgba(120, 77, 43, 1);
`;

export const SubmitButton = styled.button`
    margin: 5px auto;
    color: #fff9de;
    background-color: rgba(120, 77, 43, 1);
    border-color: rgba(120, 77, 43, 1);
    :hover {
        background-color: rgba(120, 77, 43, 0.8);
        border-color: rgba(120, 77, 43, 0.8);
    }
`;

export const Item = styled.button`
    margin: 0;
    padding: 30px;
    cursor: pointer;
    margin: 0 5px 0 0;
    background-color: #fde3a7;
    color: #784d2b;
`;

export const Select = styled.select`
    margin: 5px 0;
`;

export const H3 = styled.h3`
    color: #784d2b;
`;

export const TR = styled.tr`
    border: 1px solid #784d2b;
`;

export const TH = styled.th`
    padding: 0px 5px;
    text-transform: uppercase;
`;

export const TD = styled.td`
    border-right: 1px solid #784d2b;
    padding: 0 5px;
`;

export const StatisticsTable = styled.table`
    margin: 10px auto;
    color: #784d2b;
`;


