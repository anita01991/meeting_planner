import  'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Room from './Components/Pages/Room';
import Users from './Components/Pages/Users';
import Navbar from './Components/UI/Navbar';




function App() {
  return (
    <div>
    
      
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        
        <Route path='/roomcreation' element={<Room></Room>}></Route>
        <Route path='/userpage' element={<Users></Users>}></Route>
        
      </Routes>
      </BrowserRouter>
   
  
   
    </div>
  );
}

export default App;
