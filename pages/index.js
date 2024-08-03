import { getAllBlogs } from "./api/blogs/getAllBlogs";

export default function Home(props) {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
        </div>
    );
}


export async function getServerSideProps() {
    const blogsList = await getAllBlogs();
    console.log(blogsList);
    return {
        props: {
            blogsList: blogsList,
        },
    };
}