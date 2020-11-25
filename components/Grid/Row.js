import React, { Component } from 'react';
import classnames from 'classnames';
import { node, string, bool } from 'prop-types';

import styles from './grid.module.scss';

export default class Row extends Component {
    render() {
        const { children, className, wrap, responsive } = this.props;

        return (
            <div
                className={classnames({
                    [styles.row]: true,
                    [className]: true,
                    [styles.wrap]: wrap,
                    [styles.responsive]: responsive
                }).trim()}
            >
                {children}
            </div>
        );
    }
}

Row.propTypes = {
    children: node.isRequired,
    className: string,
    wrap: bool,
    responsive: bool
};
Row.defaultProps = {
    className: '',
    wrap: false,
    responsive: false
};
