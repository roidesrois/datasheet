import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { node, func, bool } from 'prop-types';

import styles from './modal.module.scss';

import Overlay from './Overlay';

const modalStates = {
    appear: styles.enter,
    appearActive: styles.enterActive,
    enter: styles.enter,
    enterDone: styles.enterDone,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitDone: styles.exitDone,
    exitActive: styles.exitActive
};

export default class Modal extends Component {
    modalRef = React.createRef();

    escapeClicked = e => {
        if (e.keyCode === 27) {
            this.props.closeModal();
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.escapeClicked, false);
        document.addEventListener('click', this.onOverlayClick, false);
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escapeClicked, false);
        document.removeEventListener('click', this.onOverlayClick, false);
        document.body.removeAttribute('style');
    }

    onOverlayClick = e => {
        if (
            !document.contains(e.target) ||
            this.modalRef.current === e.target ||
            this.modalRef.current.contains(e.target)
        )
            return;
        this.props.closeModal();
    };

    render() {
        const { children } = this.props;

        return ReactDOM.createPortal(
            <Overlay>
                <div className={styles.container}>
                    <div className={styles.modal} ref={this.modalRef}>
                        <CSSTransition
                            classNames={modalStates}
                            timeout={500}
                            in={this.props.isOpen}
                            appear={true}
                        >
                            <div className={styles.modalAnimate}>{children}</div>
                        </CSSTransition>
                    </div>
                </div>
            </Overlay>,
            document.body
        );
    }
}

Modal.propTypes = {
    children: node.isRequired,
    closeModal: func.isRequired,
    isOpen: bool.isRequired
};
