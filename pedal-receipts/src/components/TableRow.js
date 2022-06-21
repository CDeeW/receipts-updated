import React from 'react';

const TableRow = ({ key, receipt, deleteReceipt, createEditModal }) => {
  const date = new Date(receipt.timestamp);

  return (
    <tr className='table-row' key={key}>
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
