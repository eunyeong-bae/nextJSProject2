import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
    //현재 로그인 된 유저정보 갖고 오기
    let session = await getServerSession(request, response, authOptions);
    
    if(request.method == 'POST'){
        //로그인 상태가 아니면 거절 - if 추가
        if(session){
            request.body = JSON.parse(request.body);

            if(request && request.body.parentID.length == 0) {
                return response.status(500).json('빈칸 확인 필요')
            }
    
            let data = {
                content : request.body.comment,
                parent: new ObjectId(request.body.parentID), //빈칸 체크 
                author: session.user.email, //프론트에서 위조할 수 있어서, 서버에서 직접 검색해보는게 나음
            }
            
            const db = (await connectDB).db('forum');
            let result = await db.collection('comment').insertOne(data)

            response.status(200).json('success')
        } else {
            return response.status(500).json('로그인 후 이용해주세요.')
        }
    } else if( request.method == 'GET'){
        console.log('dd')
        const db = (await connectDB).db('forum');
        let result = await db.collection('comment').find().toArray();

        return response.status(200).json(result)
    }
}