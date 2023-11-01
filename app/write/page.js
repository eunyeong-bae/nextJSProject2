import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export default async function Write() {
    let session = await getServerSession(authOptions);
    
    // Q3. /write 페이지는 로그인한 사람만 보여주려면? 
    if(!session) {
        return (
            <div className="p-20">
                <h1 style={{color:'red'}}>로그인 후 이용 가능합니다.</h1>
            </div>
        )
    } else {
        return (
            <div className="p-20">
                <h4>글 작성</h4>
                <form action="/api/post/new" method="POST">
                    <input name="title" placeholder="글 제목"/>
                    <input name="content" placeholder="글 내용" />
                    <button type="submit" style={{marginLeft:'5px'}}>Click</button>
                </form>
            </div>
        )
    }

}