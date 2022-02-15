import React, { useContext, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddPostModal = () => {
    // 1. State
    const { showAddPostModal, setShowAddPostModal, setShowToast, createPost } =
        useContext(PostContext);

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    });
    const { title, description, url } = newPost;

    // 2. Function
    const closeModal = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN',
        });
        setShowAddPostModal(false);
    };

    const onChangeNewPostForm = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const handleAddPost = async (e) => {
        e.preventDefault();
        const { success, message } = await createPost(newPost);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
        closeModal();
    };

    // 3. Return
    return (
        <Modal show={showAddPostModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleAddPost}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            required
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeNewPostForm}></Form.Control>
                        <Form.Text id='title-help' muted>
                            Required
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='my-3'>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Description'
                            name='description'
                            value={description}
                            onChange={onChangeNewPostForm}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Your Link'
                            name='url'
                            value={url}
                            onChange={onChangeNewPostForm}></Form.Control>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='danger' onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant='success' type='submit'>
                        LearnIT!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddPostModal;
