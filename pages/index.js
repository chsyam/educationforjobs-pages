import styles from "./../styles/index.module.css";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Quotes from "@/components/dashboard/Quotes";
import NewsLetter from "@/components/dashboard/newsLetter/NewsLetter";
import StatisticInfo from "@/components/dashboard/stats/StatisticInfo";
import RecentBlogs from "@/components/dashboard/recentBlogs/RecentBlogs";
import WelcomeSection from "@/components/dashboard/welcome/WelcomeSection";
import { realtimeDB } from "@/components/firebaseConfig/FirebaseConfig";
import { get, ref } from "firebase/database";

export default function Home(props) {
    return (
        <div>
            <WelcomeSection />
            <StatisticInfo />
            <RecentBlogs blogs={props.blogsList} />
            <Quotes />
            <NewsLetter />
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const blogRef = ref(realtimeDB, "blogs");
        const snapshot = await get(blogRef);
        if (snapshot.exists()) {
            return {
                props: {
                    blogsList: Object.values(snapshot.val())
                }
            }
        } else {
            console.log("Error fetching data (or) No data available");
        }
        return {
            props: {
                blogsList: []
            }
        }
    } catch (error) {
        console.log("Error fetching data (or) No data available");
        return {
            props: {
                blogsList: []
            }
        }
    }
}