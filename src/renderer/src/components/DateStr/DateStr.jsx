import { useState, useEffect, useRef } from 'react';
import { timestampToTime } from '@renderer/utils/common.js';

function DateStr({initialValue}) {
  const [dateStr, setDateStr] = useState('');
  const timer = useRef();

  const countTime = () => {
    const timeStr = timestampToTime();
    const timeArr = timeStr.split(' ');
    setDateStr(timeArr[0] + ' ' + timeArr[2]);
  }

  useEffect(() => {
    timer.current = setInterval(()=>{
      countTime();
    },1000);
    return () => {
      clearInterval(timer.current);
    };
  }, []);


  return <div className="text-[rgba(255,255,255,.68)] text-[40px] w-full leading-[1.5em] text-center">{ dateStr }</div>
}

export default DateStr