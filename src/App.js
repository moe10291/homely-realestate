
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword';
import Profile from './Components/Profile';
import Offers from './Components/Offers';
import Header from './Components/Header';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Components/PrivateRoute';
import CreateListing from './Components/CreateListing';


function App() {
  return (
    <div className="App">
          <BrowserRouter>
          <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/sign-up' element={<Signup/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />

      <Route path="/profile" element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>} />
      </Route>

      <Route path='/offers' element={<Offers/>} />
      <Route path='/create-listing' element={<CreateListing/>} />
    </Routes>
</BrowserRouter>

<ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
{/* Same as */}
<ToastContainer />
    </div>
  );
}

export default App;
