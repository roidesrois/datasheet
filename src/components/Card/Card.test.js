import React from 'react';
import { shallow } from 'enzyme';

import Card from './Card';
import styles from './styles.module.scss';

it('renders Card', () => {
    const component = shallow(<Card>Hello World</Card>);
    const card = component.find('div');
    expect(card).toHaveLength(1);
    expect(card.prop('className')).toEqual(styles.card);
    expect(card.text()).toEqual('Hello World');
});

it('renders Card with className', () => {
    const component = shallow(<Card className="hello">Hello World</Card>);
    const card = component.find('div');
    expect(card).toHaveLength(1);
    expect(card.prop('className')).toEqual(`${styles.card} hello`);
});
