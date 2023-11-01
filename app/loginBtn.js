'use client'

import {signIn, signOut} from 'next-auth/react';

export default function LoginBtn({session}) {
    return (
        <div>
            {
                session?.user.name 
                ? <div style={{display:'flex', flexDirection:'row'}}>
                    <p>{session.user.name}</p>
                    <button onClick={() => { signOut() }}>로그아웃</button>
                  </div>
                : <button onClick={() => { signIn() }}>로그인</button>
            }
        </div>
    )
}