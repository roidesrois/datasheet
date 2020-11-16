import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { func } from 'prop-types';

import Modal from './Modal';

export default class ModalTrigger extends Component {
    state = { isOpen: false, params: {} };

    openModal = params => e => {
        e.preventDefault();
        this.setState({ isOpen: true, params });
    };

    closeModal = () => {
        this.setState({ isOpen: false });
    };

    render() {
        return (
            <>
                {this.props.trigger(this.openModal)}
                <Transition
                    in={this.state.isOpen}
                    timeout={{ enter: 0, exit: 500 }}
                    mountOnEnter
                    unmountOnExit
                >
                    <>
                        <Modal closeModal={this.closeModal} isOpen={this.state.isOpen}>
                            {this.props.children(
                                this.closeModal,
                                this.state.isOpen,
                                this.state.params
                            )}
                        </Modal>
                    </>
                </Transition>
            </>
        );
    }
}

ModalTrigger.propTypes = {
    trigger: func.isRequired,
    children: func.isRequired
};
