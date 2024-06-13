import React, { useEffect, useState } from 'react';
import Loadinglight from "./Loading-light.gif";
import Loadingdark from "./Loading-dark.gif";
import { useMode } from '../App';

export default function Spinner() {
  const mode = useMode();
  const [loading, setLoading] = useState(Loadinglight);
  useEffect(() => {

    if (mode == 'dark') {
      setLoading(Loadingdark);
    } else {
      setLoading(Loadinglight);
    }

  }, [mode])
  return (
    <div>
      <div className='text-center'>
        <img src={loading} alt="loading" />
      </div>
    </div>
  )
}
