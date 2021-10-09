import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';

import themefield from '../ThemeForm/themefield';
import InputField from '../InputField/InputField';

class ThemeForm extends Component {
    state = {}
    renderFields() {
        return _.map(themefield, ({ label, name }) => {
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
    onSubmit = (fromValues) => {
        console.log(fromValues);
        this.props.onSubmit(fromValues);
    };

    render() {
        return (<div className="ThemeForm">
            <div className="justify-content-center">
                <div>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        {this.renderFields()}
                        <button
                            className="ui big circular left floated black basic button">{this.props.button}</button>
                    </form>
                </div>
            </div>
        </div>);
    }
}

function validate(values) {
    const errors = {};

    _.each(themefield, ({ name }) => {
        if (!values[name]) {
            errors[name] = `You must provide a ${name}`;
        }
    });

    return errors;
}

export default reduxForm({
    form: "ThemeForm",
    validate
})(ThemeForm);