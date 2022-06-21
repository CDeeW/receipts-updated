import { useState } from 'react';
import axios from 'axios';

const AddReceiptModal = ({ setShowModal, addReceipt }) => {
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  // When the AddReceiptModal is submitted it creates a receipt object from the values of
  // state: price, name and location and passes it into the addReceipt() function from App.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    const receipt = { price, name, location };
    addReceipt(receipt);
  };

  return (
    <div className='modal-wrapper'>
      <div className='modal'>
        <div className='close-icon' onClick={() => setShowModal(false)}>
          ⨉
        </div>
        <h2>Add receipt</h2>
        <p>Fill out the form to create a new receipt'</p>
        <form onSubmit={handleSubmit}>
          {/* price input */}
          <input
            type='number'
            id='price'
            name='price'
            placeholder='price'
            step='0.01'
            required={true}
            defaultValue={''}
            // when the input value for price is changed, it sets the price state to the new value
            onChange={(e) => setPrice(e.target.value)}
          />
          {/* name input */}
          <input
            type='text'
            id='name'
            name='name'
            placeholder='name'
            required={true}
            defaultValue={''}
            // when the input value for name is changed, it sets the name state to the new value
            onChange={(e) => setName(e.target.value)}
          />
          {/* location input */}
          <input
            type='text'
            id='location'
            name='location'
            placeholder='location'
            required={true}
            defaultValue={''}
            // when the input value for location is changed, it sets the location state to the new value
            onChange={(e) => setLocation(e.target.value)}
          />

          <input className='secondary-button' type='submit' />
        </form>
        <hr />
      </div>
    </div>
  );
};

export default AddReceiptModal;
