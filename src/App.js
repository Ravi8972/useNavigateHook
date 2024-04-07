import './App.css';
import Forms from './component/Form';
import Thankyou from './component/Thankyou';
import { Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="User-Form-App">
       <Routes>
        <Route path='/' element={<Forms />}/>
        <Route path='/Thankyou' element ={<Thankyou/>}/>
       </Routes>
    </div>
  );
}

export default App;
