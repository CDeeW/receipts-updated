import React from 'react';

const Nav = ({ createAddModal }) => {
  return (
    <div className='nav-container'>
      <div className='nav'>
        <h1>Receipts</h1>
        <button onClick={() => createAddModal()}>Create Receipt</button>
      </div>
    </div>
  );
};

export default Nav;
