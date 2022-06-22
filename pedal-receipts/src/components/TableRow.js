import React from 'react';
import axios from 'axios';

const TableRow = ({
  _index,
  receipt,
  createEditModal,
  receiptsArray,
  setReceiptsArray,
}) => {
  const date = new Date(receipt.timestamp);

  const deleteReceipt = async (receiptId) => {
    try {
      const response = await axios.delete('http://localhost:8000/receipt', {
        params: { receiptId },
      });

      const deleteReceiptId = response.data._id;

      const newReceiptsArray = receiptsArray.filter(
        (receipt) => receipt._id != deleteReceiptId
      );

      setReceiptsArray(newReceiptsArray);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr className='table-row' key={_index}>
      {/* if any of the <td> elements are clicked, then the createEditModal() function is called from App.js and the receipt is passed into it */}
      <td onClick={() => createEditModal(receipt)}>{`£${receipt.price}`}</td>
      <td onClick={() => createEditModal(receipt)}>{receipt.name}</td>
      <td onClick={() => createEditModal(receipt)}>{receipt.location}</td>
      <td onClick={() => createEditModal(receipt)}>{date.toLocaleString()}</td>
      {/* When the close-icon is clicked, then the deleteReceipt() function is called from App.js */}
      <div className='close-icon' onClick={() => deleteReceipt(receipt._id)}>
        ⨉
      </div>
    </tr>
  );
};

export default TableRow;
