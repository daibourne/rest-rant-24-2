import React, { FC } from 'react';
import Default from '../layouts/Default';

interface Comment {
    id: number;
    author: string;
    rant: boolean;
    stars: number;
    content: string;
}

interface Place {
    id: number;
    name: string;
    city: string;
    state: string;
    cuisines: string;
    pic: string;
    comments: Comment[];
    showEstablished: () => string;
}

interface ShowProps {
    place: Place;
}

const Show: FC<ShowProps> = ({ place }) => {
    const cuisinesBadges = place.cuisines.split(',').map((cuisine: string) => {
        return (
            <span key={cuisine} className='badge rounded-pill text-bg0info me-2'>
                {cuisine}
            </span>
        );
    });

    let comments = (
        <h3 className='inactive'>No Comments yet!</h3>
    )
    let rating = (
        <h3 className='inactive'>Not yet rated</h3>
    )
    if (place.comments.length) {
        let sumRatings = place.comments.reduce((tot: number, c: Comment) => {
            return tot + c.stars
        }, 0);
        let averageRating = Math.round(sumRatings / place.comments.length)
        let stars = ''
        for (let i = 0; i < averageRating; i++) {
            stars += '*'
        }
        rating = (
            <h3>
            {stars} stars
            </h3>
        )
    }
    if (place.comments.length > 0) {
        comments = place.comments.map((comment: Comment) => {
            return (
                <div key={comment.id} className='card mb-3'>
                    <div className='card-body'>
                        <h5 className='card-title'>{comment.author}</h5>
                        <h6 className='card-subtitle mb-2 text-muted'>
                            {comment.rant ? 'Rant 😡' : 'Rave 🤩'}
                        </h6>
                        <h6 className='card-subtitle mb-2 text-muted'>
                            Rating: {comment.stars} stars
                        </h6>
                        <p className='card-text'>{comment.content}</p>
                    </div>
                </div>
            );
        });
    }

    return (
        <Default>
            <main className='container'>
                <div className='row align-items-start'>
                    <div className='col'>
                        <img src={place.pic} alt={place.name} />
                    </div>
                    <div className='col'>
                    <h1>{place.name}</h1>
                    <p>
                        Located at: {place.city},  {place.state}
                    </p>
                    <p>{cuisinesBadges}</p>
                    </div>
                </div>
                <h3>Located in {place.city}, {place.state}</h3>
                <h3>
                    {place.showEstablished()}
                </h3>
                <h4>
                    Serving {place.cuisines}
                </h4>
                <div className='row align-items-center'>
                    <div className='col'>
                        <a href={`/places/${place.id}/edit`} className='btn btn-warning'>
                            Edit
                        </a>
                        <form action={`/places/${place.id}?_method=DELETE`} method='POST'>
                            <button type='submit' className='btn btn-danger'>
                                Delete
                            </button>
                        </form>
                    </div>
                    <h2>Comments</h2>
                    {comments}
                    <form action={`/places/${place.id}/comments`} method='POST'>
                    <div className='mb-3'>
                        <label htmlFor='author'>Author</label>
                        <input type='text' name='author' id='author' className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='rant'>
                            Rant{' '}
                            <input type='checkbox' name='rant' id='rant' className='checkbox' />
                        </label>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='stars'>Star Rating</label>
                        <input
                            type='number'
                            step={0.5}
                            name='stars'
                            id='stars'
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='content'>Content</label>
                        <input
                            type='text'
                            name='content'
                            id='content'
                            className='form-control'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <button type='submit' className='btn btn-primary'>
                            <i className='bi bi-plus-circle-fill'></i> Add Comment
                        </button>
                    </div>
                </form>
                </div>
            </main>
        </Default>
    );
};

export default Show;