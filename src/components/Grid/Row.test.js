import React from 'react';
import { shallow } from 'enzyme';
import Row from './Row';

import styles from './grid.module.scss';

it('renders Row component', () => {
    const row = shallow(<Row>Test</Row>);
    const div = row.find('div');

    expect(div.prop('className')).toEqual(styles.row);
    expect(div.text()).toEqual('Test');
});

it('renders Row component with className', () => {
    const row = shallow(<Row className="test">Test</Row>);
    const div = row.find('div');

    expect(div.prop('className')).toEqual(`${styles.row} test`);
});
