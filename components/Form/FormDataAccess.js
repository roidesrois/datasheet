import React, { Component } from 'react';
import { func } from 'prop-types';

import FormContext from './FormContext';

export default class FormDataAccess extends Component {
    static contextType = FormContext;

    render() {
        return <div>{this.props.children(this.context.data)}</div>;
    }
}

FormDataAccess.propTypes = {
    children: func.isRequired
};
