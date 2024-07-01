import React, { FC } from 'react';
import Default from '../layouts/Default';

interface Place {
    id: number;
    name: string;
    cuisines: string;
    pic: string;
    city: string;
    state: string;
}

interface IndexProps {
    places: Place[];
}

const Index: FC<IndexProps> = (data) => {
    let placesFormatted = data.places.map((place, index) => {
        return (
            <div key={place.name} className='col-sm-6'>
                <h2>
                    <a href={`/places/${place.id}`}>{place.name}</a>
                </h2>
                <p>{place.cuisines}</p>
                <img src={place.pic} alt={place.name} />
                <p className='text-center'>
                    Located in {place.city}, {place.state}
                </p>
            </div>
        );
    });

    return (
        <Default>
            <main>
                <h1>Places to Rant or Rave About</h1>
                <div className='row'>{placesFormatted}</div>
            </main>
        </Default>
    );
};

export default Index;