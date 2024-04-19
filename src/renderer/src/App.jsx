// import Versions from './components/Versions'
import { useEffect, useRef } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Clock from './pages/Clock/Clock.jsx';
import Options from './pages/Options/Options.jsx';
import heartbeat from '@renderer/utils/heartbeat';
import useGlobalStore from '@renderer/store/index.js';
import '@renderer/utils/Drag.js';

function App() {
  // const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  const mouseEnter = useRef();
  const mouseLeave = useRef();
  const changeIsShowBtn = useGlobalStore((state) => state.changeIsShowBtn);

  mouseEnter.current = () => {
    changeIsShowBtn(true);
  }

  mouseLeave.current = () => {
    changeIsShowBtn(false);
  }

  useEffect(() => {
    heartbeat.start();
    document.documentElement.addEventListener('mouseenter', mouseEnter.current, false);
    document.documentElement.addEventListener('mouseleave', mouseLeave.current, false);
    return () => {
      heartbeat.stop();
      document.documentElement.removeEventListener('mouseenter', mouseEnter.current, false);
      document.documentElement.removeEventListener('mouseleave', mouseLeave.current, false);
    };
  },
  []);
  return <HashRouter >
    <Routes>
      <Route path="/clock" element={<Clock />} />
      <Route path="/options" element={<Options />} />
    </Routes>
  </HashRouter>
}

export default App;

