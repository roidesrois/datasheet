import React, { Component } from "react";
import { string, arrayOf, oneOfType, number, shape, bool } from "prop-types";

import styles from "./form.module.scss";
import FormContext from "./FormContext";
import FieldError from "./FieldError";
import classnames from "classnames";

export default class SelectBox extends Component {
    static contextType = FormContext;

    state = { submit: false };

    setSubmit = () => {
        this.setState({ submit: true });
    };

    handleChange = e => {
        const { name, onChange } = this.props;

        if (!onChange || (onChange && onChange(e.target.value, this.setSubmit))) {
            this.context.inputChange(name)(e);
        }
    };

    componentDidUpdate() {
        if (this.state.submit) {
            this.context.submit();
            this.setState({ submit: false });
        }
    }

    render() {
        const { label, name, placeholder, hideLabel, showEmpty, showErrors } = this.props;

        return (
            <div
                className={classnames(styles.inputRow, {
                    [styles.hasErrors]: name in this.context.errors,
                })}
            >
                {!hideLabel && <label htmlFor={name}>{label}</label>}
                <div className={styles.selectBox}>
                    <select
                        name={name}
                        onChange={this.handleChange}
                        className={classnames({
                            [styles.placeholder]: !this.context.data[name],
                        })}
                        defaultValue={this.context.data[name]}
                    >
                        {showEmpty && <option value="">{placeholder}</option>}
                        {this.props.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                {showErrors && (
                    <div className={styles.error}>
                        <FieldError name={name} />
                    </div>
                )}
            </div>
        );
    }
}

SelectBox.propTypes = {
    name: string.isRequired,
    label: string.isRequired,
    showEmpty: bool,
    showErrors: bool,
    errors: arrayOf(string.isRequired),
    hideLabel: bool,
    options: arrayOf(
        shape({
            value: oneOfType([string, number]).isRequired,
            label: string.isRequired,
        }),
    ),
};

SelectBox.defaultProps = {
    errors: [],
    options: [],
    hideLabel: false,
    showEmpty: true,
    showErrors: true,
};
