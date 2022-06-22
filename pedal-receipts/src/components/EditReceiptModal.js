import { useState, useEffect } from 'react';
import axios from 'axios';

const EditReceiptModal = ({
  setEditModal,
  selectedReceipt,
  receiptsArray,
  setReceiptsArray,
}) => {
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    setPrice(selectedReceipt.price);
    setName(selectedReceipt.name);
    setLocation(selectedReceipt.location);
  }, []);

  const editReceipt = async (receipt) => {
    try {
      const response = await axios.put(
        'http://localhost:8000/receipt',
        receipt
      );

      const updatedReceipt = response.data;
      console.log(JSON.stringify(receiptsArray));

      const receiptIndex = receiptsArray.findIndex(
        (receipt) => receipt._id == updatedReceipt._id
      );

      const newReceiptsArray = receiptsArray.map((receipt, index) => {
        if (index == receiptIndex) {
          return updatedReceipt;
        }

        return receipt;
      });

      setReceiptsArray(newReceiptsArray);
    } catch (err) {
      console.log(err);
    }
  };

  // When the EditReceiptModal is submitted it creates a receipt object from the values of
  // state: price, name and location and the property values _id and timestamp from the original
  // receipt as these do not change. It passes this receipt object to the editReceipt() function from App.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    const receiptId = selectedReceipt._id;
    const timestamp = selectedReceipt.timestamp;

    const receipt = {
      receiptId,
      price,
      name,
      location,
      timestamp,
    };

    setEditModal(false);
    editReceipt(receipt);
  };

  return (
    <div className='modal-wrapper'>
      <div className='modal'>
        <div className='close-icon' onClick={() => setEditModal(false)}>
          ⨉
        </div>

        {/*AuthModal Form:*/}
        <h2>Edit receipt</h2>
        <p>Fill out the form to edit the existing receipt</p>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            id='price'
            name='price'
            placeholder='price'
            // step is set to 0.01 so that the price can only have maximum of 2 decimal places
            step='0.01'
            required={true}
            // sets the default value of the input box to the selectedReceipt object's price property value
            defaultValue={selectedReceipt.price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type='text'
            id='name'
            name='name'
            placeholder='name'
            required={true}
            // sets the default value of the input box to the selectedReceipt object's name property value
            defaultValue={selectedReceipt.name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            id='location'
            name='location'
            placeholder='location'
            required={true}
            // sets the default value of the input box to the selectedReceipt object's location property value
            defaultValue={selectedReceipt.location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input className='secondary-button' type='submit' />
        </form>
        <hr />
      </div>
    </div>
  );
};

export default EditReceiptModal;
