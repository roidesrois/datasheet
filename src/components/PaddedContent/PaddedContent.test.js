import React from 'react';
import { shallow } from 'enzyme';

import PaddedContent from './PaddedContent';
import styles from './styles.module.scss';

it('renders PaddedContent', () => {
    const component = shallow(<PaddedContent>Hello World</PaddedContent>);
    const content = component.find('div');
    expect(content).toHaveLength(1);
    expect(content.prop('className')).toEqual(styles.paddedContent);
    expect(content.text()).toEqual('Hello World');
});
