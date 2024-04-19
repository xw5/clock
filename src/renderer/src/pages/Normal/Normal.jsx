import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { timestampToTime } from '@renderer/utils/common.js';
import TextRolling from '@renderer/components/TextRolling/TextRolling.jsx';
import DateStr from '@renderer/components/DateStr/DateStr.jsx';
import heartbeat from '@renderer/utils/heartbeat';
import useGlobalStore from '@renderer/store/index.js';
import './Normal.css';

function Normal({}) {
  const [ampm, setAmpm] = useState('');
  const [nowVal, setNowVal] = useState([0,0,0,0,0,0]);
  const [nextVal, setNextVal] = useState([0,0,0,0,0,0]);
  const [isPointAni, setIsPointAni] = useState(false);
  const [scaleSize, setScaleSize] = useState(1);
  const size = useGlobalStore((state) => state.size);

  let heartIndex = useRef();
  const clockContainer = useRef();
  const resizeTimer = useRef();
  
  const countTime = () => {
    const timeStr = timestampToTime();
    const timeArr = timeStr.split(' ');
    setAmpm(timeArr[3]);
    setNextVal(timeArr[1].replace(/:/g, '').split(''))
    setIsPointAni(true);
    setTimeout(()=>{
      setNowVal(timeArr[1].replace(/:/g, '').split(''));
      setIsPointAni(false);
    }, 550);
  }
  
  const resizeFn = () => {
    const {innerWidth, innerHeight} = window;
    let scaleTemp = 1;
    if (innerWidth < innerHeight) {
      scaleTemp = innerHeight / 880;
    } else {
      scaleTemp = innerWidth / 880;
    }
    setScaleSize(scaleTemp > 1 ? 1 : scaleTemp);
  };

  useEffect(() => {
    resizeFn();
    heartIndex.current = heartbeat.add(countTime);
    // window.addEventListener('resize', resizeFn, false);
    // sendSize();
    return () => {
      heartbeat.remove(heartIndex.current);
      // window.removeEventListener('resize', resizeFn, false);
    };
  }, []);

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
    <div className="w-full h-screen fixed inset-0 z-50 flex flex-col justify-center items-center pointer-events-none clock-wrap">
      {/* style={{transform: `scale(${scaleSize})`}} */}
    <div className="clock-container relative flex flex-col drag pointer-events-auto" ref={clockContainer}>
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