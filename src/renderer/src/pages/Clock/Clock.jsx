import { useEffect, useRef } from 'react';
import useGlobalStore from '@renderer/store/index.js';
import Normal from '@renderer/components/Normal/Normal.jsx';
import heartbeat from '@renderer/utils/heartbeat';
import Flip from '@renderer/components/Flip/Flip.jsx';
import Drag from '@renderer/utils/Drag.js';

function Clock() {
  const clockstyle = useGlobalStore((state) => state.clockStyle);
  const storageUpdate = useRef(null);
  const mouseEnter = useRef();
  const mouseLeave = useRef();
  const changeIsShowBtn = useGlobalStore((state) => state.changeIsShowBtn);
  const changeClockStyle = useGlobalStore((state) => state.changeClockStyle);
  const changeIsTop = useGlobalStore((state) => state.changeIsTop);
  const chagneCounts = useGlobalStore((state) => state.chagneCounts);
  const changeSize = useGlobalStore((state) => state.changeSize);
  const changeTipsDelay = useGlobalStore((state) => state.changeTipsDelay);
  const changeCardColor = useGlobalStore((state) => state.changeCardColor);
  const changeTimeColor = useGlobalStore((state) => state.changeTimeColor);
  const changeDataColor = useGlobalStore((state) => state.changeDataColor);
  const changeTipsColor = useGlobalStore((state) => state.changeTipsColor);
  const changeTipss = useGlobalStore((state) => state.changeTipss);

  mouseEnter.current = () => {
    changeIsShowBtn(true);
  }

  mouseLeave.current = () => {
    changeIsShowBtn(false);
  }

  useEffect(() => {
    heartbeat.start();
    const clockWrap = document.querySelector('#clockWrap');
    new Drag(clockWrap);
    clockWrap.addEventListener('mouseenter', mouseEnter.current, false);
    clockWrap.addEventListener('mouseleave', mouseLeave.current, false);
    return () => {
      heartbeat.stop();
      clockWrap.removeEventListener('mouseenter', mouseEnter.current, false);
      clockWrap.removeEventListener('mouseleave', mouseLeave.current, false);
    };
  },
  []);

  storageUpdate.current = (e) => {
    console.log('---- storageUpdate.current ----:', e);
    const { newValue, oldValue } = e;
    if (newValue === oldValue) {
      return;
    }
    const newValueO = JSON.parse(JSON.parse(newValue).globalStorage);
    const oldValueO = JSON.parse(JSON.parse(oldValue).globalStorage);
    console.log('---- newValueO ----:', typeof newValueO,  Object.keys(newValueO));
    console.log('---- oldValueO ----:', oldValueO);
    Object.keys(newValueO).forEach((key) => {
      if (newValueO[key] !== oldValueO[key]) {
        const nowVal = newValueO[key];
        console.log('---- storageUpdate.current ----:', key, nowVal);
        switch(key) {
          case 'isTop':
            changeIsTop(nowVal);
            break;
          case 'size':
            changeSize(nowVal);
            break;
          case 'clockStyle':
            changeClockStyle(nowVal);
            break;
          case 'clockType':
            changeClockType(nowVal);
            break;
          case 'counts':
            chagneCounts(nowVal);
            break;
          case 'tipsDelay':
            changeTipsDelay(nowVal);
            break;
          case 'cardColor':
            changeCardColor(nowVal);
            break;
          case 'timeColor':
            changeTimeColor(nowVal);
            break;
          case 'dataColor':
            changeDataColor(nowVal);
            break;
          case 'tipsColor':
            changeTipsColor(nowVal);
            break;
          case 'tipss':
            changeTipss(nowVal);
            break;
          default:
            break;
        }
      }
    })
  }

  useEffect(() => {
    console.log('---- clock clockstyle ----:', clockstyle);
    window.addEventListener("storage", storageUpdate.current, false);
    return () => {
      window.removeEventListener("storage", storageUpdate.current, false);
    }
  }, []);

  return <div className="w-full h-screen" id="clockWrap">
    {clockstyle === 'normal' && <Normal />}
    {clockstyle === 'flip' && <Flip />}
  </div>
}

export default Clock