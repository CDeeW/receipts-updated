import React from 'react';
import axios from 'axios';

const TableRow = ({
  receipt,
  createEditModal,
  receiptsArray,
  setReceiptsArray,
}) => {
  const date = new Date(receipt.timestamp);

  // Creates a delete request to the backend to delete an existing receipt in the database and updates the receiptsArray
  const deleteReceipt = async (receiptId) => {
    try {
      const response = await axios.delete('http://localhost:8000/receipt', {
        params: { receiptId },
      });

      // gets the deletedReceiptId from the response
      const deletedReceiptId = response.data._id;

      // Removes the receipt object in the receiptsArray that has the deletedReceiptId value
      const newReceiptsArray = receiptsArray.filter(
        (receipt) => receipt._id != deletedReceiptId
      );

      // sets the receiptsArray to this newReceiptsArray causing the App to rerender and update the table.
      setReceiptsArray(newReceiptsArray);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr className='table-row'>
      {/* if any of the <td> elements are clicked, then the createEditModal() function is called and the receipt is passed into it */}
      <td onClick={() => createEditModal(receipt)}>{`£${receipt.price}`}</td>
      <td onClick={() => createEditModal(receipt)}>{receipt.name}</td>
      <td onClick={() => createEditModal(receipt)}>{receipt.location}</td>
      <td onClick={() => createEditModal(receipt)}>{date.toLocaleString()}</td>
      {/* When the close-icon is clicked, then the deleteReceipt() function is called */}
      <th className='close-icon' onClick={() => deleteReceipt(receipt._id)}>
        ⨉
      </th>
    </tr>
  );
};

export default TableRow;
