"use client"

import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Post {
    id: string,
    caption: string,
    media_url: string,
    permalink: string,
    timestamp: string
}

interface Props {
    posts: Post[];
}

const PostsByYear: React.FC<Props> = ({ posts }) => {
    const [postsByYear, setPostsByYear] = useState<Map<number, Post[]>>(new Map());

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const postsMap = new Map<number, Post[]>();

        for (let year = currentYear; year >= 1970; year--) {
            const filteredPosts = posts.filter(post => {
                const postYear = new Date(post.timestamp).getFullYear();
                return postYear === year;
            });

            if (filteredPosts.length > 0) {
                postsMap.set(year, filteredPosts);
            }
        }

        setPostsByYear(postsMap);
    }, [posts]);

    return (
        <div>
            {Array.from(postsByYear.keys()).map(year => (
                <div key={year} className='border-t border-slate-300 pb-10'>
                    <h2 className='text-3xl py-5 font-bold'>{year}</h2>
                    <div className='flex flex-wrap gap-5 '>
                        {postsByYear.get(year)?.map(post => (
                            <div key={post.id}>
                                <a href={"/feed/" + post.id}>
                                    <Image
                                        src={post.media_url}
                                        width={200}
                                        height={500}
                                        alt="Post Image" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostsByYear;