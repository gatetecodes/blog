import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

interface Reactions {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    coffee: number;
}
export interface Post {
    id: string;
    title: string;
    content: string;
    date: string;
    reactions: Reactions;
}

interface PostsState {
    posts: Post[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error?: string | null;
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    try {
        const response = await axios.get(POSTS_URL);
        return [...response.data];
    } catch (error: any) {
        return error.message;
    }
});
const initialState = {
    posts: [] as Post[],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
} as PostsState;

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.posts.push(action.payload);
            },
            prepare: (title: string, content: string, userId: string) => {
                const id = nanoid();
                return {
                    payload: {
                        id,
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        },
                    } as Post,
                    meta: {},
                    error: {},
                };
            },
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction as keyof Reactions]++;
            }
        },
        
    },
    extraReducers: (builder) => { 
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = "loading";
        }).addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "succeeded";
            let min = 1;
            const loadedPosts = action.payload.map((post: any) => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString();
                post.reactions = {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0,
                };
                return post;
            });

            state.posts = state.posts.concat(loadedPosts);

        }).addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });

    },
});

export const selectAllPosts = (state: any) => state.posts.posts;
export const selectPostsStatus = (state: any) => state.posts.status;
export const selectPostsError = (state: any) => state.posts.error;
export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
