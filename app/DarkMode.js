'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function DarkMode({cookie}) {
    let router = useRouter();
    
    useEffect(() => {
        if(cookie == undefined){
            console.log("3st",cookie)
            //mode 라는 이름의 쿠키가 없으면 실행해주세요 조건 추가 필요
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
        } 

    }, [])

    return (
        <span onClick={() => { 
            document.cookie = cookie.value === 'dark'? "mode=light; max-age="+(3600 * 24 * 400) : "mode=dark; max-age="+(3600 * 24 * 400)
            router.refresh()            
        }}
        >{cookie && cookie.value == 'dark' ? '☀️' : '🌙'}</span>
    )
}