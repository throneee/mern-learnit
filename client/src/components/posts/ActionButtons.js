import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import { PlayBtn, Pencil, Trash } from 'react-bootstrap-icons';
import { PostContext } from '../../contexts/PostContext';

const ActionButtons = ({ url, _id }) => {
    const { setShowUpdatePostModal, setShowToast, deletePost, findPost } =
        useContext(PostContext);

    const handleUpdatePost = (postId) => {
        findPost(postId);
        setShowUpdatePostModal(true);
    };

    const handleDeletePost = async (e, postId) => {
        e.preventDefault();
        const { success, message } = await deletePost(postId);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
    };

    return (
        <>
            <Button
                className='post-button bg-success'
                href={url}
                target='_blank'>
                <PlayBtn></PlayBtn>
            </Button>

            <Button
                className='post-button bg-secondary mx-2'
                onClick={handleUpdatePost.bind(this, _id)}>
                <Pencil></Pencil>
            </Button>

            <Button
                className='post-button bg-danger'
                onClick={(e) => {
                    return handleDeletePost(e, _id);
                }}>
                <Trash></Trash>
            </Button>
        </>
    );
};

export default ActionButtons;
