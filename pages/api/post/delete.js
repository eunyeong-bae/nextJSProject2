import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
    if(request.method == 'DELETE') {
        try{
            const db = (await connectDB).db('forum');
            let result = await db.collection('post').deleteOne({_id: new ObjectId(request.body)});
            // console.log(result)
            return response.status( result?.deletedCount === 0 ? 500 : 200).json('success');
        }catch(e) {
            return response.status(500).json('failed');
        }

    }

}