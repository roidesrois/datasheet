import * as React from 'react';

import classnames from 'classnames';
import { string, number } from 'prop-types';
import styles from './pagination.module.scss';

export const PaginationTotalCountBar = ({ totalItemsCountLabel, totalItemsCount }) => {
    return (
        <div className={classnames(styles.total, styles.total__box)}>
            <span className={styles.total__label}>{totalItemsCountLabel}</span>
            <span className={styles.total__count}>{totalItemsCount}</span>
        </div>
    );
};

PaginationTotalCountBar.propTypes = {
    totalItemsCount: number,
    totalItemsCountLabel: string
};
