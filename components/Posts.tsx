"use client";
import {
    Post,
    selectAllPosts,
    selectPostsStatus,
    selectPostsError,
    fetchPosts,
} from "@/redux/features/posts/postsSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostExerpt from "./PostExerpt";

const Posts = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(selectPostsStatus);
    const postsError = useSelector(selectPostsError);

    const dispatch = useDispatch();
    useEffect(() => {
        if (postsStatus === "idle") {
            dispatch(fetchPosts() as any);
        }
    }, [dispatch, postsStatus, postsError]);

    let content;
    if (postsStatus === "loading") {
        content = <p>Loading...</p>;
    } else if (postsStatus === "succeeded") {
        const orderedPosts = posts
            .slice()
            .sort((a: any, b: any) => b.date.localeCompare(a.date));
        content = orderedPosts.map((post: any) => (
            <PostExerpt key={post.id} post={post} />
        ));
    } else if (postsStatus === "failed") {
        content = <div>{postsError}</div>;
    }

    return (
        <section>
            <h2 className="text-3xl font-bold mb-5">Posts</h2>
            {content}
        </section>
    );
};

export default Posts;
