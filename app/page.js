import { connectDB } from "@/util/database";

// export const revalidate = 60;

export default async function Home() {
  
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection('post').find().toArray();

  console.log(result)

  // await fetch('/URL', {cache: 'force-cache'})
  return (
    <div>
      hi
    </div>
  )
}
