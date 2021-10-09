import React, { Component } from "react";
import _ from "lodash";

import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Fab from "@material-ui/core/Fab";

import episodefield from "../EpisodeForm/Episodefield";
import episodetextarea from "../EpisodeForm/Episodetextarea";
import InputField from "../InputField/InputField";
import InputTextArea from "../InputTextArea/InputTextArea";
import { createEpisode } from "../../actions/epsiode";
import { fetchTopics } from "../../actions/topic";
import { fetchThemes } from "../../actions/theme";
import "./EpisodeAdd.css";

class EpisodeAdd extends Component {
  state = { file: null, audioFile: null };

  componentDidMount() {
    this.props.fetchTopics();
    this.props.fetchThemes();
  }
  renderFields() {
    return _.map(episodefield, ({ label, name }) => {
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
        <label className="input_label">Theme1</label>
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

  renderTheme2Select() {
    return (
      <div>
        <label className="input_label">Theme2</label>
        <Field
          name="theme2Id"
          className="ui fluid selection dropdown select-style"
          component="select"
        >
          {this.renderThemeOption()}
        </Field>
      </div>
    );
  }
  renderTheme3Select() {
    return (
      <div>
        <label className="input_label">Theme3</label>
        <Field
          name="theme3Id"
          className="ui fluid selection dropdown select-style"
          component="select"
        >
          {this.renderThemeOption()}
        </Field>
      </div>
    );
  }
  renderTextArea() {
    return _.map(episodetextarea, ({ label, name }) => {
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
    const { createEpisode } = this.props;
    createEpisode(formValues, this.state.file, this.state.audioFile);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="EpisodeAdd">
        <h1 className="d-flex justify-content-center admin_text">
          Add Episode
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

                {this.renderTheme2Select()}
                <br />

                {this.renderTheme3Select()}
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
              to="/admin/library-episodes"
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

  _.each(episodefield, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
}

function validatetextarea(values) {
  const errors = {};

  _.each(episodetextarea, ({ name }) => {
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
  connect(mapStateToProps, { createEpisode, fetchTopics, fetchThemes }),
  reduxForm({
    form: "EpisodeAdd",
    validate,
    validatetextarea,
  })
)(EpisodeAdd);
