import React, { FC } from 'react';
import Default from '../layouts/Default';

interface EditFormProps {
  place: {
    id: string;
    name: string;
  };
}

const EditForm: FC<EditFormProps> = ({ place }) => {
  return (
    <Default>
      <main>
        <h1>Add a New Place</h1>
        <form method='POST' action={`/places/${place.id}?_method=PUT`}>
          <div className='form-group'>
            <label htmlFor='name'>Place Name</label>
            <input className='form-control' id='name' name='name' value={place.name} required />
          </div>
          <div className='form-group'>
            <label htmlFor='pic'>Place Picture</label>
            <input className='form-control' type='url' id='pic' name='pic' />
          </div>
          <div className='form-group'>
            <label htmlFor='city'>City</label>
            <input className='form-control' id='city' name='city' />
          </div>
          <div className='form-group'>
            <label htmlFor='state'>State</label>
            <input className='form-control' id='state' name='state' />
          </div>
          <div className='form-group'>
            <label htmlFor='cuisines'>Cuisines</label>
            <input className='form-control' id='cuisines' name='cuisines' />
          </div>
          <input className='btn btn-primary' type='submit' value='Submit' />
        </form>
      </main>
    </Default>
  );
};

export default EditForm;