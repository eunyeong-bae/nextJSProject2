import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function Modify(request, response) {
    if(request.method == "POST"){
        let change = {title: request.body.title, content:request.body.content};
        const db = (await connectDB).db('forum');
        let result = await db.collection('post').updateOne(
            {_id: new ObjectId(request.body._id)}, 
            {$set : change}
        );
        
        response.redirect(302, '/list')
        // return response.status(200).json('success');
    }
}