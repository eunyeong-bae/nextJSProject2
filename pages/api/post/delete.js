import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
    // console.log(session.user.email);
    
    if(request.method == 'DELETE') {
        try{
            let session = await getServerSession(request, response, authOptions);

            const db = (await connectDB).db('forum');
            let result = await db.collection('user_cred').findOne({email: session.user.email});
            console.log(result)
            //Q4. 관리자 권한을 가진 유저는 모든 글을 삭제가능하게 서버기능을 업그레이드해봅시다. 
            if( result.role === 'admin'){
                let result = await db.collection('post').deleteOne({_id: new ObjectId(request.body)});
                // // console.log(result)
                return response.status( result?.deletedCount === 0 ? 500 : 200).json('success');
            } else {
                let result2 = await db.collection('post').findOne({_id: new ObjectId(request.body)});
                // console.log(result2.author)
                if(session && session.user.email === result2.author){
                    let result = await db.collection('post').deleteOne({_id: new ObjectId(request.body)});
                    // // console.log(result)
                    return response.status( result?.deletedCount === 0 ? 500 : 200).json('success');
                } else {
                    response.status(500).json('false')
                }
            }
        }catch(e) {
            return response.status(500).json('failed');
        }

    }

}