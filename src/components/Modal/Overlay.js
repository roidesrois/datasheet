import React from 'react';
import { node } from 'prop-types';

import { CSSTransition } from 'react-transition-group';

import styles from './modal.module.scss';

const overlayStates = {
    appear: styles.enter,
    appearActive: styles.enterActive,
    enter: styles.enter,
    enterDone: styles.enterDone,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitDone: styles.exitDone,
    exitActive: styles.exitActive
};

const Overlay = ({ children }) => (
    <CSSTransition classNames={overlayStates} timeout={500} in={true} appear={true}>
        <div aria-modal="true" tabIndex={-1} role="dialog" className={styles.overlay}>
            {children}
        </div>
    </CSSTransition>
);

Overlay.propTypes = {
    children: node.isRequired
};

export default Overlay;
