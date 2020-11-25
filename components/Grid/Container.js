import React from 'react';
import { string, node, func, instanceOf, oneOfType } from 'prop-types';

import styles from './grid.module.scss';

const Container = ({ children, className, as }) =>
    React.createElement(as, { className: `${styles.container} ${className}`.trim() }, children);

Container.propTypes = {
    className: string,
    children: node,
    as: oneOfType([instanceOf(React.Component), string, func])
};

Container.defaultProps = {
    className: '',
    children: null,
    as: 'div'
};

export default Container;
