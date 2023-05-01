
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword';
import Profile from './Components/Profile';
import Offers from './Components/Offers';
import Header from './Components/Header';
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
      <Route path='/profile' element={<Profile/>} />
      <Route path='/offers' element={<Offers/>} />
    </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
