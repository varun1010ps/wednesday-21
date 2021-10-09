import React, { Component } from "react";
import _ from "lodash";

import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import Notification, { notifier } from "react-toast-notifier";

import * as actions from "../../actions/AdminAuth";

import loginfield from "./loginfield";
import InputField from "../InputField/InputField";

import "./AdminLogin.css";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  renderFields() {
    return _.map(loginfield, ({ label, name }) => {
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

  onSubmit = (formProps) => {
    this.props.login(formProps, () => {
      this.props.history.push("/admin/dashboard");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container justify-content-center">
        <Notification />
        <div className="admin_text_box">
          <h1 className="d-flex justify-content-center admin_text">
            Admin Dashboard
          </h1>
          <h1 className="d-flex justify-content-center admin_text">
            Welcome to heroic Minds
          </h1>
        </div>
        <div className="row justify-content-center">
          <div>
            <form onSubmit={handleSubmit(this.onSubmit)}>
              {this.renderFields()}
              <button
                onClick={() => {
                  notifier({
                    type: "error",
                    message: `${this.props.errorMessage}`,
                    autoDismissTimeout: 5000,
                  });
                }}
                className="ui big right floated black button"
              >
                Sign In!
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

  _.each(loginfield, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: "AdminLoginForm",
    destroyOnUnmount: false,
  })
)(AdminLogin);
