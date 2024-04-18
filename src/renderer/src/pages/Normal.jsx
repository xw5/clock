import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Home({initialValue}) {
  const [count, setCount] = useState(initialValue)
  const navigate = useNavigate();
  return (
    <div className="warp">
      <div>Home:{count}</div>
      <button onClick={() => setCount(count + 1)}>setCount</button>
      <br />
      <Link to="/options">options</Link>
    </div>
  )
}

export default Home