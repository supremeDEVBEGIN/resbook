import React from 'react';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <>
      <Navbar />

      <div className="container mt-3 ">
        <div>
          <h1>Resbook</h1>
          <h2>โปรโมชั่นของร้าน</h2>
        </div>
        <div>
          <div className="card mb-3 bg-transparent">
            <img src="pro1.jpg" className="card-img-top" alt="รูปภาพ1" />
            <div className="card-body">
              <h5 className="card-title">Happy Hour</h5>
              <p className="card-text">เนื้อหา Card 1 ที่คุณต้องการแสดง</p>
            </div>
          </div>
          <div className="card mb-3 bg-transparent">
            <img src="pro2.jpg" className="card-img-top" alt="รูปภาพ1" />
            <div className="card-body">
              <h5 className="card-title">Happy Hour Saturday</h5>
              <p className="card-text">เนื้อหา Card 1 ที่คุณต้องการแสดง</p>
            </div>
          </div>
          <div className="card mb-3 bg-transparent">
            <img src="pro3.jpg" className="card-img-top" alt="รูปภาพ1" />
            <div className="card-body">
              <h5 className="card-title">Beer Infinity</h5>
              <p className="card-text">เนื้อหา Card 1 ที่คุณต้องการแสดง</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
