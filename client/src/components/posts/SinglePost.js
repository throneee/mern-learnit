import React from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ActionButtons from './ActionButtons';

const SinglePost = ({ post: { _id, title, description, url, status } }) => {
    return (
        <Card
            className='shadow'
            border={
                status === 'LEARNED'
                    ? 'success'
                    : status === 'LEARNING'
                    ? 'warning'
                    : 'danger'
            }
            className='border-2'>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p>{title}</p>
                            <Badge
                                pill
                                bg={
                                    status === 'LEARNED'
                                        ? 'success'
                                        : status === 'LEARNING'
                                        ? 'warning'
                                        : 'danger'
                                }>
                                {status}
                            </Badge>
                        </Col>

                        <Col className='text-end'>
                            <ActionButtons url={url} _id={_id}></ActionButtons>
                        </Col>
                    </Row>
                </Card.Title>

                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SinglePost;
