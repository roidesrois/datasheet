import React, { Component } from 'react';
import { string, bool } from 'prop-types';

import styles from './form.module.scss';
import FormContext from './FormContext';
import FieldError from './FieldError';
import classnames from 'classnames';
import { Row, Col } from '../Grid';
import { VisiblyHidden } from '../VisiblyHidden';

const d = new Date();
const currentYear = d.getFullYear();

const datePicker = {
    days: maxDays => [...Array(maxDays).keys()].map(k => k + 1),
    months: [...Array(12).keys()].map(k => k + 1),
    years: [...Array(60).keys()].map(k => currentYear - k).sort()
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class DatePicker extends Component {
    static contextType = FormContext;

    state = { year: '', month: '', day: '', maxDays: 31 };

    changePart = part => e => {
        this.setState({ [part]: e.target.value });
    };

    componentDidMount() {
        if (this.context.data[this.props.name]) {
            const splitted = this.context.data[this.props.name].split('-');
            if (splitted.length === 3) {
                this.setState({
                    day: parseInt(splitted[2]),
                    month: parseInt(splitted[1]),
                    year: parseInt(splitted[0])
                });
            }
        }
    }

    componentDidUpdate() {
        const { day, month, year, maxDays } = this.state;
        const maxDaysNew = new Date(year, month, 0).getDate();

        const date = this.context.data[this.props.name];

        const stateDate = `${year}-${month < 10 ? `0${month}` : month}-${
            month < 10 ? `0${day}` : day
        }`;

        if (maxDays !== maxDaysNew) {
            this.setState({ maxDays: maxDaysNew });
            if (day >= maxDaysNew) {
                this.setState({ day: '' });
            }
        } else if (day !== '' && month !== '' && year !== '' && stateDate !== date) {
            this.context.inputChange(this.props.name, stateDate)();
        }
    }

    render() {
        const { label, name, hideLabel } = this.props;

        return (
            <div
                className={classnames(styles.inputRow, {
                    [styles.hasErrors]: name in this.context.errors
                })}
            >
                {hideLabel ? (
                    <VisiblyHidden as="label" htmlFor={name}>
                        {label}
                    </VisiblyHidden>
                ) : (
                    <label htmlFor={name}>{label}</label>
                )}
                <Row>
                    <Col grow={2}>
                        <div className={styles.selectBox}>
                            <select
                                name={`${name}_day`}
                                onChange={this.changePart('day')}
                                value={this.state.day}
                                className={classnames({
                                    [styles.placeholder]: !this.state.day
                                })}
                            >
                                <option value="">Day</option>
                                {datePicker.days(this.state.maxDays).map(day => (
                                    <option key={day} value={day}>
                                        {day < 10 && '0'}
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Col>
                    <Col grow={3} className={styles.paddedCol}>
                        <div className={styles.selectBox}>
                            <select
                                name={`${name}_month`}
                                onChange={this.changePart('month')}
                                value={this.state.month}
                                className={classnames({
                                    [styles.placeholder]: !this.state.month
                                })}
                            >
                                <option value="">Month</option>
                                {datePicker.months.map(month => (
                                    <option key={month} value={month}>
                                        {months[month - 1]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Col>
                    <Col grow={3}>
                        <div className={styles.selectBox}>
                            <select
                                name={`${name}_year`}
                                onChange={this.changePart('year')}
                                value={this.state.year}
                                className={classnames({
                                    [styles.placeholder]: !this.state.year
                                })}
                            >
                                <option value="">Year</option>
                                {datePicker.years.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Col>
                </Row>
                <div className={styles.error}>
                    <FieldError name={name} />
                </div>
            </div>
        );
    }
}

DatePicker.propTypes = {
    name: string.isRequired,
    label: string.isRequired,
    hideLabel: bool
};

DatePicker.defaultProps = {
    errors: [],
    hideLabel: false
};
