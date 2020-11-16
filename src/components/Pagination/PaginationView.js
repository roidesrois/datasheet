import React, { Component } from 'react';

import classnames from 'classnames';
import { Button } from '../SexyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './pagination.module.scss';
import { func, number } from 'prop-types';

export class PaginationView extends Component {
    getDataTestId = pageNumber => {
        const { totalPagesCount, currentPage } = this.props;
        let pageLabel = '';

        // eslint-disable-next-line default-case
        switch (pageNumber) {
            case 1:
                pageLabel = 'first';
                break;
            case totalPagesCount:
                pageLabel = 'last';
                break;
            case currentPage - 1:
                pageLabel = 'prev';
                break;
            case currentPage + 1:
                pageLabel = 'next';
                break;
        }

        return pageLabel ? `pagination-${pageLabel}-item-button` : '';
    };

    page = pageNumber =>
        pageNumber === this.props.currentPage ? (
            <span
                key={pageNumber}
                className={classnames(styles.pageNumber, styles.active, styles._static)}
            >
                {pageNumber}
            </span>
        ) : (
            <Button
                key={pageNumber}
                feel="link"
                inverse
                datatestid={this.getDataTestId(pageNumber)}
                onClick={() => this.props.onPageChange(pageNumber)}
                className={classnames(styles.pageNumber)}
            >
                {pageNumber}
            </Button>
        );

    dots = positionNumber => (
        <span
            key={`dots-${positionNumber}`}
            className={classnames(styles.pageNumber, styles._static)}
        >
            ...
        </span>
    );

    render() {
        const { className, dataTestId, onPageChange, currentPage, totalPagesCount } = this.props;
        const { page, dots } = this;
        const prevPage = currentPage - 1;
        const nextPage = currentPage + 1;

        const pages = [];

        if (totalPagesCount > 7) {
            const thirdPageFromEnd = totalPagesCount - 2;
            const borderPosition = 3;

            // 1 position.
            pages.push(page(1));

            // 2 position.
            if (currentPage <= borderPosition || currentPage >= thirdPageFromEnd) {
                pages.push(page(2));
            } else {
                pages.push(dots(2));
            }

            // 3 position.
            if (currentPage > borderPosition && currentPage < thirdPageFromEnd) {
                pages.push(page(prevPage));
            } else if (currentPage <= borderPosition || currentPage > thirdPageFromEnd) {
                pages.push(page(3));
            } else {
                pages.push(dots(3));
            }

            // 4 position.
            if (currentPage > borderPosition && currentPage < thirdPageFromEnd) {
                pages.push(page(currentPage));
            } else if (thirdPageFromEnd === currentPage) {
                pages.push(page(prevPage));
            } else if (currentPage === borderPosition) {
                pages.push(page(4));
            } else {
                pages.push(dots(4));
            }

            // 5 position.
            if (currentPage > borderPosition && currentPage < thirdPageFromEnd) {
                pages.push(page(nextPage));
            } else if (currentPage < borderPosition || currentPage >= thirdPageFromEnd) {
                pages.push(page(thirdPageFromEnd));
            } else {
                pages.push(dots(5));
            }

            // 6 position.
            if (currentPage <= borderPosition || currentPage >= thirdPageFromEnd) {
                pages.push(page(totalPagesCount - 1));
            } else {
                pages.push(dots(6));
            }

            // 7 position.
            pages.push(page(totalPagesCount));
        } else if (totalPagesCount > 1) {
            for (let i = 1; i <= totalPagesCount; i++) {
                pages.push(page(i));
            }
        }

        return (
            <div className={styles.pagination__box} data-test-id={dataTestId}>
                <div className={classnames(styles.navigation, className)}>
                    <Button
                        datatestid="pagination-prev-chevron-button"
                        className={styles.prev}
                        inverse
                        feel="normal"
                        active={currentPage !== 1}
                        onClick={() => onPageChange(prevPage)}
                    >
                        <FontAwesomeIcon icon="angle-left" />
                    </Button>
                    {pages}
                    <Button
                        datatestid="pagination-next-chevron-button"
                        className={styles.next}
                        feel="normal"
                        inverse
                        active={currentPage !== totalPagesCount}
                        onClick={() => onPageChange(nextPage)}
                    >
                        <FontAwesomeIcon icon="angle-right" />
                    </Button>
                </div>
            </div>
        );
    }
}

PaginationView.propTypes = {
    currentPage: number,
    totalPagesCount: number,
    onPageChange: func
};

PaginationView.defaultProps = {
    currentPage: 0
};
