const React = require('react');
const Default = require('./layouts/Default');

const Home = () => {
    return (
        <Default>
            <main>
                <h1>HOME</h1>
                <div>
                    <img
                        src='https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                        alt='Croissant with a Croissant Family'
                    />
                </div>
                <a href='/places'>
                    <button className='btn btn-primary'>Places Page</button>
                </a>
            </main>
        </Default>
    );
};

module.exports = Home;