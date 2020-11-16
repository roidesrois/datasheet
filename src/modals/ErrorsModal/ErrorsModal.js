import React from 'react';
import { func, string, arrayOf } from 'prop-types';
import { Card } from '../../components/Card';
import { PaddedContent } from '../../components/PaddedContent';
import { Button } from '../../components/SexyButton';

import styles from './errors.module.scss';

const ErrorsModal = ({ closeModal, errors }) => (
    <Card className={styles.modal}>
        <PaddedContent>
            <div className={styles.content}>
                <ul className={styles.fieldError}>
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div>
        </PaddedContent>
        <div className={styles.footer}>
            <Button feel="danger" onClick={closeModal}>
                Close
            </Button>
        </div>
    </Card>
);

ErrorsModal.propTypes = {
    closeModal: func.isRequired,
    errors: arrayOf(string)
};

export default ErrorsModal;
