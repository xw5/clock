import { useState, useEffect, useRef } from 'react';
import heartbeat from '@renderer/utils/heartbeat';
import './TextRolling.css';

function TextRolling() {
  const [tipss, setTipss] = useState(['一寸光阴一寸金，寸金难买寸光阴','时光荏苒，岁月如梭，珍惜当下，莫待明日','时间是生命的馈赠，珍惜它，就是对生命最好的尊重','时间就像流水，一旦逝去，便不复返']);
  const [tipsIndex, setTipsIndex] = useState(0);
  const timer = useRef();
  const dirction = useRef('up');
  const heartIndex = useRef();
  const countTag= useRef(0);

  const tipsHandle = () => {
    countTag.current += 1;
    if (countTag.current >= 3) {
      countTag.current = 0;
      const tipsIndexTemp = tipsIndex + (dirction.current === 'up' ? 1 : -1);
      console.log('---- countTag.current ----:test', tipsIndexTemp, tipsIndex, dirction.current);
      setTipsIndex(tipsIndexTemp);
      if (tipsIndexTemp >= 3) {
        dirction.current = 'down';
      } else if (tipsIndexTemp <= 0) {
        dirction.current = 'up';
      }
    }
  }

  useEffect(() => {
    heartIndex.current = heartbeat.add(tipsHandle);
    return () => {
      clearInterval(timer.current);
      heartbeat.remove(heartIndex.current);
    };
  }, [tipsIndex]);

  return (
    <div className="text-[rgba(255,255,255,.46)] text-[20px] absolute bottom-[-2em] left-0 w-full text-center leading-[1.5em] h-[1.5em] tips-wrap">
      <div className="w-full h-full relative tips-container" style={{transform:`rotateX(${tipsIndex * 90}deg)`}}>
        {tipss.map((tips, index) => <p className={"w-full h-full text-center absolute top-0 left-0 "+'tips'+index} key={index}>{ tips }</p>)}
      </div>
    </div>
  )
}

export default TextRolling