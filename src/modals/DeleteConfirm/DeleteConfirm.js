import React from 'react';
import { func } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card } from '../../components/Card';
import { PaddedContent } from '../../components/PaddedContent';
import { Button } from '../../components/SexyButton';

import styles from './delete.module.scss';

const DeleteConfirm = ({ closeModal, deleteConfirm, confirmText }) => (
    <Card className={styles.modal}>
        <PaddedContent>
            <div className={styles.content}>
                <FontAwesomeIcon icon="trash-alt" size="2x" />
                <h2>{confirmText}</h2>
            </div>
        </PaddedContent>
        <div className={styles.footer}>
            <Button feel="none" onClick={closeModal}>
                Cancel
            </Button>
            <Button
                feel="danger"
                onClick={e => {
                    e.preventDefault();
                    deleteConfirm(closeModal);
                }}
            >
                Delete
            </Button>
        </div>
    </Card>
);

DeleteConfirm.propTypes = {
    closeModal: func.isRequired,
    deleteConfirm: func.isRequired
};

export default DeleteConfirm;
