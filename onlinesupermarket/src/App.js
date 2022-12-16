import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';
import Home from './Home';
import Alogin from './ALogin';
import Items from './Items';
import AddProduct from './AddProduct';
import AllPro from './AllPro';
import Admin from './Admin';



function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/adminlogin' element={<Alogin />} />
                <Route path='/Items' element={<Items />} />
                <Route path='/AddProduct' element={<AddProduct />} />
                <Route path='/AllProducts' element={<AllPro />} />
                <Route path='/Adminhome' element={<Admin />} />
            </Routes>
        </Router>
    )
}
export default App;
