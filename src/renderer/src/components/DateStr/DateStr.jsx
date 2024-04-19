import { useState, useEffect, useRef } from 'react';
import useGlobalStore from '@renderer/store/index.js';
import { timestampToTime } from '@renderer/utils/common.js';
import heartbeat from '@renderer/utils/heartbeat';

function DateStr() {
  const [dateStr, setDateStr] = useState('');

  const size = useGlobalStore((state) => state.size);
  const isShowBtn = useGlobalStore((state) => state.isShowBtn);
  const clockType = useGlobalStore((state) => state.clockType);
  const changeClockType = useGlobalStore((state) => state.changeClockType);

  const countTime = () => {
    const timeStr = timestampToTime();
    const timeArr = timeStr.split(' ');
    if (clockType === 'timer') {
      setDateStr(timeArr[0] + ' ' + timeArr[2]);
    } else if(clockType === 'count') {
      setDateStr(timeArr[0] + ' '+ timeArr[1] + ' ' + timeArr[2]);
    }
  }

  useEffect(() => {
    countTime();
    heartbeat.add('datastr',countTime);
    return () => {
      heartbeat.remove('datastr');
    };
  }, [clockType]);


  return <div className="w-full flex flex-row items-center">
    <div className="text-[rgba(255,255,255,.68)] leading-[1.5em] text-center flex-1" style={{fontSize: size / 2.5+'px'}}>{ dateStr }</div>
    <div className={"flex-row items-center no-drag" + (isShowBtn ? ' flex' : ' hidden')}>
      {clockType === 'timer' && <span onClick={() => changeClockType('count')} className="iconfont text-[rgba(255,255,255,.68)] cursor-pointer mr-[5px] transition-transform hover:rotate-[60deg]" style={{fontSize: size / 3+'px'}}>&#xe63e;</span>}
      {clockType === 'count' && <span onClick={() => changeClockType('timer')} className="iconfont text-[rgba(255,255,255,.68)] cursor-pointer mr-[5px] transition-transform hover:rotate-[60deg]" style={{fontSize: size / 3+'px'}}>&#xe70a;</span>}
      <span className="iconfont text-[rgba(255,255,255,.68)] cursor-pointer transition-transform hover:rotate-[60deg]" style={{fontSize: size / 3+'px'}}>&#xe61b;</span>
    </div>
  </div>
}

export default DateStr;