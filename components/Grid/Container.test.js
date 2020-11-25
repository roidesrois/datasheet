import React from 'react';
import { shallow } from 'enzyme';
import Container from './Container';

import styles from './grid.module.scss';

it('renders Container as div (default)', () => {
    const container = shallow(<Container>Test</Container>);
    const div = container.find('div');

    expect(div.prop('className')).toEqual(styles.container);
    expect(div.text()).toEqual('Test');
});

it('renders Container with className', () => {
    const container = shallow(<Container className="test">Test</Container>);
    const div = container.find('div');

    expect(div.prop('className')).toEqual(`${styles.container} test`);
    expect(div.text()).toEqual('Test');
});

it('renders Container as article', () => {
    const container = shallow(<Container as="article">Test</Container>);
    const article = container.find('article');

    expect(article.prop('className')).toEqual(styles.container);
    expect(article.text()).toEqual('Test');
});

it('renders Container as functional component', () => {
    const TestComponent = () => 'Hello';
    const container = shallow(<Container as={TestComponent} />);
    const comp = container.find(TestComponent);
    expect(comp).toHaveLength(1);
});

it('renders Container as class component', () => {
    class TestComponent extends React.Component {
        render() {
            return 'Hello';
        }
    }
    const container = shallow(<Container as={TestComponent} />);
    const comp = container.find(TestComponent);
    expect(comp).toHaveLength(1);
});
