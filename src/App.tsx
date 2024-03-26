import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import EventCreationForm from './components/EventCreationForm';

const App = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/eventCreation' element={<EventCreationForm/>} />
          </Routes>
        </BrowserRouter>
    );
};

export default App;
