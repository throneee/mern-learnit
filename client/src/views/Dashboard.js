import React, { useEffect, useContext } from 'react';
import { PostContext } from '../contexts/PostContext';
import { AuthContext } from '../contexts/AuthContext';
import SinglePost from '../components/posts/SinglePost';
import AddPostModal from '../components/posts/AddPostModal';
import UpdatePostModal from '../components/posts/UpdatePostModal';

import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { PlusCircleFill } from 'react-bootstrap-icons';

const Dashboard = () => {
    // 1. State
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);

    const {
        postState: { postLoading, posts, post },
        readPosts,
        setShowAddPostModal,
        showToast: { show, message, type },
        setShowToast,
    } = useContext(PostContext);

    useEffect(() => {
        readPosts();
    }, []);

    // 2. Render body
    let body = null;

    if (postLoading) {
        body = (
            <div className='text-center'>
                <Spinner
                    animation='border'
                    variant='info'
                    className='my-5'></Spinner>
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center m-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>

                    <Card.Body>
                        <Card.Title>Welcome to LearnIT</Card.Title>
                        <Card.Text>
                            Click the button below to create your first skill to
                            learn
                        </Card.Text>
                        <Button
                            variant='primary'
                            onClick={setShowAddPostModal.bind(this, true)}>
                            LearnIt!
                        </Button>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mx-auto my-3'>
                    {posts.map((post) => {
                        return (
                            <Col key={post._id} className='my-2'>
                                <SinglePost post={post}></SinglePost>
                            </Col>
                        );
                    })}
                </Row>

                {/* Create New Post */}
                <OverlayTrigger
                    placement='left'
                    overlay={<Tooltip>Add new things to learn!</Tooltip>}>
                    <Button
                        className='btn-floating bg-success d-flex justify-content-center align-items-center p-4 rounded-circle'
                        onClick={setShowAddPostModal.bind(this, true)}>
                        <PlusCircleFill></PlusCircleFill>
                    </Button>
                </OverlayTrigger>
            </>
        );
    }

    // 3. Return
    return (
        <>
            {body}
            <AddPostModal></AddPostModal>
            {post !== null && <UpdatePostModal></UpdatePostModal>}
            <Toast
                show={show}
                style={{
                    position: 'fixed',
                    top: '10%',
                    right: '10px',
                }}
                className={`bg-${type} text-white`}
                onClose={setShowToast.bind(this, {
                    show: false,
                    message: '',
                    type: null,
                })}
                delay={3000}
                autohide>
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </>
    );
};

export default Dashboard;
