import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import React from "react";

const PostExerpt = ({ post }: { post: any }) => {
    return (
        <article className="p-5 border-2 border-gray-300 mb-5 rounded-md">
            <h1 className="text-xl font-semibold mb-3">{post.title}</h1>
            <p>{post.body.substring(0, 100)}</p>
            <p>
                <PostAuthor authorId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};

export default PostExerpt;
