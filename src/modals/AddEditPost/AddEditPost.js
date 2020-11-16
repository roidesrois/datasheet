import React from 'react';
import { TextInput, Form, SubmitButton, Textarea } from '../../components/Form';
import { Button } from '../../components/SexyButton';
import { object, string } from 'yup';
import { func, bool } from 'prop-types';
import { Card } from '../../components/Card';

import styles from './post.module.scss';
import { PaddedContent } from '../../components/PaddedContent';

const AddEditPost = ({ closeModal, action, post, edit }) => {
    const handleSubmit = data => {
        action(data);
    };

    return (
        <div className={styles.container}>
            <Card className={styles.modal}>
                <PaddedContent>
                    <h1>{!edit ? 'Add new post' : 'Edit post'}</h1>
                    <Form
                        onSubmit={handleSubmit}
                        initialState={{
                            title: edit ? post.title : '',
                            body: edit ? post.body : ''
                        }}
                        schema={object().shape({
                            title: string().required(),
                            body: string().required()
                        })}
                    >
                        <TextInput
                            label="Title"
                            name="title"
                            placeholder="Enter title"
                            type="text"
                        />

                        <Textarea label="Body" name="body" placeholder="Enter body" />
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

AddEditPost.propTypes = {
    closeModal: func.isRequired,
    action: func.isRequired,
    edit: bool
};

AddEditPost.defaultProps = {
    edit: false
};

export default AddEditPost;
