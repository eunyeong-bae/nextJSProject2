import { connectDB } from "@/util/database"

export default async function handler(request, response) {
    if(request.method == 'POST'){
        if(request.body.title == '') {
            return response.status(500).json('data 제대로 입력해라');
        } 
        
        //DB 예외처리
        try {
            const db = (await connectDB).db('forum');
            let result = await db.collection('post').insertOne(request.body);
            
            return response.status(200).redirect('/list');
        } catch(e) {
            return response.status(500).json('db 오류 발생');
        }
    }
    // return response.status(200).json('success');
}