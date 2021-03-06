import Nav from './components/Nav';
import AddReceiptModal from './components/AddReceiptModal';
import EditReceiptModal from './components/EditReceiptModal';
import TableRow from './components/TableRow';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [receiptsArray, setReceiptsArray] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // on first render of App, it will call getReceipts() function
  useEffect(() => {
    getReceipts();
  }, []);

  // Creates a get request to the backend to get all the receipt objects in the database and stores these in the receiptsArray state
  const getReceipts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/receipts');
      setReceiptsArray(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Sets the state of editModal to false and addModal to true so App rerenders and opens the AddReceiptModal
  const createAddModal = async () => {
    setEditModal(false);
    setAddModal(true);
  };

  // Sets the state of selectedReceipt to be the receipt object passed in, editModal to false and addModal
  // to true so App rerenders and opens the EditReceiptModal
  const createEditModal = async (receipt) => {
    setSelectedReceipt(receipt);
    setAddModal(false);
    setEditModal(true);
  };

  return (
    receiptsArray && (
      <div className='App'>
        <Nav createAddModal={createAddModal} />

        {addModal && (
          <AddReceiptModal
            setShowModal={setAddModal}
            receiptsArray={receiptsArray}
            setReceiptsArray={setReceiptsArray}
          />
        )}

        {editModal && (
          <EditReceiptModal
            setEditModal={setEditModal}
            selectedReceipt={selectedReceipt}
            receiptsArray={receiptsArray}
            setReceiptsArray={setReceiptsArray}
          />
        )}

        {/* Table */}
        <table className='table-container'>
          <tbody>
            <tr>
              <th>Price</th>
              <th>Name</th>
              <th>Location</th>
              <th>Created On</th>
            </tr>
          </tbody>

          {/* maps every receipt object in the receiptsArray to a TableRow component and passes in the receipt to each one as a prop */}
          {receiptsArray.map((receipt, _index) => (
            <tbody key={_index}>
              <TableRow
                receipt={receipt}
                createEditModal={createEditModal}
                receiptsArray={receiptsArray}
                setReceiptsArray={setReceiptsArray}
              />
            </tbody>
          ))}
        </table>
      </div>
    )
  );
};

export default App;
