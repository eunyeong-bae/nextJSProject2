import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
    // console.log(request.query.aa)
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').deleteOne({_id: new ObjectId(request.query.aa.toString())})

    // console.log('hello')
    return response.status(200).json();
}