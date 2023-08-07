import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "@/redux/features/users/usersSlice";

const PostAuthor = ({ authorId }: { authorId: string }) => {
    const users = useSelector(selectAllUsers);

    const postAuthor = users.find((user) => user.id === authorId);
    return <span>by {postAuthor ? postAuthor.name : "Unknown author"}</span>;
};

export default PostAuthor;
