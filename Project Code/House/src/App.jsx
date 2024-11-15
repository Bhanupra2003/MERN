import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainHomepage from './Component/Home/MainHomepage.jsx';
import Register from './Component/Home/Register.jsx';
import LoginComponent from './Component/Home/LoginComponent.jsx';
import Adminhome from './Component/Admin/Adminhome.jsx';
import Admindashboard from './Component/Admin/Admindashboard.jsx';
import Viewuser from './Component/Admin/Viewuser.jsx';
import './App.css'; // Update if necessary

import Homepage from './Component/Customer/Homepage.jsx';
import SearchBook from './Component/Customer/SearchBook.jsx';
import HouseDetail from './Component/Customer/HouseDetail.jsx';

import ViewRents from './Component/Admin/ViewRents.jsx';
import Homepages from './Component/Rent/Homepage.jsx';
import RentHistory from './Component/Customer/RentHistory.jsx';
import AddRentHouse from './Component/Rent/AddRentHouse.jsx';
import RentHouseGrid from './Component/Rent/RentHouseGrid.jsx';
import BookingTable from './Component/Rent/BookingTable.jsx';
import Registers from './Component/Rent/Register.jsx';
import ProfileView from './Component/Rent/ProfileView.jsx';
import ProfileViews from './Component/Customer/ProfileView.jsx';
import LoginComponentRents from './Component/Rent/LoginComponent.jsx';
import HouseDetails from './Component/Admin/HouseDetails.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Component/Rent/Dashboard.jsx';

import 'animate.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainHomepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginComponent />} />

          <Route path="/admin" element={<Adminhome />}>
            <Route path="dashboard" element={<Admindashboard />} />
            <Route path="viewuser" element={<Viewuser />} />
            <Route path="viewrent" element={<ViewRents />} />
            <Route path="housedetails" element={<HouseDetails />} />
          </Route>

          <Route path="/homepage" element={<Homepage />} />
          <Route path="/searchbook" element={<SearchBook />} />
          <Route path="/housedetail/:id" element={<HouseDetail />} />
          <Route path="/renthistory" element={<RentHistory />} />
          <Route path="/profile" element={<ProfileViews />} />

          <Route path="/rents" element={<Homepages />}>
            <Route path="addhouse" element={<AddRentHouse />} />
            <Route path="addhouse/:id" element={<AddRentHouse />} />
            <Route path="viewhouse" element={<RentHouseGrid />} />
            <Route path="booking" element={<BookingTable />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<ProfileView />} />
          </Route>
          <Route path='/rent/register' element={<Registers />} />
          <Route path='/rent' element={<LoginComponentRents />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
