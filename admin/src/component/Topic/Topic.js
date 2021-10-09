import React, { Component } from 'react';
import './Topic.css'
import { Link } from "react-router-dom";
import TopicShow from '../TopicShow/TopicShow';

class Topic extends Component {
    state = {}
    renderCreate() {
        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                <Link to={`library-topics/new`}>
                    <button className="ui big circular right floated black button">
                        Upload New Topic
                    </button>
                </Link>
            </div>
        );

    }

    render() {
        return (<div className="Topics">
            <div className="container justify-content-center">
                <div className="admin_text_box">
                    <h1 className="justify-content-start content-text">Upload New&nbsp;&nbsp;
                        <span style={{ color: "#2C9EDE" }}>Topics</span>
                        {this.renderCreate()}</h1>

                </div>
                <TopicShow/>
            </div>
        </div>);
    }
}

export default Topic;