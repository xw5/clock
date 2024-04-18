import Versions from './components/Versions'
import { HashRouter, Routes, Route } from "react-router-dom";
import Normal from './pages/Normal/Normal.jsx';
import Options from './pages/Options/Options.jsx';

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return <HashRouter >
    <Routes>
      <Route path="/normal" element={<Normal />} />
      <Route path="/options" element={<Options />} />
    </Routes>
  </HashRouter>
}

export default App

