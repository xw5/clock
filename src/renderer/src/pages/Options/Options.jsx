import { useState } from 'react'

function Options({initialValue}) {
  const [count, setCount] = useState(initialValue)

  return (
    <div className="warp">
      <div>options:{count}</div>
      <button onClick={() => setCount(count + 1)}>setCount</button>
    </div>
  )
}

export default Options