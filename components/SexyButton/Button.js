import React from "react";
import classnames from "classnames";
import { string, bool, node } from "prop-types";

import styles from "./button.module.scss";

const Button = ({
    feel,
    active,
    className,
    outline,
    condensed,
    responsive,
    full,
    inverse,
    disabled,
    as,
    children,
    ...props
}) => {
    const elemProps = {
        className: classnames(styles.btn, styles[feel], className, {
            [styles.responsive]: responsive,
            [styles.full]: full,
            [styles.condensed]: condensed,
            [styles.active]: active,
            [styles.outline]: outline,
            [styles.inverse]: inverse,
        }),
        ...props,
    };

    if (as === "button") {
        return (
            <button {...elemProps} disabled={disabled}>
                {children}
            </button>
        );
    }

    return React.createElement(as, elemProps, children);
};

Button.propTypes = {
    feel: string,
    type: string,
    children: node.isRequired,
    condensed: bool,
    disabled: bool,
    active: bool,
    outline: bool,
    responsive: bool,
    full: bool,
    inverse: bool,
    className: string,
};

Button.defaultProps = {
    feel: "primary",
    type: "button",
    as: "button",
    condensed: false,
    responsive: false,
    inverse: false,
    disabled: false,
    active: false,
    outline: false,
    full: false,
    className: "",
};

export default Button;
