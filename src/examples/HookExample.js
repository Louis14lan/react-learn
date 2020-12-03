import { useState, useEffect } from "react";

export function HookExample(){
    const [count,setCount] = useState(0)
    useEffect(()=>{
        console.log(`you click ${count} times.`)
        return ()=>{
            console.log(`you click ${count} timesssss.`)
        }
    },[count]) // 尽在 count 更新时执行 useEffect 里的回调函数
    return <div>
        <h2>HookExample</h2>
        <span>counts:{count}</span>
        <button onClick={()=>setCount(count+1)}>+</button>
    </div>
}


