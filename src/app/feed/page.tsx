"use client"

import React from 'react'
import { useEffect, useState } from 'react'
import PostsByYear from '../components/PostsByYear'

interface Post {
    id: string,
    caption: string,
    media_url: string,
    permalink: string,
    timestamp: string
}

export default function Page() {

    const baseUrl = process.env.BASE_URL
    const accessToken = process.env.ACCESS_TOKEN

    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {

        const getPosts = async () => {

            const url = baseUrl + "/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=" + accessToken

            const response = await fetch(url)
            const json = await response.json()
            const data = await json.data as Post[]

            if (response.ok) setPosts(data)
        }
        getPosts()
    },)


    const countPostsLastYear = (posts: Post[]): number => {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        return posts.filter(post => new Date(post.timestamp) >= oneYearAgo).length;
    };

    const [postCount, setPostCount] = useState<number>(0);

    useEffect(() => {
        const count = countPostsLastYear(posts);
        setPostCount(count);
    }, [posts]);


    const getYearOfFirstPost = (posts: Post[]): number | null => {
        if (posts.length === 0) return null;

        const firstPost = posts.reduce((earliest, post) => {
            return new Date(post.timestamp) < new Date(earliest.timestamp) ? post : earliest;
        });

        return new Date(firstPost.timestamp).getFullYear();
    };

    const [firstPostYear, setFirstPostYear] = useState<number | null>(null);

    useEffect(() => {
        const year = getYearOfFirstPost(posts);
        setFirstPostYear(year);
    }, [posts]);


    return (
        <div className="py-5 text-xl">
            <h1 className="text-5xl font-bold pb-10">Feed</h1>
            {posts.length > 0 &&
                <div className='pb-10 max-w-3xl'>
                    <h1 className="text-3xl font-bold">Estatísticas</h1>
                    <div className="flex justify-between">
                        <p className="text-slate-300">Número: <span className="font-bold text-white">{posts.length}</span></p>
                        <p className='text-slate-300'>No último ano: <span className="font-bold text-white">{postCount}</span> </p>
                        <p className='text-slate-300'>Ano da primeira publicação: <span className="font-bold text-white">{firstPostYear}</span> </p>
                    </div>
                </div>
            }
            <div>
                {posts.length === 0 && <div><p>Carregando...</p></div>}
                {posts.length > 0 &&
                    <>
                        <h1 className="text-3xl font-bold pb-10">Publicações</h1>
                        <PostsByYear posts={posts} />
                    </>
                }
            </div>
        </div>
    )
}
