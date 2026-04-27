import learnup from "../assets/images/learnup/thumbnail.png";
import foodhunt from "../assets/images/foodhunt/thumbnail.png";
import cyberduo from "../assets/images/cyberduo/thumnail.png";
import readysetcode from "../assets/images/readysetcode/thumbnail.png";
import teachersday from "../assets/images/pubmats/teachersday.png";
import allsoulsday from "../assets/images/pubmats/allsoulsday.png";
import newyear from "../assets/images/pubmats/newyear.png";
import goodluckmidterm from "../assets/images/pubmats/goodluckmidterm.png";

export type Project = {
	id: string;
	title: string;
	description: string;
	tags: string;
  thumbnailUrl?: string;
  imagesUrl?: Array<string>;
	colors?: Array<string>;
	typefaces?: Array<string>;
	links?: Array<{ label: string; url: string; status: "active" | "inactive" }>;
};

export const projects: Project[] = [
	{
		id: "project-01",
		title: "LearnUp",
		description:
			"LearnUp is a platform that offers a wide range of courses and tutorials on various topics, including web development, mobile app development, and more. Whether you're a beginner or an experienced developer, you'll find something that suits your needs.",
		tags: "UI/UX Design · Figma · Prototype",
		thumbnailUrl: learnup,
		imagesUrl: [""],
		colors: ["#F5F5F5", "#FFFFFF"],
		typefaces: [""],
		links: [
			{ label: "Unavailable", url: "#", status: "inactive" }
		]
	},
	{
		id: "project-02",
		title: "FOOD HUNT",
		description:
			"Food Hunt is a mobile app that helps you find the best restaurants and food spots in your area. With a user-friendly interface and a vast database of eateries, Food Hunt makes it easy to discover new dining experiences and satisfy your cravings.",
		tags: "UI/UX Design · Figma · Prototype",
		thumbnailUrl: foodhunt,
		imagesUrl: [""],
		colors: ["#F5F5F5", "#FFFFFF"],
		typefaces: [""],
		links: [
			{ label: "Unavailable", url: "#", status: "inactive" }
		]
	},
	{
		id: "project-03",
		title: "CYBERDUO",
		description:
			"Explore the world of mobile games and discover strategies to beat your friends and enemies. Whether you're a casual gamer or a hardcore gamer, we have something for everyone.",
		tags: "HTML · CSS · JavaScript",
		thumbnailUrl: cyberduo,
		imagesUrl: [""],
		colors: ["#F5F5F5", "#FFFFFF"],
		typefaces: [""],
		links: [
			{ label: "View Live", url: "https://cyberduo.vercel.app/", status: "active" }
		]
	},
	{
		id: "project-04",
		title: "Ready Set Code",
		description:
			"Ready Set Code is a platform that offers a wide range of courses and tutorials on various topics, including web development, mobile app development, and more. Whether you're a beginner or an experienced developer, you'll find something that suits your needs.",
		tags: "HTML · CSS · JavaScript",
		thumbnailUrl: readysetcode,
		imagesUrl: [""],
		colors: ["#F5F5F5", "#FFFFFF"],
		typefaces: [""],
		links: [
			{ label: "View Live", url: "https://readysetcode.vercel.app/", status: "active" }
		]
	},
	{
		id: "pubmat-01",
		title: "WORLD TEACHERS'  DAY 2025",
		description:
			"In celebration of World Teachers' Day 2025, we created a captivating poster design that pays tribute to the dedication and impact of educators worldwide.",
		tags: "PUBMAT · Figma · Layout",
		thumbnailUrl: teachersday,
		imagesUrl: [""],
		colors: ["#F5F5F5", "#FFFFFF"],
		typefaces: [""],
		links: [
			{ label: "View Facebook", url: "https://www.facebook.com/share/p/18ZQ6ak14K/", status: "active" }
		]
	},
	{
		id: "pubmat-02",
		title: "ALL SOULS' DAY 2025",
		description:
			"In commemoration of All Souls' Day 2025, we designed a poignant poster that honors the memory of departed loved ones and celebrates the enduring bond between the living and the deceased.",
		tags: "PUBMAT · Figma · Layout",
		thumbnailUrl: allsoulsday,
		imagesUrl: [""],
		colors: ["#F5F5F5", "#FFFFFF"],
		typefaces: [""],
		links: [
			{ label: "View Facebook", url: "https://www.facebook.com/share/p/1T1FRno4wK/", status: "active" }
		]
	},
	{
		id: "pubmat-03",
		title: "HAPPY NEW YEAR 2026",
		description:
			"In celebration of the new year, we created a vibrant poster that captures the excitement and possibilities of the year ahead.",
		tags: "PUBMAT · Figma · Layout",
		thumbnailUrl: newyear,
		imagesUrl: [""],
		colors: ["#F5F5F5", "#FFFFFF"],
		typefaces: [""],
		links: [
			{ label: "View Facebook", url: "https://www.facebook.com/share/p/1D3piXKA5R/", status: "active" }
		]
	},
	{
		id: "pubmat-04",
		title: "MIDTERM EXAMS GOOD LUCK",
		description:
			"Wishing all students the best of luck on their midterm exams! May your hard work and dedication pay off with great results.",
		tags: "PUBMAT · Figma · Layout",
		thumbnailUrl: goodluckmidterm,
		imagesUrl: [""],
		colors: ["#F5F5F5", "#FFFFFF"],
		typefaces: [""],
		links: [
			{ label: "View Facebook", url: "https://www.facebook.com/share/p/1DmPju2Gaw/", status: "active" }
		]
	},
];

export default projects;
