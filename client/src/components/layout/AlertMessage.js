import React from 'react';

import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({ info }) => {
    return info === null ? null : (
        <Alert variant={info.type} className='mb-4'>
            {info.message}
        </Alert>
    );
};

export default AlertMessage;
