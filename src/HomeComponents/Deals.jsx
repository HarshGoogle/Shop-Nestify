import React, { useEffect, useState } from 'react'
import './Deal.css';
import header from './Trendy Casual Style.gif';
import Deal1 from './Pink Modern Great Deals Instagram Post.gif'
import Deal2 from './Black And Yellow Simple Fashion Sale Instagram Post.gif'
import Deal3 from './Lime Green Black Red Playful Simple New Week Animated Instagram Post.gif'
import Deal4 from './Blue Black Modern Neon Podium New Arrival Smartphone Sale Instagram Post.gif'
import Deal5 from './Gray Bold Black and White Online Sale Black Friday Instagram Post.gif'
import Deal6 from './Navy Blue and Red Animated Fashion Sale Mobile Video.gif'
import NawsomeLoader from './NawsomeLoader';
export default function Deals(props) {
  const [loading, setLoading]=useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },500)
  },[])
  const deals=[
    {deal:1,src:Deal1},
    {deal:2,src:Deal2},
    {deal:3,src:Deal3},
    {deal:4,src:Deal4},
    {deal:5,src:Deal5},
    {deal:6,src:Deal6}
  ]
  return (
   <>
   <img src={header} className='header'/>
   <div className='deals-container'>
    {loading&&<NawsomeLoader/>}
    {!loading && deals.map((item,index)=>{
      return(
      <img className='deal' src={item.src}/>
      )
    })}
    
   </div>
   </>
  )
}
