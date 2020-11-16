import React from 'react';
import classnames from 'classnames';
import { node, string, bool } from 'prop-types';

import styles from './styles.module.scss';

const Card = ({ children, className, hover }) => (
    <div className={classnames(styles.card, className, { [styles.hover]: hover })}>{children}</div>
);

Card.propTypes = {
    children: node.isRequired,
    className: string,
    hover: bool
};

Card.defaultProps = {
    hover: false,
    className: ''
};

export default Card;
