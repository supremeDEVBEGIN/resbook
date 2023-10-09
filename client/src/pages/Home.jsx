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
              <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem laborum eligendi qui provident laudantium fuga error amet doloribus inventore fugit nisi laboriosam nulla nihil, ea explicabo suscipit ducimus blanditiis excepturi!</p>
            </div>
          </div>
          <div className="card mb-3 bg-transparent">
            <img src="pro2.jpg" className="card-img-top" alt="รูปภาพ1" />
            <div className="card-body">
              <h5 className="card-title">Happy Hour Saturday</h5>
              <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci obcaecati, aperiam iure atque amet animi officiis corrupti! Doloremque culpa nihil optio labore, a obcaecati dignissimos ipsa, libero voluptates itaque cum.</p>
            </div>
          </div>
          <div className="card mb-3 bg-transparent">
            <img src="pro3.jpg" className="card-img-top" alt="รูปภาพ1" />
            <div className="card-body">
              <h5 className="card-title">Beer Infinity</h5>
              <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis iste minus dolorum odio delectus doloribus tenetur iure nulla nemo cupiditate, minima, laborum dolor nobis ducimus quos, eveniet repellat exercitationem molestias.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
