import { useState, useEffect, useRef } from 'react'
import { timestampToTime, secondsToTime } from '@renderer/utils/common.js';
import TextRolling from '@renderer/components/TextRolling/TextRolling.jsx';
import DateStr from '@renderer/components/DateStr/DateStr.jsx';
import heartbeat from '@renderer/utils/heartbeat';
import useGlobalStore from '@renderer/store/index.js';

import './Normal.scss';

function Normal({}) {
  // const [ampm, setAmpm] = useState('');
  const [nowVal, setNowVal] = useState([0,0,0,0,0,0]);
  // const [nextVal, setNextVal] = useState([0,0,0,0,0,0]);
  const [isPointAni, setIsPointAni] = useState(false);
  // const [scaleSize, setScaleSize] = useState(1);
  const size = useGlobalStore((state) => state.size);
  const cardColor = useGlobalStore((state) => state.cardColor);
  const counts = useGlobalStore((state) => state.counts);
  const clockType = useGlobalStore((state) => state.clockType);
  const countsRef = useRef(counts);
  const countStep = useRef(1);

  const clockContainer = useRef();
  const resizeTimer = useRef();
  
  const countTime = () => {
    // console.log('---- clockType ----:', clockType);
    let timeStr = '';
    let timerNowStr = '';
    // 时间
    if (clockType === 'timer') {
      countsRef.current = counts;
      countStep.current = 1;
      timeStr = timestampToTime();
      const timeArr = timeStr.split(' ');
      timerNowStr = timeArr[1];
    } else if(clockType === 'count') {
      // 倒计时
      countsRef.current -= countStep.current;
      if (countsRef.current === 0) {
        countStep.current = -1;
      }
      timerNowStr = secondsToTime(countsRef.current);
    }
    // setAmpm(timeArr[3]);
    setNowVal(timerNowStr.replace(/:/g, '').split(''));
    // console.log('---- setNowVal ----:', timerNowStr);
    setIsPointAni(true);
    const timer = setTimeout(() => {
      setIsPointAni(false);
    }, 300);
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
    sendSize();
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
    <div className="w-full h-screen fixed inset-0 z-50 flex flex-col justify-center items-center cursor-pointer select-none clock-normal">
      {/* style={{transform: `scale(${scaleSize})`}} */}
      <div className="clock-container relative flex flex-col pointer-events-auto group/action" ref={clockContainer}>
      {/* 日期 星期 */}
      <DateStr />
      {/* <div className="text-[rgba(255,255,255,.26)] text-[40px] absolute bottom-0 right-[-78px]">{ ampm }</div> */}
      <div className="w-full flex flex-row items-center" style={{fontSize: size * 1.1 + 'px', '--cardColor': cardColor}}>
        <div 
          className="clock-item mr-[10px]" 
          style={{width: size + 'px', height: size * 1.6 + 'px', fontSize: size * 1.1 + 'px', lineHeight: size * 1.6 + 'px'}}
        >
          <div className="clock-num">{ nowVal[0] }</div>
        </div>
        <div 
          className="clock-item"
          style={{width: size + 'px', height: size * 1.6 + 'px', fontSize: size * 1.1 + 'px', lineHeight: size * 1.6 + 'px'}}
        >
          <div className="clock-num">{ nowVal[1] }</div>
        </div>
        <div className={"separate" + (isPointAni ? ' active': '')} style={{fontSize: size / 2.5 + 'px'}}>
          <span className="separate-item"></span>
          <span className="separate-item"></span>
        </div>
        <div 
          className="clock-item mr-[10px]"
          style={{width: size + 'px', height: size * 1.6 + 'px', fontSize: size * 1.1 + 'px', lineHeight: size * 1.6 + 'px'}}
        >
          <div className="clock-num">{ nowVal[2] }</div>
        </div>
        <div 
          className="clock-item"
          style={{width: size + 'px', height: size * 1.6 + 'px', fontSize: size * 1.1 + 'px', lineHeight: size * 1.6 + 'px'}}
        >
          <div className="clock-num">{ nowVal[3] }</div>
        </div>
        <div className={"separate" + (isPointAni ? ' active': '')} style={{fontSize: size / 2.5 + 'px'}}>
          <span className="separate-item"></span>
          <span className="separate-item"></span>
        </div>
        <div 
          className="clock-item mr-[10px]"
          style={{width: size + 'px', height: size * 1.6 + 'px', fontSize: size * 1.1 + 'px', lineHeight: size * 1.6 + 'px'}}
        >
          <div className="clock-num">{ nowVal[4] }</div>
        </div>
        <div 
          className="clock-item"
          style={{width: size + 'px', height: size * 1.6 + 'px', fontSize: size * 1.1 + 'px', lineHeight: size * 1.6 + 'px'}}
        >
          <div className="clock-num">{ nowVal[5] }</div>
        </div>
      </div>
      {/* 提示 */}
      <TextRolling />
    </div>
  </div>
  )
}

export default Normal