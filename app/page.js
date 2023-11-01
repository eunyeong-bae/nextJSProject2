import { connectDB } from "@/util/database";

// export const revalidate = 60;

export default async function Home() {
  
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection('post').find().toArray();

  console.log(result)

  // await fetch('/URL', {cache: 'force-cache'})
  return (
    <div className="p-20">
      <h2>Joy Forum 메인 게시판 화면 입니다.</h2>
      <h3>이용을 원하시면 로그인 후 이용하세요.</h3>
    </div>
  )
}
