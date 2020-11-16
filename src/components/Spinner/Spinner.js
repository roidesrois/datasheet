import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

const Spinner = () => (
    <div className={styles.spinner}>
        <FontAwesomeIcon icon="circle-notch" spin />
    </div>
);

export default Spinner;
