import React from "react";

import './Logo.css'
import LogoIcon from "../LogoIcon/LogoIcon";
import { NavLink } from "react-router-dom";
import LogoText from "../LogoText/LogoText";


const Logo = () => {
    return (
        <div className="Logo">
            <NavLink to="/">
                <div className="Logo">
                    <LogoIcon />
                    <LogoText />
                </div>
            </NavLink>
        </div>
    );
};

export default Logo;