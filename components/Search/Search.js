import React, { Component } from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./search.module.scss";

import { Col } from "../../components/Grid";

class Search extends Component {
    state = { focus: false, value: "" };

    onFocus = () => {
        this.setState({ focus: true });
    };

    onBlur = () => {
        this.setState({ focus: false });
    };

    onChange = e => {
        this.props.onChange(e);
    };

    render() {
        return (
            <>
                <Col>
                    <div
                        className={classnames({
                            [styles.search]: true,
                            [styles.hideMobile]: true,
                            [styles.focus]: this.state.focus || this.state.value.length > 0,
                        })}
                    >
                        <input
                            type="text"
                            name="search"
                            placeholder="Search"
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onChange={this.onChange}
                        />
                        <button type="button" className={styles.searchButton}>
                            <FontAwesomeIcon icon="search" size="sm" />
                        </button>
                    </div>
                </Col>
            </>
        );
    }
}

export default Search;
