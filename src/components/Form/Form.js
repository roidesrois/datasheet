import React, { Component } from 'react';
import { node, func, object, objectOf } from 'prop-types';
import { object as YUPObject } from 'yup';

import FormContext from './FormContext';

export default class Form extends Component {
    static getDerivedStateFromProps(props, state) {
        if (!state.initialData) {
            return { data: props.initialState, initialData: true };
        }
        return null;
    }

    state = { data: {}, errors: {}, isSubmitting: false, initialData: false };

    inputChange = (name, value = null) => e => {
        const targetValue = value !== null ? value : e.target.value;

        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: targetValue
            }
        }));
    };

    updateValue = (name, value = null) => {
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }));
    };

    validateSchema = async () => {
        try {
            await this.props.schema.validate(this.state.data, { abortEarly: false });
            return true;
        } catch (all) {
            const errors = {};
            all.inner.forEach(e => {
                errors[e.path] = e.errors;
            });

            this.setErrors(errors);

            return false;
        }
    };

    setErrors = errors => {
        this.setState({
            errors: { ...this.state.errors, ...errors }
        });
        // this.setState({ errors });
        if (this.props.onError) {
            this.props.onError(errors);
        }
    };

    clearErrors = fields => {
        let newErrors = {};

        if (fields) {
            for (let key in this.state.errors) {
                if (!(key in fields)) {
                    newErrors[key] = this.state.errors[key];
                }
            }
        }

        this.setState({ errors: newErrors });
    };

    submitForm = async params => {
        const valid = await this.validateSchema();
        if (valid) {
            this.setState({ isSubmitting: true });
            try {
                await this.props.onSubmit(
                    this.state.data,
                    this.setErrors,
                    this.clearErrors,
                    params
                );
                this.setState({ isSubmitting: false });
            } catch (e) {
                this.setState({ isSubmitting: false });
                throw e;
            }
        }
    };

    onSubmit = e => {
        e.preventDefault();
        this.submitForm(null);
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} method="POST" noValidate>
                <FormContext.Provider
                    value={{
                        data: this.state.data,
                        isSubmitting: this.state.isSubmitting,
                        inputChange: this.inputChange,
                        updateValue: this.updateValue,
                        errors: this.state.errors,
                        submit: this.submitForm
                    }}
                >
                    {this.props.children}
                </FormContext.Provider>
            </form>
        );
    }
}

Form.propTypes = {
    children: node,
    onSubmit: func.isRequired,
    onError: func,
    initialState: object,
    schema: objectOf(YUPObject)
};

Form.defaultProps = {
    initialState: {},
    schema: YUPObject().shape({}),
    onError: null
};
