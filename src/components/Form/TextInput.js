import React, { Component } from 'react';
import { string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import styles from './form.module.scss';
import FormContext from './FormContext';
import FieldError from './FieldError';

import { VisiblyHidden } from '../VisiblyHidden';

export default class TextInput extends Component {
    static contextType = FormContext;

    render() {
        const { type, name, label, placeholder, hideLabel, showErrors, disabled } = this.props;
        return (
            <div
                className={classnames(styles.inputRow, {
                    [styles.hasErrors]: name in this.context.errors
                })}
            >
                {hideLabel ? (
                    <VisiblyHidden as="label" htmlFor={name}>
                        {label}
                    </VisiblyHidden>
                ) : (
                    <label htmlFor={name}>{label}</label>
                )}
                <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    defaultValue={this.context.data[name]}
                    onChange={this.context.inputChange(name)}
                    disabled={disabled}
                />
                {showErrors && (
                    <div className={styles.error}>
                        <FieldError name={name} />
                    </div>
                )}
            </div>
        );
    }
}

TextInput.propTypes = {
    type: string,
    name: string.isRequired,
    label: string.isRequired,
    showErrors: bool,
    placeholder: string.isRequired,
    errors: arrayOf(string.isRequired),
    value: string,
    hideLabel: bool,
    disabled: bool
};

TextInput.defaultProps = {
    type: 'text',
    errors: [],
    showErrors: true,
    hideLabel: false,
    disabled: false
};
