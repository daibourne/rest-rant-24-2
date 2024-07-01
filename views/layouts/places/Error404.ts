import React, { FC } from 'react';
import Default from './layouts/Default';

const NotFound: FC = () => {
    return (
        <Default>
            <h1>404</h1>
            <main>
                <h2>Timmy not found.</h2>
                <img
                    src='/public/images/404.jpg'
                    alt='Croissant with a Croissant Family, but missing Timmy.'
                />
            </main>
        </Default>
    );
};

export default NotFound;