import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { LayoutApp } from './componets/Layout';
import { Login } from './componets/Login';

import { TabEntry } from './componets/TabEntry';
import { TabletMaster } from './componets/TabletMaster';
import Protected from './store/Protected';

function App() {
  const { isAuthenticate } = useSelector((state) => state.application);
  console.log(isAuthenticate);
  const navigate = useNavigate()
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<Protected isAuthenticate={isAuthenticate} />}>

          <Route path='/Layout' element={<LayoutApp />}>

            <Route path='/Layout/Tab' element={<TabEntry />} />

            <Route path='/Layout/Master' element={<TabletMaster />} />

          </Route>
        </Route>


      </Routes>
    </div>
  );
}

export default App;
