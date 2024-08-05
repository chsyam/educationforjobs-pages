import { getAllBlogs } from "./api/blogs/getAllBlogs";
import styles from "./../styles/index.module.css";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Quotes from "@/components/dashboard/Quotes";
import NewsLetter from "@/components/dashboard/newsLetter/NewsLetter";
import StatisticInfo from "@/components/dashboard/stats/StatisticInfo";
import RecentBlogs from "@/components/dashboard/recentBlogs/RecentBlogs";
import WelcomeSection from "@/components/dashboard/welcome/WelcomeSection";

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
        const blogsList = await getAllBlogs();
        if (blogsList === undefined || blogsList === null) {
            return {
                props: {
                    blogsList: [],
                },
            }
        }
        return {
            props: {
                blogsList: blogsList,
            },
        };
    } catch (error) {
        console.log(error);

        return {
            props: {
                blogsList: [],
            },
        }
    }
}