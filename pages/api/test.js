import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
    // console.log(request.query.id.toString())
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').deleteOne({_id: new ObjectId(request.query.id.toString())})

    return response.status(200).json('success')
}