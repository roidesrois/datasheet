import React, { Component } from 'react';
import { string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import styles from './form.module.scss';
import FormContext from './FormContext';
import FieldError from './FieldError';

import { VisiblyHidden } from '../VisiblyHidden';

export default class Textarea extends Component {
    static contextType = FormContext;

    render() {
        const { type, name, label, placeholder, hideLabel } = this.props;
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
                <textarea
                    type={type}
                    name={name}
                    id={name}
                    rows="15"
                    cols="50"
                    placeholder={placeholder}
                    defaultValue={this.context.data[name]}
                    onChange={this.context.inputChange(name)}
                />
                <div className={styles.error}>
                    <FieldError name={name} />
                </div>
            </div>
        );
    }
}

Textarea.propTypes = {
    type: string,
    name: string.isRequired,
    label: string.isRequired,
    placeholder: string.isRequired,
    errors: arrayOf(string.isRequired),
    value: string,
    hideLabel: bool
};

Textarea.defaultProps = {
    type: 'text',
    errors: [],
    hideLabel: false
};
