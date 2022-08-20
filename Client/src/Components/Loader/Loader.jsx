import React from 'react'
import './Loader.scss'

function Loader() {
  return (
    <>
      <div className="loader">
        <div className="loading">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="loading_text">Loading please wait.....</div>
        </div>
      </div>
    </>
  );
}

export default Loader
