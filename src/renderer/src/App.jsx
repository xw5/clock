import Versions from './components/Versions'
import { HashRouter, Routes, Route } from "react-router-dom";
import Normal from './pages/Normal/Normal.jsx';
import Options from './pages/Options.jsx';

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return <HashRouter >
    <Routes>
      <Route path="/normal" element={<Normal initialValue={100} />} />
      <Route path="/options" element={<Options initialValue={101} />} />
    </Routes>
  </HashRouter>
}

export default App

