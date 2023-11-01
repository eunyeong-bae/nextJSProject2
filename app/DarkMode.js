'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function DarkMode({cookie}) {
    let router = useRouter();
    const [cookieValue, setCookieValue] = useState(cookie.value);
    console.log('test: ',cookieValue)

    useEffect(() => {
        if(cookieValue == undefined){
            //mode 라는 이름의 쿠키가 없으면 실행해주세요 조건 추가 필요
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
            setCookieValue('light');
        } 

    }, [])

    return (
        <span onClick={() => { 
            document.cookie = cookieValue === 'dark'? "mode=light; max-age="+(3600 * 24 * 400) : "mode=dark; max-age="+(3600 * 24 * 400)
            router.refresh()            
        }}
        >{cookieValue != undefined && cookieValue == 'dark' ? '☀️' : '🌙'}</span>
    )
}