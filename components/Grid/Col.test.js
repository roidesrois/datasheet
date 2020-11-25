import React from 'react';
import { shallow } from 'enzyme';
import Col from './Col';

import styles from './grid.module.scss';

describe('sets proper class names for each grow value', () => {
    for (let i = 1; i <= 12; ++i) {
        it(`grow = ${i}`, () => {
            const component = shallow(<Col grow={i} />);
            const col = component.find(`.${styles[`col-${i}`]}`);
            expect(col).toHaveLength(1);
        });
    }
});

it('sets default grow value to 1', () => {
    const component = shallow(<Col />);
    const col = component.find(`.${styles[`col-1`]}`);
    expect(col).toHaveLength(1);
});

it('renders with className', () => {
    const component = shallow(<Col className="test" />);
    const col = component.find(`.test`);
    expect(col).toHaveLength(1);
    expect(col.prop('className')).toEqual(`${styles[`col-1`]} test`);
});

it('renders with style', () => {
    const component = shallow(<Col style={{ color: 'red' }} />);
    const col = component.find('div');
    expect(col.prop('style')).toEqual({ color: 'red' });
});

it('renders with children', () => {
    const component = shallow(<Col style={{ color: 'red' }}>Some Text</Col>);
    const col = component.find('div');
    expect(col.text()).toEqual('Some Text');
});
