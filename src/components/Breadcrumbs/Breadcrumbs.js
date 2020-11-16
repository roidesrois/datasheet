import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

export default class Breadcrumbs extends Component {
    render() {
        const { links } = this.props;
        return (
            <div className={styles.breadcrumbs}>
                <Container as="ul">
                    <li>
                        <Link to="/">
                            Home{' '}
                            <span className={styles.icon}>
                                <FontAwesomeIcon icon="caret-right" size="1x" />
                            </span>
                        </Link>
                    </li>

                    {links.map(link => (
                        <li key={link.label}>
                            {link.to ? (
                                <Link to={link.to}>
                                    {link.label}{' '}
                                    <span className={styles.icon}>
                                        <FontAwesomeIcon icon="caret-right" size="1x" />
                                    </span>
                                </Link>
                            ) : (
                                link.label
                            )}
                        </li>
                    ))}
                </Container>
            </div>
        );
    }
}
