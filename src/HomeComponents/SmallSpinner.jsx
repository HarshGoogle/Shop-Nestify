import React, { useState } from 'react';
import Loaderlight from "./loader-light.gif";
import { useMode } from '../App';

export default function SmallSpinner() {
    const [loading, setLoading] = useState(Loaderlight);
    return (
        <div>
            <div className='text-center'>
                <img src={loading} alt="loading" style={{height:'200px',width:'200px'}}/>
            </div>
        </div>
    )
}
