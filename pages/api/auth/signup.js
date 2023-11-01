import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';

export default async function handler(request, response) {
    if(request.method == "POST"){
        //Q1. 회원가입 전 이름, 이메일, 비번란에 빈칸 또는 너무 긴 값 입력 시 예외처리
        if(request.body) {
            if( request.body.name.length === 0) {
                response.status(500).json('이름에 빈 값을 작성할 수 없습니다.')
            } else if( request.body.name.length > 20) {
                response.status(500).json('20자 이상의 이름 작성은 불가능합니다.')
            }

            if( request.body.email.length === 0) {
                response.status(500).json('이메일에 빈 값을 작성할 수 없습니다.')
            } else if( request.body.email.length > 40) {
                response.status(500).json('40자 이상의 이메일 작성은 불가합니다.')
            }

            if( request.body.password.length === 0) {
                response.status(500).json('비밀번호를 빈 값으로 작성할 수 없습니다.')
            } else if( request.body.password.length > 20) {
                response.status(500).json('20자 이상의 비밀번호는 작성할 수 없습니다.')
            }
        }

        let db = (await connectDB).db('forum');
        
        //Q2. 회원가입 전 같은 이메일 유무 체크하기
        const emailCheck = await db.collection('user_cred').findOne({email: request.body.email});
        console.log(emailCheck)
        if(emailCheck){
            return response.status(500).json('중복된 이메일 가입은 불가능합니다.');
        }
        
        let hash = await bcrypt.hash(request.body.password, 10);
        request.body.password = hash;

        await db.collection('user_cred').insertOne(request.body);

        response.status(200).json('success')
    }
}