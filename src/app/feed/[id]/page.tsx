"use client"

import React from 'react'
import { useEffect, useState } from "react"
import Image from 'next/image'
import { Button } from '../../components/Button'

interface Post {
    id: string,
    caption: string,
    media_url: string,
    permalink: string,
    timestamp: string,
    username: string
}

export default function Page({
    params,
}: { params: { id: string } }) {

    const baseUrl = process.env.BASE_URL
    const accessToken = process.env.ACCESS_TOKEN

    const [post, setPost] = useState<Post>()

    useEffect(() => {
        const getPost = async () => {
            var fields = "username,caption,media_url,permalink,timestamp"
            var url = baseUrl + "/" + params.id + "?" + "fields=" + fields + "&" + "access_token=" + accessToken

            const response = await fetch(url)
            const json = await response.json() as Post

            if (response.ok) setPost(json)
        }
        getPost()

        console.log(post)
    },)

    function convertISOToBRDate(isoDate: string): string {
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    }

    return (
        <div className="py-5 text-xl min-h-screen">
            <h1 className="text-5xl font-bold pb-10">Post</h1>
            {!post && <div><p>Carregando...</p></div>}
            {post &&
                <div>
                    <p className="text-slate-300 pb-3">{post.username}</p>
                    <div className='flex gap-5'>
                        <div>
                            <a href={post.media_url}>
                                <Image
                                    src={post.media_url}
                                    width={500}
                                    height={500}
                                    alt="Post Image" />
                            </a>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{convertISOToBRDate(post.timestamp)}</p>
                            <p className="text-xl text-slate-300">Legenda: "{post.caption}"</p>
                            <a className="text-sky-500 font-bold underline" href={post.permalink} target='_blank'>Acessar publicação</a>
                        </div>
                    </div>
                </div>
            }
            <div className="fixed bottom-20">
                <Button to="/feed" text="Voltar" />
            </div>
        </div>
    )
}
