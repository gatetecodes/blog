import { useDispatch } from "react-redux";
import { Post, reactionAdded } from "@/redux/features/posts/postsSlice";

const reactionEmoji = {
    thumbsUp: "👍",
    hooray: "🎉",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕️",
};

const ReactionButtons = ({ post }: { post: Post }) => {
    const dispatch = useDispatch();
    const reactionButtons = Object.entries(reactionEmoji).map(
        ([name, emoji]) => {
            return (
                <button
                    key={name}
                    type="button"
                    className="m-2 border border-gray-300 rounded-md p-2"
                    onClick={() =>
                        dispatch(
                            reactionAdded({ postId: post.id, reaction: name })
                        )
                    }
                >
                    {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
                </button>
            );
        }
    );
    return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
