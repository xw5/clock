import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { timestampToTime, secondsToTime } from '@renderer/utils/common.js';
import TextRolling from '@renderer/components/TextRolling/TextRolling.jsx';
import DateStr from '@renderer/components/DateStr/DateStr.jsx';
import heartbeat from '@renderer/utils/heartbeat';
import useGlobalStore from '@renderer/store/index.js';

import './Normal.css';

function Normal({}) {
  // const [ampm, setAmpm] = useState('');
  const [nowVal, setNowVal] = useState([0,0,0,0,0,0]);
  const [nextVal, setNextVal] = useState([0,0,0,0,0,0]);
  const [isPointAni, setIsPointAni] = useState(false);
  // const [scaleSize, setScaleSize] = useState(1);
  const size = useGlobalStore((state) => state.size);
  const counts = useGlobalStore((state) => state.counts);
  const clockType = useGlobalStore((state) => state.clockType);
  const countsRef = useRef(counts);
  const countStep = useRef(1);

  const clockContainer = useRef();
  const resizeTimer = useRef();
  
  const countTime = () => {
    console.log('---- clockType ----:', clockType);
    let timeStr = '';
    let timerNowStr = '';
    if (clockType === 'timer') {
      countsRef.current = counts;
      countStep.current = 1;
      timeStr = timestampToTime();
      const timeArr = timeStr.split(' ');
      timerNowStr = timeArr[1];
    } else if(clockType === 'count') {
      countsRef.current -= countStep.current;
      if (countsRef.current === 0) {
        countStep.current = -1;
      }
      timerNowStr = secondsToTime(countsRef.current);
    }
  
    // setAmpm(timeArr[3]);
    setNextVal(timerNowStr.replace(/:/g, '').split(''))
    setIsPointAni(true);
    setTimeout(()=>{
      setNowVal(timerNowStr.replace(/:/g, '').split(''));
      setIsPointAni(false);
    }, 550);
  }
  
  // const resizeFn = () => {
  //   const {innerWidth, innerHeight} = window;
  //   let scaleTemp = 1;
  //   if (innerWidth < innerHeight) {
  //     scaleTemp = innerHeight / 880;
  //   } else {
  //     scaleTemp = innerWidth / 880;
  //   }
  //   setScaleSize(scaleTemp > 1 ? 1 : scaleTemp);
  // };

  useEffect(() => {
    // resizeFn();
    heartbeat.add('normal', countTime);
    // window.addEventListener('resize', resizeFn, false);
    // sendSize();
    return () => {
      heartbeat.remove('normal');
      // window.removeEventListener('resize', resizeFn, false);
    };
  }, [clockType]);

  const sendSize = () => {
    const { offsetWidth, offsetHeight } = clockContainer.current;
    window.electron.ipcRenderer.send('resize', offsetWidth, offsetHeight);
    console.log('---- sendSize ----:', offsetWidth, offsetHeight);
  }

  useEffect(() => {
    clearTimeout(resizeTimer.current);
    resizeTimer.current = setTimeout(sendSize, 300);
  }, [size]);

  return (
    <div className="w-full h-screen fixed inset-0 z-50 flex flex-col justify-center items-center cursor-pointer select-none clock-wrap">
      {/* style={{transform: `scale(${scaleSize})`}} */}
    <div className="clock-container relative flex flex-col pointer-events-auto group/action" ref={clockContainer}>
      {/* 日期 星期 */}
      <DateStr />
      {/* <div className="text-[rgba(255,255,255,.26)] text-[40px] absolute bottom-0 right-[-78px]">{ ampm }</div> */}
      <div className="w-full flex flex-row items-center" style={{fontSize: size * 1.1 + 'px'}}>
        <div 
          className={"clock-item mr-[10px]" + (nowVal[0] !== nextVal[0] ? ' active' : '')} 
          style={{width: size + 'px', height: size * 1.6 + 'px', fontSize: size * 1.1 + 'px', lineHeight: size * 1.6 + 'px'}}
        >
          <div className="clock-num up up-front">{ nowVal[0] }</div>
          <div className="clock-num down down-front">{ nowVal[0] }</div>
          <div className="clock-num up up-back">{ nextVal[0] }</div>
          <div className="clock-num down down-back">{ nextVal[0] }</div>
        </div>
        <div 
          className={"clock-item" + (nowVal[1] !== nextVal[1] ? ' active' : '')}
          style={{width: size + 'px', height: size * 1.6 + 'px', fontSize: size * 1.1 + 'px', lineHeight: size * 1.6 + 'px'}}
        >
          <div className="clock-num up up-front">{ nowVal[1] }</div>
          <div className="clock-num down down-front">{ nowVal[1] }</div>
          <div className="clock-num up up-back">{ nextVal[1] }</div>
          <div className="clock-num down down-back">{ nextVal[1] }</div>
        </div>
        <div className={"separate" + (isPointAni ? ' active': '')} style={{fontSize: size / 2.5 + 'px'}}>
          <span className="separate-item"></span>
          <span className="separate-item"></span>
        </div>
        <div 
          className={"clock-item mr-[10px]" + (nowVal[2] !== nextVal[2] ? ' active' : '')}
          style={{width: size + 'px', height: size * 1.6 + 'px', fontSize: size * 1.1 + 'px', lineHeight: size * 1.6 + 'px'}}
        >
          <div className="clock-num up up-front">{ nowVal[2] }</div>
          <div className="clock-num down down-front">{ nowVal[2] }</div>
          <div className="clock-num up up-back">{ nextVal[2] }</div>
          <div className="clock-num down down-back">{ nextVal[2] }</div>
        </div>
        <div 
          className={"clock-item" + (nowVal[3] !== nextVal[3] ? ' active' : '')}
          style={{width: size + 'px', height: size * 1.6 + 'px', fontSize: size * 1.1 + 'px', lineHeight: size * 1.6 + 'px'}}
        >
          <div className="clock-num up up-front">{ nowVal[3] }</div>
          <div className="clock-num down down-front">{ nowVal[3] }</div>
          <div className="clock-num up up-back">{ nextVal[3] }</div>
          <div className="clock-num down down-back">{ nextVal[3] }</div>
        </div>
        <div className={"separate" + (isPointAni ? ' active': '')} style={{fontSize: size / 2.5 + 'px'}}>
          <span className="separate-item"></span>
          <span className="separate-item"></span>
        </div>
        <div 
          className={"clock-item mr-[10px]" + (nowVal[4] !== nextVal[4] ? ' active' : '')}
          style={{width: size + 'px', height: size * 1.6 + 'px', fontSize: size * 1.1 + 'px', lineHeight: size * 1.6 + 'px'}}
        >
          <div className="clock-num up up-front">{ nowVal[4] }</div>
          <div className="clock-num down down-front">{ nowVal[4] }</div>
          <div className="clock-num up up-back">{ nextVal[4] }</div>
          <div className="clock-num down down-back">{ nextVal[4] }</div>
        </div>
        <div 
          className={"clock-item" + (nowVal[5] !== nextVal[5] ? ' active' : '')}
          style={{width: size + 'px', height: size * 1.6 + 'px', fontSize: size * 1.1 + 'px', lineHeight: size * 1.6 + 'px'}}
        >
          <div className="clock-num up up-front">{ nowVal[5] }</div>
          <div className="clock-num down down-front">{ nowVal[5] }</div>
          <div className="clock-num up up-back">{ nextVal[5] }</div>
          <div className="clock-num down down-back">{ nextVal[5] }</div>
        </div>
      </div>
      {/* 提示 */}
      <TextRolling />
    </div>
  </div>
  )
}

export default Normal