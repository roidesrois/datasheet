import React from 'react';
import { TextInput, Form, DatePicker, SelectBox, SubmitButton } from '../../components/Form';
import { object, string } from 'yup';
import { Button } from '../../components/SexyButton';
import { func, bool } from 'prop-types';
import { Card } from '../../components/Card';

import { Row } from '../../components/Grid';

import styles from './user.module.scss';
import { PaddedContent } from '../../components/PaddedContent';

const AddEditUser = ({ closeModal, action, user, edit }) => {
    const handleSubmit = data => {
        action(data);
    };

    return (
        <div className={styles.container}>
            <Card className={styles.modal}>
                <PaddedContent>
                    <h1>{!edit ? 'Add new user' : 'Edit user'}</h1>
                    <Form
                        onSubmit={handleSubmit}
                        initialState={{
                            first_name: edit ? user.first_name : '',
                            last_name: edit ? user.last_name : '',
                            gender: edit ? user.gender : '',
                            dob: edit ? user.dob : '',
                            email: edit ? user.email : '',
                            phone: edit ? user.phone : '',
                            website: edit ? user.website : '',
                            address: edit ? user.address : '',
                            status: edit ? user.status : ''
                        }}
                        schema={object().shape({
                            first_name: string().required(),
                            last_name: string().required(),
                            gender: string().required()
                        })}
                    >
                        <Row wrap className={styles.row} responsive>
                            <div className={styles.formCol}>
                                <TextInput
                                    label="User name"
                                    name="first_name"
                                    placeholder="Enter name"
                                    type="text"
                                />
                                <TextInput
                                    label="Last name"
                                    name="last_name"
                                    placeholder="Enter last name"
                                    type="text"
                                />
                            </div>
                            <div className={styles.formCol}>
                                <SelectBox
                                    label="Gender"
                                    name="gender"
                                    placeholder="Choose gender"
                                    options={[
                                        {
                                            label: 'Male',
                                            value: 'male'
                                        },
                                        {
                                            label: 'Female',
                                            value: 'female'
                                        }
                                    ]}
                                />
                                <DatePicker label="Date of birth" name="dob" />
                            </div>
                        </Row>
                        <Row wrap className={styles.row} responsive>
                            <div className={styles.formCol}>
                                <TextInput
                                    label="E-mail"
                                    name="email"
                                    type="email"
                                    placeholder="E-mail"
                                />
                                <TextInput
                                    label="Phone number"
                                    name="phone"
                                    placeholder="Enter your number"
                                    type="tel"
                                />
                            </div>
                            <div className={styles.formCol}>
                                <TextInput
                                    label="Website"
                                    name="website"
                                    placeholder="Enter website"
                                    type="text"
                                />
                                <TextInput
                                    label="Address"
                                    name="address"
                                    placeholder="Enter address"
                                    type="text"
                                />
                            </div>
                        </Row>
                        <Row wrap className={styles.row} responsive>
                            <div className={styles.formCol}>
                                <SelectBox
                                    label="Status"
                                    name="status"
                                    placeholder="Choose status"
                                    options={[
                                        {
                                            label: 'Active',
                                            value: 'active'
                                        },
                                        {
                                            label: 'Inactive',
                                            value: 'inactive'
                                        }
                                    ]}
                                />
                            </div>
                        </Row>
                        <div className={styles.footer}>
                            <Button feel="none" onClick={closeModal}>
                                Cancel
                            </Button>
                            <SubmitButton>Save</SubmitButton>
                        </div>
                    </Form>
                </PaddedContent>
            </Card>
        </div>
    );
};

AddEditUser.propTypes = {
    closeModal: func.isRequired,
    action: func.isRequired,
    edit: bool
};

AddEditUser.defaultProps = {
    edit: false
};

export default AddEditUser;
