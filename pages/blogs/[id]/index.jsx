"use client";
import FeedbackForm from "./../../feedback/index";
import { getBlogById } from "@/pages/api/blogs/getBlogById";
import styles from "@/styles/BlogPost.module.css";
import { useEffect, useState } from "react";
import { IoMdTime } from "react-icons/io";
import { GiRingingBell } from "react-icons/gi";
import { BsDownload } from "react-icons/bs";
import { equalTo, get, query, ref } from "firebase/database";
import { realtimeDB } from "@/components/firebaseConfig/FirebaseConfig";

export default function BlogPost({ blogData, id }) {
	const [blogInfo, setBlogInfo] = useState(blogData);
	const [blogFound, setBlogFound] = useState(true);
	const [loading, setLoading] = useState(true);
	const [tags, setTags] = useState([]);
	const [relatedBlogId, setRelatedBlogId] = useState(id);

	useEffect(() => {
		try {
			setTags(blogInfo?.tagsList?.split("#"));
		} catch (e) {
			setTags(["tet", "dsc"]);
			console.log(e);
		}
	}, [blogInfo]);

	const printFormattedDate = (postedAt) => {
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var date = new Date(postedAt);
		return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
	}

	useEffect(() => {
		function fetchBlogData() {
			setLoading(true);
			if (blogData)
				setBlogInfo(blogData);
			else
				setBlogFound(false);
			setLoading(false);
		}
		fetchBlogData();
		document.title = blogInfo?.title ? blogInfo?.title + " | EducationForJobs" : "Blogs | EducationForJobs";
		setRelatedBlogId(blogData.id);
	}, [blogInfo, blogData]);

	return (
		blogFound ? (
			loading ? (
				<div style={{ textAlign: "center", marginTop: "20%", fontFamily: "Poppins", fontWeight: "600" }}>
					Loading....
				</div>
			) : (
				<div className={styles.blogPost}>
					<div className={styles.title}>{blogInfo?.title}</div>
					<div className={styles.blogDetails}>
						<div className={styles.datePublished}>
							<div className={styles.timeIcon}><IoMdTime /></div>
							<div>{printFormattedDate(blogInfo?.postedAt)}</div>
						</div>
						<div className={styles.tagsList}>
							{
								tags?.map((tag, index) => {
									return (
										<div key={index} className={styles.tag}>{`#${tag}`}</div>
									)
								})
							}
						</div>
					</div>
					{
						blogInfo?.videoUrl !== "NA" && (
							<div className={styles.resources}>
								<iframe
									src={`https://www.youtube.com/embed/${blogInfo?.videoUrl}`}
									title="YouTube video player"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									allowFullScreen
								/>
							</div>
						)
					}
					<div className={styles.content}>
						<div dangerouslySetInnerHTML={{ __html: blogInfo?.content }}></div>
					</div>
					{
						(blogInfo?.resourceUrl?.length > 0 && blogInfo?.resourceUrl !== "NA") &&
						<div>
							<div className={styles.mobileDownload}>
								<div className={styles.someContent}>
									<div><GiRingingBell /></div>
									<div>You can download a PDF version of Material</div>
								</div>
								<div onClick={() => {
									window.open(`${blogInfo?.resourceUrl}`, "_blank");
								}} className={styles.downloadPDF}>
									<div><BsDownload /></div>
									<div>Download PDF</div>
								</div>
							</div>
						</div>
					}
					<div className={styles.feedbackSection}>
						<FeedbackForm relatedBlogId={relatedBlogId} />
					</div>
				</div >
			)
		) : (
			<div style={{ textAlign: "center", marginTop: "20%", fontFamily: "Poppins", fontWeight: "600" }}>
				{`Blog with id ${id} Not Found`}
			</div>
		)
	);
}

export async function getServerSideProps(context) {
	try {
		const filterValue = context.params.id;
		if (filterValue === undefined)
			throw new Error("Invalid id");
		const dbRef = ref(realtimeDB, '/blogs');
		const snapshot = await get(dbRef);
		if (snapshot.exists()) {
			const allBlogs = snapshot.val();
			const filterKey = 'id';
			const filteredData = Object.values(allBlogs).filter(item => item[filterKey] === filterValue);
			if (filteredData) {
				return {
					props: {
						blogData: filteredData[0],
						id: context.params.id
					},
				};
			}
			return {
				props: {
					blogData: {},
					id: context.params.id
				}
			}
		}
	} catch (error) {
		console.error("Error fetching data123: ", error);
	}

	return {
		props: {
			blogData: {},
			id: context.params.id,
		},
	};
}