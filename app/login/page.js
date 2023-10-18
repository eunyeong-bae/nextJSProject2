export default function LoginPg() {
    return (
        <div style={{padding:'20px'}}>
            <h2>Login Page</h2>
            <form action="/api/post/login" method="POST">
                <input name="userId" placeholder="Insert your Login ID"/>
                <input name="userPW" placeholder="Insert your Login PW" />
                <button type="submit">Click</button>
            </form>
        </div>
    )
}