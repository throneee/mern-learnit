import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdatePostModal = () => {
    // 1. State
    const {
        postState: { post },
        showUpdatePostModal,
        setShowUpdatePostModal,
        setShowToast,
        updatePost,
    } = useContext(PostContext);

    const [updatedPost, setUpdatedPost] = useState(post);
    useEffect(() => {
        setUpdatedPost(post);
    }, [post]);
    const { title, description, url, status } = updatedPost;

    // 2. Function
    const closeModal = () => {
        setUpdatedPost(post);
        setShowUpdatePostModal(false);
    };

    const onChangeUpdatePostForm = (e) => {
        setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
    };

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        const { success, message } = await updatePost(updatedPost);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
        closeModal();
    };

    // 3. Return
    return (
        <Modal show={showUpdatePostModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleUpdatePost}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            required
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeUpdatePostForm}></Form.Control>
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
                            onChange={onChangeUpdatePostForm}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Your Link'
                            name='url'
                            value={url}
                            onChange={onChangeUpdatePostForm}></Form.Control>
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Control
                            as='select'
                            value={status}
                            name='status'
                            onChange={onChangeUpdatePostForm}>
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </Form.Control>
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

export default UpdatePostModal;
