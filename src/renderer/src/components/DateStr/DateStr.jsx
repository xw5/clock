import { useState, useEffect } from 'react';
import useGlobalStore from '@renderer/store/index.js';
import { timestampToTime } from '@renderer/utils/common.js';
import heartbeat from '@renderer/utils/heartbeat';

import './DateStr.scss';

function DateStr() {
  const [dateStr, setDateStr] = useState('');

  const size = useGlobalStore((state) => state.size);
  const isShowBtn = useGlobalStore((state) => state.isShowBtn);
  const clockType = useGlobalStore((state) => state.clockType);
  const changeClockType = useGlobalStore((state) => state.changeClockType);
  const dataColor = useGlobalStore((state) => state.dataColor);

  const countTime = () => {
    const timeStr = timestampToTime();
    const timeArr = timeStr.split(' ');
    if (clockType === 'timer') {
      setDateStr(timeArr[0] + ' ' + timeArr[2]);
    } else if(clockType === 'count') {
      setDateStr(timeArr[0] + ' '+ timeArr[1] + ' ' + timeArr[2]);
    }
  }

  const openOptions = () => {
    window.electron.ipcRenderer.send('open', 'options', '时钟配置');
  }

  useEffect(() => {
    countTime();
    heartbeat.add('datastr',countTime);
    return () => {
      heartbeat.remove('datastr');
    };
  }, [clockType]);


  return <div className="w-full flex flex-row items-center" style={{'--dataColor': dataColor}}>
    <div className="leading-[1.5em] text-center flex-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" style={{fontSize: size / 2.5+'px', color: dataColor}}>{ dateStr }</div>
    <div className={"flex-row items-center no-drag" + (isShowBtn ? ' flex' : ' hidden')}>
      {clockType === 'timer' && <span onClick={() => changeClockType('count')} className="iconfont options-btn text-[rgba(255,255,255,.28)] cursor-pointer mr-[5px] hover:rotate-[60deg]" style={{fontSize: size / 3+'px'}}>&#xe63e;</span>}
      {clockType === 'count' && <span onClick={() => changeClockType('timer')} className="iconfont options-btn text-[rgba(255,255,255,.28)] cursor-pointer mr-[5px] hover:rotate-[60deg]" style={{fontSize: size / 3+'px'}}>&#xe70a;</span>}
      <span onClick={openOptions} className="iconfont options-btn text-[rgba(255,255,255,.28)] cursor-pointer hover:rotate-[60deg]" style={{fontSize: size / 3+'px'}}>&#xe61b;</span>
    </div>
  </div>
}

export default DateStr;