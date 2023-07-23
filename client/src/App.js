// import React from 'react';
// import "./App.css"
// import Navbar from './Navbar';
// import CentralGov from './CentralGov';
// import StateGov from './StateGov';
// import DistrictGovernmentPage from './DistrictGov';

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <CentralGov />
//         <StateGov />
//         <DistrictGovernmentPage />
//       </div>
//     </>
//   );
// };

// export default App;
import React from 'react';
import "./App.css";
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Use 'Switch' from 'react-router-dom'
import CentralGov from './CentralGov';
import StateGov from './StateGov';
import DistrictGov from './DistrictGov';
import home from './home';


const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <div className="container">
          <Switch>
          <Route path="/home" component={home} />
            <Route exact path="/" component={CentralGov} />
            <Route path="/central-gov" component={CentralGov} />
            <Route path="/state-gov" component={StateGov} />
            <Route path="/district-gov" component={DistrictGov} />
          </Switch>
        </div>
      </>
    </Router>
  );
};

export default App;
