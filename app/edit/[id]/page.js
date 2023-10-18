import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function Edit(props) {
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)});
    // await db.collection('post').updateOne({_id: new ObjectId(props.params.id)}, 
    //     {$set : {title : '', content: ''}}
    // )
    return (
        <div className="p-20">
            <h4>수정 페이지</h4>
            <form action="/api/post/modify" method="POST">
                <input name="title" defaultValue={result.title}/>
                <input name="content" defaultValue={result.content}/>
                <input style={{display:'none'}} name="_id" defaultValue={result._id.toString()}/>
                <button type="submit" style={{marginLeft:'5px'}}>전송</button>
            </form>
        </div>
    )
}