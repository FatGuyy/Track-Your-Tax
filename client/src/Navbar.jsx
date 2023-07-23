// import React from 'react';
// import './Navbar.css';

// const Banner = () => {
//   return (
//     <div className="banner">
//       <h1>TrackMyTaxMoney</h1>
//       <nav>
//         <ul>
//           <li><a href="#">Home</a></li>
//           <li><a href="#">About</a></li>
//           <li><a href="#">Services</a></li>
//           <li><a href="#">Contact</a></li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Banner;
import React from 'react';
import { Link } from 'react-router-dom';
import  "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
    <h1 className="company-name">Track My Tax</h1>
      <div className="nav-content">
        <ul className="nav-list">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/central-gov">Central Gov</Link></li>
          <li><Link to="/state-gov">State Gov</Link></li>
          <li><Link to="/district-gov">District Gov</Link></li>
        </ul>
        {/* <div className="nav-dropdown">
          <select>
            <option value="">Select Gov Entity</option>
            <option value="/central-gov">Central Gov</option>
            <option value="/state-gov">State Gov</option>
            <option value="/district-gov">District Gov</option>
          </select>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
