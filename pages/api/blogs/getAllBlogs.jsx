import axios from "axios";

export async function getAllBlogs() {
    try {
        const apiUrl = "http://localhost:8080/api/blogs/all";
        // "https://educationforjobs.onrender.com/api/blogs/all";
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.log("Error fetching Blogs list" + error);
        return [];
    }
}