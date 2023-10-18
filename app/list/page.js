import { connectDB } from "@/util/database"
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
    const db = (await connectDB).db('forum'); //db 접속
    let result = await db.collection('post').find().toArray();

    return (
      <div className="list-bg">
       { result.map((item, idx) => {
        return (
            <div className="list-item" key={idx} >
                <Link href={`/detail/${item._id}`}>
                    <h4>{item.title}</h4>
                </Link>
                <Link href={`/edit/${item._id}`}>수정</Link>
                <p>{item.content}</p>
                <DetailLink />
            </div>
        )
       })}
      </div>
    )
  } 