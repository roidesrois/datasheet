import React, { Component } from "react";
import { string } from "prop-types";

import styles from "./form.module.scss";

export default class FieldError extends Component {
    render() {
        return this.context.errors[this.props.name] ? (
            <ul className={styles.fieldError}>
                {this.context.errors[this.props.name].map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
        ) : null;
    }
}

FieldError.propTypes = {
    name: string.isRequired,
};
