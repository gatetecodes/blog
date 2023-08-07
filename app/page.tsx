import AddPost from "@/components/AddPost";
import Posts from "@/components/Posts";
import Image from "next/image";

export default function Home() {
    return (
        <main className="">
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <AddPost />
                <Posts />
            </div>
        </main>
    );
}
