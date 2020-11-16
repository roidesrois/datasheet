import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { arrayOf, string, object, shape, func, bool } from 'prop-types';

import { VisiblyHidden } from '../VisiblyHidden';

import styles from './styles.module.scss';

export default class Datasheet extends Component {
    renderContent() {
        const { isLoading, columns, data, dataKeyName, rowClassFn } = this.props;
        if (isLoading) {
            return (
                <tr className={styles.loadingRow}>
                    <td colSpan={columns.length}>
                        <FontAwesomeIcon icon="circle-notch" spin />
                        <VisiblyHidden>Loading Content</VisiblyHidden>
                    </td>
                </tr>
            );
        }

        if (!data) return null;

        if (data.length === 0)
            return (
                <tr className={styles.nothingFound}>
                    <td colSpan={columns.length}>
                        <FontAwesomeIcon icon="eye-slash" size="lg" />
                        <div>Nothing to show</div>
                    </td>
                </tr>
            );

        return data.map(row => {
            const rowProps = { className: styles.default };
            if (rowClassFn) {
                rowProps.className = rowClassFn(row);
            }
            if (!rowProps.className) {
                rowProps.className = styles.default;
            }
            return (
                <tr key={row[dataKeyName]} {...rowProps}>
                    {columns.map(col => (
                        <td key={col.name} style={col.style || {}}>
                            {col.renderFn ? col.renderFn(row) : row[col.name]}
                        </td>
                    ))}
                </tr>
            );
        });
    }
    render() {
        const { columns, showHeader } = this.props;
        return (
            <table className={styles.table}>
                <thead>
                    {showHeader && (
                        <tr>
                            {columns.map(item => (
                                <th key={item.header}>{item.header}</th>
                            ))}
                        </tr>
                    )}
                </thead>
                <tbody>{this.renderContent()}</tbody>
            </table>
        );
    }
}

Datasheet.propTypes = {
    columns: arrayOf(shape({ name: string.isRequired, header: string, renderFn: func })),
    dataKeyName: string,
    data: arrayOf(object),
    rowClassFn: func,
    isLoading: bool,
    showHeader: bool
};

Datasheet.defaultProps = {
    showHeader: true,
    columns: [],
    dataKeyName: 'id',
    data: [],
    rowClassFn: null,
    bool: false
};
