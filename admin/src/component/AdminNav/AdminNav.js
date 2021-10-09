import React, { useState } from "react";

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarContent,
    SidebarHeader,
    SidebarFooter
} from "react-pro-sidebar";

//import icons from react icons

import { FaList, FaUserAlt } from "react-icons/fa";
import { FiHome, FiLogOut, FiBarChart } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";
import { BiCog } from "react-icons/bi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./AdminNav.css";

import { Link } from 'react-router-dom';


const AdminNav = () => {

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (
        <>
            <div id="header">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse} onClick={menuIconClick} >
                    <SidebarHeader>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">

                            <MenuItem icon={<FiHome />} >
                                Dashboard
                                <Link to="/admin/dashboard" />
                            </MenuItem>


                            <MenuItem icon={<FaList />} >Content
                                <Link to="/admin/content" />
                            </MenuItem>

                            <MenuItem icon={<FaUserAlt />}>User <Link to="/admin/user" /></MenuItem>
                            <MenuItem icon={<FiBarChart />}>Usage<Link to="/admin/usage" /></MenuItem>
                            <MenuItem icon={<AiOutlineTeam />}>TeamAccess <Link to="/admin/team-access" /></MenuItem>
                            <MenuItem icon={<BiCog />}>Settings <Link to="/admin/settings" /></MenuItem>
                            <MenuItem icon={<HiOutlineOfficeBuilding />}>Organizations <Link to="/admin/organizations" /></MenuItem>
                            <MenuItem icon={<FiLogOut />}>Logout<Link to="/logout" /></MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>

                    </SidebarFooter>

                </ProSidebar>
            </div>
        </>
    );
};

export default AdminNav;