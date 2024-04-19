import { useState, useEffect, useRef } from 'react';
import heartbeat from '@renderer/utils/heartbeat';
import useGlobalStore from '@renderer/store/index.js';
import './TextRolling.css';

function TextRolling() {
  const [tipss, setTipss] = useState(['一寸光阴一寸金，寸金难买寸光阴','时光荏苒，岁月如梭，珍惜当下，莫待明日','时间是生命的馈赠，珍惜它，就是对生命最好的尊重','时间就像流水，一旦逝去，便不复返']);
  const [tipsIndex, setTipsIndex] = useState(0);
  const [nowTips, setNowTips] = useState(tipss[0]);
  const [nextTips, setNextTips] = useState('');
  const [isStop, setIsStop] = useState(false);
  const [isFlip, setIsFlip] = useState(false);
  const countTag= useRef(0);
  const tipsIndexTemp = useRef(0);

  const size = useGlobalStore((state) => state.size);

  const tipsHandle = () => {
    countTag.current += 1;
    if (countTag.current >= 3) {
      countTag.current = 0;
      tipsIndexTemp.current = tipsIndexTemp.current + 1;
      if (tipsIndexTemp.current >= tipss.length - 1) {
        tipsIndexTemp.current = -1;
      }
      setTipsIndex(tipsIndexTemp.current);
    }
  }

  useEffect(() => {
    setIsStop(false);
    setIsFlip(true);
    setNowTips(tipsIndex === -1 ? tipss[tipss.length - 1]  : tipss[tipsIndex]);
    setNextTips(tipss[tipsIndex + 1]);
    setTimeout(() => {
      setNowTips(tipss[tipsIndex + 1]);
      setIsStop(true);
      setIsFlip(false);
    }, 400);
  }, [tipsIndex]);

  useEffect(() => {
    heartbeat.add('textrolling', tipsHandle);
    return () => {
      heartbeat.remove(textrolling);
    };
  }, []);

  return (
    <div className="text-[rgba(255,255,255,.46)] w-full text-center leading-[2.5em] h-[2.5em] tips-wrap" style={{fontSize: size / 5 + 'px'}}>
      <div className={"w-full h-full relative tips-container" + (isFlip ? ' flip' : '') + (isStop ? ' stop' : '')}>
        {/* {tipss.map((tips, index) => <p className={"w-full h-full text-center absolute top-0 left-0 "+'tips'+index} key={index}>{ tips }</p>)} */}
        <p className="w-full h-full text-center absolute top-0 left-0 tips0" >{ nowTips }</p>
        <p className="w-full h-full text-center absolute top-0 left-0 tips1" >{ nextTips }</p>
      </div>
    </div>
  )
}

export default TextRolling