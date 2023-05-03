import React, { useState, useEffect } from 'react';

const Crypto = (props) => {
  const [rows, setRows] = useState([{}]);

  useEffect(() => {
    // fetch from offline/redux?
  }, []);

  return (
    <>
      {rows.map((row, index) => {
        return <div key={index}>hey</div>;
      })}

      <div>
        <button onClick={() => setRows(rows.concat({}))}>+</button>
      </div>
    </>
  );
};

export default Crypto;
