import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Room from './Components/Pages/Room';
import Users from './Components/Pages/Users';
import Navbar from './Components/UI/Navbar';
import Package from './Components/Pages/packages';
import Client from './Components/Pages/Client';
import ClientPackage from './Components/Pages/ClientPackage';
import Login from './Components/Pages/login';
import Booking from './Components/Pages/Booking';




function App() {
  return (
    <div>


      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          {/* <Route path='/' element={ }></Route> */}
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/roomcreation' element={<Room></Room>}></Route>
          <Route path='/userpage' element={<Users></Users>}></Route>
          <Route path='/package' element={<Package></Package>}></Route>
          <Route path='/client' element={<Client></Client>}></Route>
          <Route path='clientpackage' element={<ClientPackage></ClientPackage> }></Route>
          <Route path='/booking' element={<Booking></Booking>}></Route>
          
        </Routes>
      </BrowserRouter>



    </div>
  );
}

export default App;
