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

  // the price, name and location state are initially set to the corresponding values from the selectedReceipt
  useEffect(() => {
    setPrice(selectedReceipt.price);
    setName(selectedReceipt.name);
    setLocation(selectedReceipt.location);
  }, []);

  // Creates a put request to the backend to edit an existing receipt in the database and updates the receiptsArray
  const editReceipt = async (receipt) => {
    try {
      const response = await axios.put(
        'http://localhost:8000/receipt',
        receipt
      );

      // Gets the updated receipt from the response
      const updatedReceipt = response.data;

      // Finds the index of the receipt in the receiptsArray that has the id
      const receiptIndex = receiptsArray.findIndex(
        (receipt) => receipt._id == updatedReceipt._id
      );

      // Creates array that updates the receipt in the receiptsArray by using the receiptIndex
      const newReceiptsArray = receiptsArray.map((receipt, index) => {
        if (index == receiptIndex) {
          return updatedReceipt;
        }

        return receipt;
      });

      // Assigns the receiptsArray to this newReceiptsArray causing the App to rerender and update table
      setReceiptsArray(newReceiptsArray);
    } catch (err) {
      console.log(err);
    }
  };

  // When the EditReceiptModal is submitted it creates a receipt object from the values of
  // state: price, name and location and the property values _id and timestamp from the original
  // receipt as these do not change. It passes this receipt object to the editReceipt() function
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

    editReceipt(receipt);
    setEditModal(false);
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
            type='number'
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
