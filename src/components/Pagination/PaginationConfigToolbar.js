import * as React from "react";

import classnames from "classnames";
import { string, number, arrayOf, func } from "prop-types";
import styles from "./pagination.module.scss";

import { SelectBox } from "../Form";

/** Toolbar to configure `Pagination` component. For example, max items count displayed per one page. */

export const PaginationConfigToolbar = ({
    className,
    datatestid,
    itemsCountPerPageLabel,
    itemsCountPerPageOptions,
    onItemsCountPerPageChange,
}) => {
    return (
        <div className={classnames(styles.perPage, styles.perPage__box, className)} data-test-id={datatestid}>
            <span className={styles.perPage__label}>{itemsCountPerPageLabel}</span>
            <span className={styles.perPage__select}>
                <SelectBox
                    label="Items Count Per Page"
                    name="itemsCountPerPage"
                    placeholder="Choose items count per page"
                    showEmpty={false}
                    showErrors={false}
                    hideLabel={true}
                    onChange={onItemsCountPerPageChange}
                    options={itemsCountPerPageOptions.map(item => ({
                        value: item,
                        label: String(item),
                    }))}
                />
            </span>
        </div>
    );
};

PaginationConfigToolbar.propTypes = {
    itemsCountPerPage: number,
    itemsCountPerPageOptions: arrayOf(number),
    itemsCountPerPageLabel: string,
    onItemsCountPerPageChange: func,
};
