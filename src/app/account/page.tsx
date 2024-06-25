"use client"

import { useEffect, useState } from "react"
import { Button } from "../components/Button"

interface User {
    id: string,
    username: string,
    media_count: number,
    account_type: string
}

export default function Page() {

    const baseUrl = process.env.BASE_URL
    const accessToken = process.env.ACCESS_TOKEN
    const userId = process.env.USER_ID

    const [user, setUser] = useState<User>()

    useEffect(() => {
        const getUser = async () => {
            var fields = "username,media_count,account_type"
            var url = baseUrl + "/" + userId + "?" + "fields=" + fields + "&" + "access_token=" + accessToken

            const response = await fetch(url)
            const json = await response.json() as User

            if (response.ok) setUser(json)
        }
        getUser()
    },)

    return (
        <div className="py-5 text-xl">
            <h1 className="text-5xl font-bold pb-10">Conta</h1>
            {!user
                ? <p>Carregando...</p>
                :
                <div>
                    <p>Usuário: <a className="text-sky-500 font-bold underline" target="_blank" href={"https://instagram.com/" + user.username}>{user.username}</a> </p>
                    <p>Publicações: <span className="font-bold">{user.media_count}</span></p>
                    <p className="mb-10">Tipo de Conta: <span className="font-bold">{user.account_type}</span></p>
                    <Button to="/feed" text="Ver Publicações" />
                </div>
            }
        </div>
    )
}
