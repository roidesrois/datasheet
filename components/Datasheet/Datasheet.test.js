import React from 'react';
import { shallow } from 'enzyme';

import Datasheet from './Datasheet';

import styles from './styles.module.scss';

it('renders the given headers inside thead', () => {
    const container = shallow(
        <Datasheet
            columns={[
                { name: 'name', header: 'Name' },
                { name: 'address', header: 'Address' },
                { name: 'city', header: 'City' },
                { name: 'actions', header: 'Actions' }
            ]}
        />
    );

    const headTags = container
        .find('thead')
        .find('tr')
        .find('th');

    expect(headTags).toHaveLength(4);

    expect(headTags.at(0).text()).toEqual('Name');
    expect(headTags.at(1).text()).toEqual('Address');
    expect(headTags.at(2).text()).toEqual('City');
    expect(headTags.at(3).text()).toEqual('Actions');
});

it('renders the given data without actions (default data key)', () => {
    const data = [
        { id: 1, name: 'Name #1', address: 'Random Address 1', city: 'Baku' },
        { id: 2, name: 'Name #2', address: 'Address 2', city: 'NYC' },
        { id: 3, name: 'Name #3', address: 'Some Address 3', city: 'London' },
        { id: 4, name: 'Name #4', address: 'Address 6', city: 'Milan' }
    ];
    const container = shallow(
        <Datasheet
            columns={[
                { name: 'name', header: 'Name' },
                { name: 'address', header: 'Address' },
                { name: 'city', header: 'City' }
            ]}
            data={data}
        />
    );

    const dataRows = container.find('tbody').find('tr');
    expect(dataRows).toHaveLength(4);

    dataRows.forEach((row, idx) => {
        expect(row.childAt(0).text()).toEqual(data[idx].name);
        expect(row.childAt(1).text()).toEqual(data[idx].address);
        expect(row.childAt(2).text()).toEqual(data[idx].city);
    });
});

it('renders the given data without actions', () => {
    const data = [
        { uuid: 1, name: 'Name #1', address: 'Random Address 1', city: 'Baku' },
        { uuid: 2, name: 'Name #2', address: 'Address 2', city: 'NYC' },
        { uuid: 3, name: 'Name #3', address: 'Some Address 3', city: 'London' },
        { uuid: 4, name: 'Name #4', address: 'Address 6', city: 'Milan' }
    ];
    const container = shallow(
        <Datasheet
            columns={[
                { name: 'name', header: 'Name' },
                { name: 'address', header: 'Address' },
                { name: 'city', header: 'City' }
            ]}
            dataKeyName="uuid"
            data={data}
        />
    );

    const dataRows = container.find('tbody').find('tr');
    expect(dataRows).toHaveLength(4);

    dataRows.forEach((row, idx) => {
        expect(row.childAt(0).text()).toEqual(data[idx].name);
        expect(row.childAt(1).text()).toEqual(data[idx].address);
        expect(row.childAt(2).text()).toEqual(data[idx].city);
    });
});

it('renders the given data with custom col function', () => {
    const data = [
        { id: 1, name: 'Name #1', address: 'Random Address 1', city: 'Baku' },
        { id: 2, name: 'Name #2', address: 'Address 2', city: 'NYC' },
        { id: 3, name: 'Name #3', address: 'Some Address 3', city: 'London' },
        { id: 4, name: 'Name #4', address: 'Address 6', city: 'Milan' }
    ];

    const renderFn = row => (
        <>
            <button className="edit" id={`edit-${row.id}`} type="button">
                Edit {row.id}
            </button>
            <button className="delete" id={`delete-${row.id}`} type="button">
                Delete {row.id}
            </button>
        </>
    );

    const container = shallow(
        <Datasheet
            columns={[
                { name: 'name', header: 'Name' },
                { name: 'address', header: 'Address' },
                { name: 'city', header: 'City' },
                { name: 'actions', header: 'Actions', renderFn }
            ]}
            data={data}
        />
    );

    const dataRows = container.find('tbody').find('tr');
    expect(dataRows).toHaveLength(4);

    dataRows.forEach((row, idx) => {
        expect(row.childAt(0).text()).toEqual(data[idx].name);
        expect(row.childAt(1).text()).toEqual(data[idx].address);
        expect(row.childAt(2).text()).toEqual(data[idx].city);

        const colActions = row.childAt(3);

        const editButton = colActions.find('.edit');
        expect(editButton).toHaveLength(1);
        expect(editButton.prop('id')).toEqual(`edit-${data[idx].id}`);
        expect(editButton.text()).toEqual(`Edit ${data[idx].id}`);

        const deleteButton = colActions.find('.delete');
        expect(deleteButton).toHaveLength(1);
        expect(deleteButton.prop('id')).toEqual(`delete-${data[idx].id}`);
        expect(deleteButton.text()).toEqual(`Delete ${data[idx].id}`);
    });
});

it('renders data with custom class function', () => {
    const data = [
        { id: 1, name: 'Name #1', address: 'Random Address 1', city: 'Baku', primary: true },
        { id: 2, name: 'Name #2', address: 'Address 2', city: 'NYC', primary: true },
        { id: 3, name: 'Name #3', address: 'Some Address 3', city: 'London', primary: false },
        { id: 4, name: 'Name #4', address: 'Address 6', city: 'Milan' }
    ];

    const rowClassFn = row => {
        if (row.primary) {
            return 'is-primary';
        } else {
            return null;
        }
    };

    const container = shallow(
        <Datasheet
            columns={[
                { name: 'name', header: 'Name' },
                { name: 'address', header: 'Address' },
                { name: 'city', header: 'City' }
            ]}
            data={data}
            rowClassFn={rowClassFn}
        />
    );

    const dataRows = container.find('tbody').find('tr');
    expect(dataRows).toHaveLength(4);

    dataRows.forEach((row, idx) => {
        if (data[idx].primary) {
            expect(row.hasClass('is-primary')).toBeTruthy();
        } else {
            expect(row.hasClass('is-primary')).toBeFalsy();
        }
    });
});

it('renders loading state if isLoading = true', () => {
    const data = [
        { id: 1, name: 'Name #1', address: 'Random Address 1', city: 'Baku', primary: true },
        { id: 2, name: 'Name #2', address: 'Address 2', city: 'NYC', primary: true },
        { id: 3, name: 'Name #3', address: 'Some Address 3', city: 'London', primary: false },
        { id: 4, name: 'Name #4', address: 'Address 6', city: 'Milan' }
    ];
    const container = shallow(
        <Datasheet
            columns={[
                { name: 'name', header: 'Name' },
                { name: 'address', header: 'Address' },
                { name: 'city', header: 'City' }
            ]}
            data={data}
            isLoading={true}
        />
    );

    const loadingRow = container.find('tbody tr');
    expect(loadingRow).toHaveLength(1);
    expect(loadingRow.hasClass(styles.loadingRow)).toBeTruthy();

    const loadingCell = loadingRow.find('td');
    expect(loadingCell.prop('colSpan')).toEqual(3);
});
