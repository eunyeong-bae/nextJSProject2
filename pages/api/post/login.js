import { connectDB } from "@/util/database";

export default async function handler(request, response){
    if(request.method == 'POST') {
        if(request.body.userId === '' || request.body.userPW === ''){
            return response.status(500).json('정확한 아이디, 비번 입력하세요');
        }
        const db = (await connectDB).db('forum');
        let result = await db.collection('userInfo').insertOne(request.body);
        return response.status(200).json('success');
        // return response.status(200).redirect('/list');
    }
}