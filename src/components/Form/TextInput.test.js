import React from 'react';
import { mount } from 'enzyme';

import TextInput from './TextInput';
import FormContext from './FormContext';
import { VisiblyHidden } from '../VisiblyHidden';

it('renders text input with visible label', () => {
    const inputChange = jest.fn(name => jest.fn(e => name));
    const container = mount(
        <FormContext.Provider value={{ data: {}, errors: {}, inputChange }}>
            <TextInput label="Email" name="username" type="email" placeholder="Enter email" />,
        </FormContext.Provider>
    );

    const input = container.find('input');
    expect(inputChange).toHaveBeenCalledTimes(1);
    expect(container.find('label').text()).toEqual('Email');
    expect(container.find('label').prop('htmlFor')).toEqual('username');
    expect(input.prop('placeholder')).toEqual('Enter email');
    expect(input.prop('name')).toEqual('username');
    expect(input.prop('id')).toEqual('username');
    expect(input.prop('type')).toEqual('email');
    expect(input.prop('defaultValue')).toEqual(undefined);
});

it('renders text input with hidden label', () => {
    const inputChange = jest.fn(name => jest.fn(e => name));
    const container = mount(
        <FormContext.Provider value={{ data: {}, errors: {}, inputChange }}>
            <TextInput
                label="Email"
                name="username"
                type="email"
                placeholder="Enter email"
                hideLabel
            />
            ,
        </FormContext.Provider>
    );

    const input = container.find('input');
    const visiblyHidden = container.find(VisiblyHidden);
    expect(visiblyHidden.prop('as')).toEqual('label');
    expect(visiblyHidden.find('label').text()).toEqual('Email');

    expect(inputChange).toHaveBeenCalledTimes(1);
    expect(input.prop('placeholder')).toEqual('Enter email');
    expect(input.prop('name')).toEqual('username');
    expect(input.prop('id')).toEqual('username');
    expect(input.prop('type')).toEqual('email');
    expect(input.prop('defaultValue')).toEqual(undefined);
});

it('check if input change calls context function', () => {
    const inputChange = jest.fn(name => jest.fn(e => name));

    const container = mount(
        <FormContext.Provider value={{ data: {}, errors: {}, inputChange }}>
            <TextInput
                label="Email"
                name="username"
                type="email"
                placeholder="Enter email"
                hideLabel
            />
            ,
        </FormContext.Provider>
    );

    expect(inputChange).toHaveBeenCalledTimes(1);

    const input = container.find('input');
    input.simulate('change');

    const inputChangeFn = inputChange.mock.results[0].value;
    expect(inputChangeFn).toHaveBeenCalledTimes(1);
    expect(inputChangeFn.mock.results[0].value).toEqual('username');
});

it('renders text input with initial value', () => {
    const inputChange = jest.fn(name => jest.fn(e => name));
    const container = mount(
        <FormContext.Provider
            value={{ data: { username: 'user@email.com' }, errors: {}, inputChange }}
        >
            <TextInput label="Email" name="username" type="email" placeholder="Enter email" />,
        </FormContext.Provider>
    );

    const input = container.find('input');
    expect(inputChange).toHaveBeenCalledTimes(1);

    expect(container.find('label').text()).toEqual('Email');
    expect(container.find('label').prop('htmlFor')).toEqual('username');

    expect(input.prop('placeholder')).toEqual('Enter email');
    expect(input.prop('name')).toEqual('username');
    expect(input.prop('id')).toEqual('username');
    expect(input.prop('type')).toEqual('email');
    expect(input.prop('defaultValue')).toEqual('user@email.com');
});

it('renders text input with errors', () => {
    const inputChange = jest.fn(name => jest.fn(e => name));
    const container = mount(
        <FormContext.Provider
            value={{
                data: { username: 'user@email.com' },
                errors: { username: ['This field is required'] },
                inputChange
            }}
        >
            <TextInput label="Email" name="username" type="email" placeholder="Enter email" />,
        </FormContext.Provider>
    );

    const input = container.find('input');
    expect(inputChange).toHaveBeenCalledTimes(1);
    expect(container.find('label').text()).toEqual('Email');
    expect(input.prop('placeholder')).toEqual('Enter email');
    expect(input.prop('name')).toEqual('username');
    expect(input.prop('id')).toEqual('username');
    expect(input.prop('type')).toEqual('email');
    expect(input.prop('defaultValue')).toEqual('user@email.com');

    expect(container.find('ul')).toHaveLength(1);
    expect(container.find('li').text()).toEqual('This field is required');
});
