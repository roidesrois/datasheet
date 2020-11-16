import React, { Component } from 'react';
import { any, number, node, string } from 'prop-types';

import styles from './grid.module.scss';

export default class Col extends Component {
    render() {
        const { grow, children, className, style } = this.props;

        return (
            <div style={style} className={`${styles[`col-${grow}`]} ${className}`}>
                {children}
            </div>
        );
    }
}

Col.propTypes = {
    grow: number,
    children: node,
    className: string,
    style: any
};

Col.defaultProps = {
    grow: 1,
    className: '',
    any: null,
    children: null
};
