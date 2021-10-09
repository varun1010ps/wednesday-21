import React, { Component } from 'react';
import ThemeAdd from '../ThemeAdd/ThemeAdd';
import ThemeShow from '../ThemeShow/ThemeShow';
import './Theme.css'

class Theme extends Component {
    state = {}
    render() {
        return (<div className="Theme">
            <div className="container justify-content-center">
                <div className="admin_text_box">
                    <h1 className="d-flex justify-content-start content-text">Upload New&nbsp;&nbsp;
                    <span style={{ color: "#FF5F5F" }}>Theme</span></h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6">
                        <ThemeShow/>
                    </div>
                    <div className="col-6">
                        <ThemeAdd/>
                    </div>
                </div>
            </div>
        </div>);
    }
}


export default Theme;