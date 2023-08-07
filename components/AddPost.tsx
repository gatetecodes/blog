"use client";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from "@/redux/features/posts/postsSlice";
import { selectAllUsers } from "@/redux/features/users/usersSlice";

const AddPost = () => {
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const authorRef = useRef<HTMLSelectElement>(null);

    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();

    const onSavePostClicked = () => {
        const title = titleRef.current?.value;
        const content = contentRef.current?.value;
        const author = authorRef.current?.value;
        if (title && content) {
            dispatch(postAdded(title, content, author as string));
        }
        titleRef.current!.value = "";
        contentRef.current!.value = "";
    };
    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));
    return (
        <section className="w-[743px] mb-8">
            <h2 className="text-3xl font-bold mb-5">Add a New Post</h2>
            <form action="">
                <div className="mb-5">
                    <label htmlFor="postTitle" className="block">
                        Post Title:
                    </label>
                    <input
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        ref={titleRef}
                        className="w-full border-2 border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="postAuthor" className="block">
                        Author
                    </label>
                    <select
                        name="postAuthor"
                        id="postAuthor"
                        ref={authorRef}
                        className="w-full border-2 border-gray-300 rounded-md p-2"
                    >
                        <option value="">Please select an author</option>
                        {usersOptions}
                    </select>
                </div>
                <div>
                    <label htmlFor="postContent" className="block">
                        Post Content:
                    </label>
                    <textarea
                        name="postContent"
                        id="postContent"
                        ref={contentRef}
                        className="w-full border-2 border-gray-300 rounded-md p-2"
                    />
                </div>
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    className="bg-black text-white px-5 py-2 mt-5 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Save Post
                </button>
            </form>
        </section>
    );
};

export default AddPost;
