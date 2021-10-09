import React, { Component } from "react";
import { connect } from "react-redux";

import { createTheme } from "../../actions/theme";

import ThemeForm from "../ThemeForm/ThemeForm";



class ThemeAdd extends Component {

    onSubmit = (fromValues) => {
        console.log(fromValues)
        this.props.createTheme(fromValues);
    };


    render() {
        return (

            <div style={{ padding: "40px" }} className="ThemeAdd">
                <h1 className="content-text">New Theme</h1>
                <ThemeForm onSubmit={this.onSubmit} button="Upload New Theme" />
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        auth: state.auth.authenticated
    };
};


export default connect(mapStateToProps, { createTheme })(ThemeAdd);