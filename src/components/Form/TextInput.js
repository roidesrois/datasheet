import React, { Component } from "react";
import { string, arrayOf, bool } from "prop-types";
import classnames from "classnames";

import styles from "./form.module.scss";

export default class TextInput extends Component {
    render() {
        const { type, name, label, placeholder, hideLabel, disabled, value, id } = this.props;

        return (
            <div className={classnames(styles.inputRow)}>
                {!hideLabel && <label htmlFor={name}>{label}</label>}
                <input
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={this.props.onChange}
                    disabled={disabled}
                />
            </div>
        );
    }
}

TextInput.propTypes = {
    type: string,
    name: string.isRequired,
    label: string,
    showErrors: bool,
    placeholder: string,
    value: string,
    hideLabel: bool,
    disabled: bool,
};

TextInput.defaultProps = {
    type: "text",
    errors: [],
    showErrors: true,
    hideLabel: false,
    disabled: false,
};
