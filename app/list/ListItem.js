'use client'

import Link from "next/link"
import DetailLink from "./DetailLink"
import { useEffect } from "react"

export default function ListItem({result}) {
    /**
     * db 데이터를 가져오는 방식은 2가지가 있음
     * 1. server component 로 부터 props 로 데이터 전달받기
     * 2. useEffect() 안에서 다음과 같이 처리하는 방식
        useEffect(() => {
            //서버에 부탁해서 db 게시물 가져오는 소스 짜기
            //result = db 게시물
        }, [])
        -> 2번 방식의 경우, '검색 엔진 노출이 약하다'는 단점이 있음
         왜? useEffect는 return 이 실행된 다음 실행되는 함수인데,
            구글 검색 엔진이 데이터 수집을 위해 페이지 방문 시, 
            빈 html 값을 보고 지나칠 수 있기 때문에 
            검색 엔진 노출이 중요한 사이트의 경우는 1번 방식을 사용하는게 낫다
     */

    return (
        <div>
            { result.map((item, idx) => {
                return (
                    <div className="list-item" key={idx} >
                        <Link href={`/detail/${item._id}`}>
                            <h4>{item.title}</h4>
                        </Link>
                        <Link href={`/edit/${item._id}`}>수정</Link>
                        <p>{item.content}</p>
                        <DetailLink />
                        <span onClick={(e) => {
                            //ajax 서버 요청 및 에러 처리
                            /**
                             * 1. query string
                                fetch(`/api/test?id=${item._id}`)
                                .then((res) => {
                                    return res.json();
                                }).then(() => {
                                    e.target.parentElement.style.opacity = 0;
                                    setTimeout(() => {
                                        e.target.parentElement.style.display = 'none';
                                    }, 1000);
                                })
                                
                                2. URL parameter
                                fetch(`api/ab/${item._id}`)
                                .then(() => {
                                    e.target.parentElement.style.opacity = 0;
                                    setTimeout(() => {
                                        e.target.parentElement.style.display = 'none';
                                    }, 1000);
                                })

                             */
                            
                            fetch('/api/post/delete', {
                                method :'DELETE',
                                body : item._id
                            }).then((res) => {
                                return res.json();
                            }).then((r) => {
                                if(r === 'false') {
                                    alert('글 작성자가 아니면 삭제 불가능')
                                } else {
                                    e.target.parentElement.style.opacity = 0;
                                    setTimeout(() => {
                                        e.target.parentElement.style.display = 'none';
                                    }, 1000);
                                }
                            })

                            // .then((res) => {
                            //     if(res.status == 200) {
                            //         return res.json();
                            //     } else {
                            //         //서버가 에러 코드 전송 시 실행할 코드 status(500)인 경우
                            //         alert('Error')
                            //     }
                            // }).then(() => {
                            //     //성공 시 실행할 코드
                            //     e.target.parentElement.style.opacity = 0;
                            //     setTimeout(() => {
                            //         e.target.parentElement.style.display = 'none';
                            //     }, 1000);

                            // }).catch((error) => {
                            //     //인터넷 문제로 실패 시 실행할 코드(네트워크 에러)
                            //     console.log(error)
                            // })
                        }}>삭제</span>
                    </div>
                )
            })}
        </div>
    )
}