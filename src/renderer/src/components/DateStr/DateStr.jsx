import { useState, useEffect, useRef } from 'react';
import useGlobalStore from '@renderer/store/index.js';
import { timestampToTime } from '@renderer/utils/common.js';
import heartbeat from '@renderer/utils/heartbeat';

function DateStr({}) {
  const [dateStr, setDateStr] = useState('');
  const timer = useRef();
  const heartIndex = useRef();

  const size = useGlobalStore((state) => state.size);

  const countTime = () => {
    const timeStr = timestampToTime();
    const timeArr = timeStr.split(' ');
    setDateStr(timeArr[0] + ' ' + timeArr[2]);
  }

  useEffect(() => {
    countTime();
    heartIndex.current = heartbeat.add(countTime);
    return () => {
      heartbeat.remove(heartIndex.current);
    };
  }, []);


  return <div className="text-[rgba(255,255,255,.68)] w-full leading-[1.5em] text-center" style={{fontSize: size / 2.5+'px'}}>{ dateStr }</div>
}

export default DateStr