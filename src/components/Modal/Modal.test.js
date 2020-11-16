import React from 'react';
import ReactDOM from 'react-dom';

import { mount } from 'enzyme';

import Modal from './Modal';
import Overlay from './Overlay';

import styles from './modal.module.scss';

import { CSSTransition } from 'react-transition-group';

it('renders modal if modal is open', () => {
    const closeModal = jest.fn();
    const container = mount(
        <Modal closeModal={closeModal} isOpen={true}>
            Hello World
        </Modal>
    );

    const overlay = container.find(Overlay);

    expect(overlay).toHaveLength(1);

    const modal = overlay.find(`.${styles.modal}`);
    expect(modal).toHaveLength(1);

    const transition = modal.find(CSSTransition);
    expect(transition).toHaveLength(1);
    expect(transition.prop('in')).toBeTruthy();

    const modalAnimate = transition.find(`.${styles.modalAnimate}`);
    expect(modalAnimate).toHaveLength(1);
    expect(modalAnimate.text()).toEqual('Hello World');

    container.unmount();
});

describe('close modal', () => {
    const closeModal = jest.fn();
    const element = document.createElement('div');
    beforeEach(() => {
        ReactDOM.render(
            <Modal closeModal={closeModal} isOpen={true}>
                Hello World
            </Modal>,
            element
        );
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(element);
        closeModal.mockReset();
    });

    it('closes modal if escape is clicked', () => {
        var evt = new KeyboardEvent('keydown', { keyCode: 27 });
        document.dispatchEvent(evt);
        expect(closeModal).toHaveBeenCalledTimes(1);
    });

    it('closes modal if mouse is clicked on overlay', () => {
        var evt = new MouseEvent('click', { bubbles: true });
        document.body.dispatchEvent(evt);
        expect(closeModal).toHaveBeenCalledTimes(1);
    });

    it('does not close modal if mouse is clicked on modal', () => {
        const modal = document.body.querySelector(`.${styles.modal}`);

        var evt = new MouseEvent('click', { bubbles: true });

        modal.dispatchEvent(evt);

        expect(closeModal).toHaveBeenCalledTimes(0);
    });
});
