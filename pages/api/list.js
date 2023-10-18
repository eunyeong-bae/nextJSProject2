import { connectDB } from "@/util/database";

export default async function handlerList(request, response) {
    const client = await connectDB;
    const db = client.db('forum');
    let result = await db.collection('post').find().toArray();

    console.log(result)

    return response.status(200).json(result);
    // if(request.method == 'GET') {
    // }
}