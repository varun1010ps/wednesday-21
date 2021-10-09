import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

import Modal from "../Model/Model";
import history from "../../history";

import { fetchTheme } from "../../actions/theme";
import { editTheme } from "../../actions/theme";
import ThemeForm from "../ThemeForm/ThemeForm";



class ThemeEdit extends Component {


    onSubmit = (fromValues) => {
        this.props.editTheme(this.props.match.params.id, fromValues)
    };
    componentDidMount() {
        this.props.fetchTheme(this.props.match.params.id);
    }

    renderAction() {
        
        return (
            <React.Fragment>
                <Link to={`/admin/library-theme`} className="ui button">
                    cancel
                </Link>
            </React.Fragment>
        );
    }

    renderContent() {
        return (<div>
             <span>Are you sure you want to edit the Theme : {this.props.themes.theme}</span>
            <ThemeForm initialValues={_.pick(this.props.themes, 'theme')} onSubmit={this.onSubmit} button="Edit Theme" />
        </div>)
    }

    render() {
        return (
            <div style={{ padding: "40px" }} className="ProjectsEdit">
                <Modal
                    title="Edit Theme"
                    cname="editModel"
                    content={this.renderContent()}
                    actions={this.renderAction()}
                    onDismiss={() => history.push("/admin/library-theme")}
                />
            </div>
        );
    }

}


const mapStateToProps = (state, ownProps) => {
    return { themes: state.theme[ownProps.match.params.id] };
};


export default connect(mapStateToProps, { fetchTheme, editTheme })(
    ThemeEdit
);