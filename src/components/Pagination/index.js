import React, { Component } from 'react';

import classnames from 'classnames';

import { PaginationConfigToolbar } from './PaginationConfigToolbar';
import { PaginationTotalCountBar } from './PaginationTotalCountBar';
import { PaginationView } from './PaginationView';
import { func, number, arrayOf, string } from 'prop-types';
import styles from './pagination.module.scss';

/**
 * Pagination component.
 */
export class Pagination extends Component {
    static displayName = 'Pagination';

    constructor(props) {
        super(props);

        this.state = {
            currentPage: props.currentPage || 1,
            itemsCountPerPage: this.props.defaultItemsCountPerPage
        };
    }

    static View = PaginationView;
    static ConfigToolbar = PaginationConfigToolbar;

    handleItemsCountPerPageChange = itemsCountPerPage => {
        this.setState({ itemsCountPerPage, currentPage: 1 }, () =>
            this.callOnPageChangeCallback(this.state.currentPage, itemsCountPerPage)
        );
    };

    handleCurrentPageChange = currentPage => {
        this.setState({ currentPage }, () =>
            this.callOnPageChangeCallback(currentPage, this.state.itemsCountPerPage)
        );
    };

    callOnPageChangeCallback = (currentPage, itemsCountPerPage) => {
        this.props.onPageChange((currentPage - 1) * itemsCountPerPage, itemsCountPerPage);
    };

    render() {
        const {
            className,
            datatestid,
            itemsCountPerPageLabel,
            totalItemsCount,
            itemsCountPerPageOptions,
            totalItemsCountLabel,
            layoutCallback
        } = this.props;

        const totalPagesCount =
            this.state.itemsCountPerPage > 0 && totalItemsCount > 0
                ? Math.ceil(totalItemsCount / this.state.itemsCountPerPage)
                : 1;

        if (
            !totalItemsCountLabel &&
            totalPagesCount === 1 &&
            (!itemsCountPerPageLabel ||
                !itemsCountPerPageOptions ||
                totalItemsCount <= itemsCountPerPageOptions[0])
        ) {
            return null;
        }

        const content = (
            <div className={classnames(className, styles.pagination)} data-test-id={datatestid}>
                {totalItemsCountLabel && (
                    <PaginationTotalCountBar
                        totalItemsCountLabel={totalItemsCountLabel}
                        totalItemsCount={totalItemsCount}
                    />
                )}

                {totalPagesCount > 1 && (
                    <PaginationView
                        onPageChange={this.handleCurrentPageChange}
                        currentPage={this.state.currentPage}
                        totalPagesCount={totalPagesCount}
                    />
                )}

                {itemsCountPerPageOptions &&
                    itemsCountPerPageLabel &&
                    totalItemsCount > itemsCountPerPageOptions[0] && (
                        <PaginationConfigToolbar
                            itemsCountPerPageLabel={itemsCountPerPageLabel}
                            itemsCountPerPageOptions={itemsCountPerPageOptions}
                            itemsCountPerPage={Number(this.state.itemsCountPerPage)}
                            onItemsCountPerPageChange={this.handleItemsCountPerPageChange}
                        />
                    )}
            </div>
        );

        return typeof layoutCallback === 'function' ? layoutCallback(content) : content;
    }
}

Pagination.propTypes = {
    defaultItemsCountPerPage: number,
    onPageChange: func,
    totalItemsCount: number,
    itemsCountPerPageOptions: arrayOf(number),
    itemsCountPerPageLabel: string,
    totalItemsCountLabel: string,
    layoutCallback: func,
    currentPage: number
};
