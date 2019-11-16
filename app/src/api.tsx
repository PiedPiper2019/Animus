import User from './models/User'

class Api {
    static URI = `http://localhost:3001`

    static getUserInfo = async (id: number) => {
        const response = await fetch(`${Api.URI}/userInfo/${id}`, { mode: "cors" })
        const json = await response.json()
        return json as User
    }
}

export default Api