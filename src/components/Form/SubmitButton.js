import React, { Component } from 'react';
import { node, bool } from 'prop-types';

import FormContext from './FormContext';

import { SexyButton } from '../SexyButton';

export default class SubmitButton extends Component {
    static contextType = FormContext;
    render() {
        return (
            <SexyButton
                responsive={!this.props.fullWidth}
                full={this.props.fullWidth}
                type="submit"
                disabled={this.context.isSubmitting}
            >
                {this.props.children}
            </SexyButton>
        );
    }
}

SubmitButton.propTypes = {
    children: node.isRequired,
    fullWidth: bool
};

SubmitButton.defaultProps = {
    fullWidth: false
};
