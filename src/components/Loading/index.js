import React, { Component } from 'react';
import classnames from 'classnames';
import { Spinner } from '../Spinner';
import styles from './loading.module.scss';
import { node, bool } from 'prop-types';

/**
 * Loading component.
 */
export class Loading extends Component {
    render() {
        const { visible, children } = this.props;

        return (
            <div className={classnames(styles.loading)}>
                <div
                    className={classnames(styles.overlay, {
                        [styles.hidden]: !visible,
                        [styles.visible]: visible
                    })}
                >
                    <div className={classnames(styles.indicatorWrapper, styles.absoluteCenter)}>
                        <div className={classnames(styles.indicator)}>
                            <Spinner />
                        </div>
                    </div>
                </div>
                {children}
            </div>
        );
    }
}

Loading.propTypes = {
    children: node.isRequired,
    visible: bool
};
