import React from 'react';
import Button from 'react-bootstrap/Button';

const About = () => {
    return (
        <div className='text-center mt-5'>
            <h4 className='text-secondary'>Contact with me !</h4>
            <a
                href='https://www.facebook.com/profile.php?id=100013242499272'
                target='_blank'>
                <Button className='about__btn shadow'>
                    <span>Visit</span>
                </Button>
            </a>
        </div>
    );
};

export default About;
