import React from "react";
import heroic_Minds from "../../assets/Heroic_Minds_Text.svg"
import "./LogoText.css"

const LogoText = () => {
  return (
    <div className="LogoText">
           <img src={heroic_Minds} alt="Text_Icon"/>
    </div>
  );
};
 
export default LogoText;