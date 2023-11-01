export default function Register() {
    return (
        <div style={{padding:'20px'}}>
            <form method="POST" action="/api/auth/signup">
                <input name="name" type="text" placeholder="이름" />
                <input name="email" type="text" placeholder="이메일" />
                <input name="password" type="password" placeholder="비번" />
                <input name="role" type="text" placeholder="관리자 유무 체크" />
                <button type="submit">가입요청</button>
            </form>
        </div>
    )
}