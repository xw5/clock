import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { timestampToTime } from '@renderer/utils/common.js';
import './normal.css';

function Normal({}) {
  const [dateStr, setDateStr] = useState('');
  const [ampm, setAmpm] = useState('');
  const [tipss] = useState(['一寸光阴一寸金，寸金难买寸光阴','时光荏苒，岁月如梭，珍惜当下，莫待明日','时间是生命的馈赠，珍惜它，就是对生命最好的尊重','时间就像流水，一旦逝去，便不复返']);
  const [tipsIndex, setTipsIndex] = useState(0);
  const [nowVal, setNowVal] = useState([0,0,0,0,0,0]);
  const [nextVal, setNextVal] = useState([0,0,0,0,0,0]);
  const [isPointAni, setIsPointAni] = useState(false);
  const [scaleSize, setScaleSize] = useState(1);
  let countTag = useRef(0);
  let dirction = useRef('up');
  let timer = useRef();
  
  const countTime = () => {
    const timeStr = timestampToTime();
    const timeArr = timeStr.split(' ');
    setAmpm(timeArr[3]);
    setDateStr(timeArr[0] + ' ' + timeArr[2]);
    setNextVal(timeArr[1].replace(/:/g, '').split(''))
    // ampm.value = timeArr[3];
    // dateStr.value = timeArr[0] + ' ' + timeArr[2];
    // nextVal.value = timeArr[1].replace(/:/g, '').split('');
    // console.log('---- countTime ----:', dateStr.value, nextVal.value);
    setIsPointAni(true);
    // isPointAni.value = true;
    setTimeout(()=>{
      setNowVal(timeArr[1].replace(/:/g, '').split(''));
      // nowVal.value = timeArr[1].replace(/:/g, '').split('');
      // isPointAni.value = false;
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
    timer.current = setInterval(()=>{
      countTime();
      countTag.current += 1;
      if (countTag.current === 3){
        countTag.current = 0;
        const tipsIndexTemp = tipsIndex + (dirction.current === 'up' ? 1 : -1);
        console.log('---- countTag.current ----:', tipsIndexTemp);
        setTipsIndex(tipsIndexTemp)
        if (tipsIndexTemp >= 3) {
          dirction.current = 'down';
        } else if (tipsIndexTemp <= 0) {
          dirction.current = 'up';
        }
      }
    },1000);
    window.addEventListener('resize', resizeFn, false);
    return () => {
      clearInterval(timer.current);
      window.removeEventListener('resize', resizeFn, false);
    };
  }, []);

  return (
    <div className="w-full h-screen fixed inset-0 z-50 bg-[rgba(0,0,0,.8)] flex flex-col justify-center items-center clock-wrap">
    <div className="clock-container relative" style={{transform: `scale(${scaleSize})`}}>
      <div className="text-[rgba(255,255,255,.68)] text-[40px] absolute top-[-80px] left-0 w-full leading-[80px] text-center">{ dateStr }</div>
      <div className="text-[rgba(255,255,255,.46)] text-[20px] absolute bottom-[-60px] left-0 w-full text-center leading-[30px] h-[30px] tips-wrap">
        <div className="w-full h-full relative tips-container" style={{transform:`rotateX(${tipsIndex * 90}deg)`}}>
          {tipss.map((tips, index) => <p className={"w-full h-full text-center absolute top-0 left-0 "+'tips'+index} key={index}>{ tips }</p>)}
        </div>
      </div>
      <div className="text-[rgba(255,255,255,.26)] text-[40px] absolute bottom-0 right-[-78px]">{ ampm }</div>
      <div className={"clock-item mr-[10px]" + (nowVal[0] !== nextVal[0] ? ' active' : '')}>
        <div className="clock-num up up-front">{ nowVal[0] }</div>
        <div className="clock-num down down-front">{ nowVal[0] }</div>
        <div className="clock-num up up-back">{ nextVal[0] }</div>
        <div className="clock-num down down-back">{ nextVal[0] }</div>
      </div>
      <div className={"clock-item" + (nowVal[1] !== nextVal[1] ? ' active' : '')}>
        <div className="clock-num up up-front">{ nowVal[1] }</div>
        <div className="clock-num down down-front">{ nowVal[1] }</div>
        <div className="clock-num up up-back">{ nextVal[1] }</div>
        <div className="clock-num down down-back">{ nextVal[1] }</div>
      </div>
      <div className={"separate" + (isPointAni ? ' active': '')}>
        <span className="separate-item"></span>
        <span className="separate-item"></span>
      </div>
      <div className={"clock-item mr-[10px]" + (nowVal[2] !== nextVal[2] ? ' active' : '')}>
        <div className="clock-num up up-front">{ nowVal[2] }</div>
        <div className="clock-num down down-front">{ nowVal[2] }</div>
        <div className="clock-num up up-back">{ nextVal[2] }</div>
        <div className="clock-num down down-back">{ nextVal[2] }</div>
      </div>
      <div className={"clock-item" + (nowVal[3] !== nextVal[3] ? ' active' : '')}>
        <div className="clock-num up up-front">{ nowVal[3] }</div>
        <div className="clock-num down down-front">{ nowVal[3] }</div>
        <div className="clock-num up up-back">{ nextVal[3] }</div>
        <div className="clock-num down down-back">{ nextVal[3] }</div>
      </div>
      <div className={"separate" + (isPointAni ? ' active': '')}>
        <span className="separate-item"></span>
        <span className="separate-item"></span>
      </div>
      <div className={"clock-item mr-[10px]" + (nowVal[4] !== nextVal[4] ? ' active' : '')}>
        <div className="clock-num up up-front">{ nowVal[4] }</div>
        <div className="clock-num down down-front">{ nowVal[4] }</div>
        <div className="clock-num up up-back">{ nextVal[4] }</div>
        <div className="clock-num down down-back">{ nextVal[4] }</div>
      </div>
      <div className={"clock-item" + (nowVal[5] !== nextVal[5] ? ' active' : '')}>
        <div className="clock-num up up-front">{ nowVal[5] }</div>
        <div className="clock-num down down-front">{ nowVal[5] }</div>
        <div className="clock-num up up-back">{ nextVal[5] }</div>
        <div className="clock-num down down-back">{ nextVal[5] }</div>
      </div>

    </div>
  </div>
  )
}

export default Normal