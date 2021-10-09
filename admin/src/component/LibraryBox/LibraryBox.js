import React from 'react';
import styled from "styled-components";

const MainLibraryBox = styled.div`
.btn{
     display:inline-block;
     padding: 4em 4em;
     border:0.12em solid  ${props => props.Color};
     margin:0 1.5em 1.5em 0;
     border-radius:1.2em;
     font-family:Lato;
     box-sizing: border-box;
     text-align:center;
     transition: all 0.2s;
     color : #000;
     background-color: ${props => props.BackColor}; 
}
.btn:hover{
    opacity: 0.8
}
`;
const LibraryBox = ({ Text, Color, BackColor }) => {
    return (<div className="LibraryBox">
        <MainLibraryBox Color={Color} BackColor={BackColor}>
            <div className="btn"> <span style={{ fontSize: "22px", fontWeight: '900' }}>{Text}</span></div>
        </MainLibraryBox>
    </div>);
}

LibraryBox.defaultProps = {
    Text: 'LibraryBox',
    BackColor: "#fff",
    Color:"#000"
};
export default LibraryBox;