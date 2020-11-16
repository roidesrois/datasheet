import React from 'react';
import { string, node } from 'prop-types';

import styles from './a11y.module.scss';

const VisiblyHidden = ({ as, children, ...props }) =>
    React.createElement(as, { ...props, className: styles.visiblyHidden }, children);

VisiblyHidden.propTypes = {
    as: string,
    children: node
};

VisiblyHidden.defaultProps = {
    as: 'span',
    children: null
};

export default VisiblyHidden;
