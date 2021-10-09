import React, { Component } from "react";
import _ from "lodash";

import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Fab from "@material-ui/core/Fab";

import topicField from "../TopicForm/topicfield";
import topictextarea from "../TopicForm/topictextarea";
import InputField from "../InputField/InputField";
import InputTextArea from "../InputTextArea/InputTextArea";
import { createTopic } from "../../actions/topic";

class TopicAdd extends Component {
  state = { file: null };
  renderFields() {
    return _.map(topicField, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={InputField}
          type={name}
          label={label}
          name={name}
        />
      );
    });
  }
  renderTextArea() {
    return _.map(topictextarea, ({ label, name }) => {
      return (
        <Field key={name} component={InputTextArea} label={label} name={name} />
      );
    });
  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }
  onSubmit = (formValues) => {
    const { createTopic } = this.props;
    createTopic(formValues, this.state.file);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="TopicAdd">
        <div className="container">
          <div className="row justify-content-md-center">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              {this.renderFields()}
              <input
                accept="image/*"
                type="file"
                onChange={this.onFileChange.bind(this)}
              />

              {this.renderTextArea()}
              <Link
                to="/admin/library-topics"
                className="ui big circular left floated black basic button"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="ui big circular right floated black button"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(topicField, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
}

function validatetextarea(values) {
  const errors = {};

  _.each(topictextarea, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
}

export default compose(
  connect(null, { createTopic }),
  reduxForm({
    form: "TopicAdd",
    validate,
    validatetextarea,
  })
)(TopicAdd);
