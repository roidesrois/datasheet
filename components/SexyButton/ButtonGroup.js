import React from 'react';
import classnames from 'classnames';
import styles from './button.module.scss';

import { string, node } from 'prop-types';

const ButtonGroup = ({ className, children }) => (
    <div className={classnames(styles.group, className)}>{children}</div>
);

ButtonGroup.propTypes = {
    className: string,
    children: node.isRequired
};

ButtonGroup.defaultProps = {
    className: ''
};

export default ButtonGroup;
