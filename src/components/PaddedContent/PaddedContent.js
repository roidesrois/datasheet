import React from 'react';
import { node } from 'prop-types';
import styles from './styles.module.scss';

const PaddedContent = ({ children }) => <div className={styles.paddedContent}>{children}</div>;

PaddedContent.propTypes = {
    children: node.isRequired
};

export default PaddedContent;
