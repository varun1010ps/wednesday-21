import React, { Component } from "react";
import _ from "lodash";

import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import storyfield from "../JournalQuestionsForm/JournalQuestionsfield";
import storytextarea from "../JournalQuestionsForm/JournalQuestionstextarea";
import InputField from "../InputField/InputField";
import InputTextArea from "../InputTextArea/InputTextArea";
import { createJournalQuestion } from "../../actions/journalQuestions";
import { fetchTopics } from "../../actions/topic";
import { fetchThemes } from "../../actions/theme";
import "./JournalQuestionsAdd.css";

class JournalQuestionsAdd extends Component {
  state = { file: null, audioFile: null };

  componentDidMount() {
    this.props.fetchTopics();
    this.props.fetchThemes();
  }
  renderFields() {
    return _.map(storyfield, ({ label, name }) => {
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
  renderTopicOption() {
    return this.props.topics.map((topic) => {
      return (
        <option className="item" key={topic._id} value={topic._id}>
          {topic.title}
        </option>
      );
    });
  }
  renderThemeOption() {
    return this.props.themes.map((theme) => {
      return (
        <option className="item" key={theme._id} value={theme._id}>
          {theme.theme}
        </option>
      );
    });
  }
  renderTopicSelect() {
    return (
      <div>
        <label className="input_label">Topic</label>
        <Field
          name="topicId"
          className="ui fluid selection dropdown select-style"
          component="select"
        >
          {this.renderTopicOption()}
        </Field>
      </div>
    );
  }
  renderTheme1Select() {
    return (
      <div>
        <label className="input_label">Theme</label>
        <Field
          name="theme1Id"
          className="ui fluid selection dropdown select-style"
          component="select"
        >
          {this.renderThemeOption()}
        </Field>
      </div>
    );
  }

  renderTextArea() {
    return _.map(storytextarea, ({ label, name }) => {
      return (
        <Field key={name} component={InputTextArea} label={label} name={name} />
      );
    });
  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }
  onAudioFileChange(event) {
    this.setState({ audioFile: event.target.files[0] });
  }

  onSubmit = (formValues) => {
    const { createJournalQuestions } = this.props;
    createJournalQuestions(formValues, this.state.file, this.state.audioFile);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="JournalQuestionsAdd">
        <h1 className="d-flex justify-content-center admin_text">
          Add JournalQuestions
        </h1>
        <div className="container justify-content-center">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="row justify-content-md-center">
              <div className="col justify-content-md-center">
                {this.renderFields()}

                {this.renderTextArea()}
              </div>
              <div className="col justify-content-md-center">
                {this.renderTopicSelect()}
                <br />

                {this.renderTheme1Select()}
                <br />
                
                <label className="input_label">Audio</label>
                <br />
                <input
                  type="file"
                  accept="audio/*"
                  onChange={this.onAudioFileChange.bind(this)}
                ></input>

                <br />
                <label className="input_label">Image</label>
                <br />
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={this.onFileChange.bind(this)}
                />
                <br/>
              </div>
              <br/>
            </div>
            <Link
              to="/admin/library-stories"
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
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(storyfield, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
}

function validatetextarea(values) {
  const errors = {};

  _.each(storytextarea, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
}

const mapStateToProps = (state) => {
  return {
    topics: Object.values(state.topic),
    themes: Object.values(state.theme),
  };
};

export default compose(
  connect(mapStateToProps, { createJournalQuestion, fetchTopics, fetchThemes }),
  reduxForm({
    form: "JournalQuestionsAdd",
    validate,
    validatetextarea,
  })
)(JournalQuestionsAdd);
