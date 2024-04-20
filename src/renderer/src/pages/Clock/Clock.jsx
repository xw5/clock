import useGlobalStore from '@renderer/store/index.js';
import Normal from '@renderer/components/Normal/Normal.jsx';
import Flip from '@renderer/components/Flip/Flip.jsx';

function Clock() {
  const clockstyle = useGlobalStore((state) => state.clockStyle)

  return <>
    {clockstyle === 'normal' && <Normal />}
    {clockstyle === 'flip' && <Flip />}
  </>
}

export default Clock