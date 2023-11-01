'use client'

import { useEffect, useState } from "react"

export default function Comment({parentID}) {
    const [comment, setComment] = useState('');
    const [ commentList, setCommentList] = useState([]);
    // console.log(parentID)

    //client component 로드 시, 서버에 데이터 요청하려면 useEffect > fetch 사용
    //장점 : 새로고침없이 부드럽게 생성,삭제,조회 가능
    //단점 : 검색 노출이 어려운데, 댓글이라 검색 노출의 필요성이 떨어져서 괜찮
    useEffect(() => { 
        /**
         * useEffect : 쓸데없는 코드 보관함
         * 보통 ajax, timer 등 넣음
         * 
         * 특징 1 : html 로드/재렌더링될 때 마다 실행됨
         * 만약 처음 로드 1회만 실행하고 싶다면, [] 넣어주기
         * 
         * 특징 2 : html 보여준 후에 늦게 실행시작된다
         * 
         * 따라서, 1.일단 html 에 내용 뭐라도 보여주고
         *         2. ajax 요청으로 데이터 가져오기 시작
         *          3. ajax 결과를 html 에 넣어주도록 해야 UX 적으로 더 나음
         */
        // fetch('/api/comment/new', {
        //     method:'GET'
        // })
        // .then(r => {
        //     return r.json();
        // })
        // .then(res => {
        //     setCommentList(res);
        //     console.log(res)
        // })
        
        //get 요청 시 데이터 함께 보내려면 
        //1.URL parameter
        //2. query string
        fetch(`/api/comment/list?id=${parentID}`).then(r=>r.json())
        .then((result) => {
            //2. 가져온 데이터 state 에 저장하기
            setCommentList(result);
        })
    }, []); 

    return (
        <div>
            <div style={{ padding:'20px',border:'1px solid'}}>
                <h1>댓글 창</h1>
                {   //3.state 를 html 에 넣기
                    commentList.length > 0 
                    ? commentList.map(item => {
                            return (
                                // parentID === item.parent && 
                                <p key={item._id}>{item.content}</p>
                            )
                        })
                    : <h1>로딩 중입니다</h1>
                }
            </div>
            <input id="inputValue" onChange={(e) => {setComment(e.target.value)}}/>
            <button onClick={() => {
                // console.log(comment)
                fetch('/api/comment/new', 
                    { method:'POST', 
                        body : JSON.stringify({comment, parentID})
                }).then(r => r.json())
                .then(result => {
                    setCommentList(result);
                    document.getElementById('inputValue').value = '';
                })
            }}>댓글 전송</button>
        </div>
    )
}