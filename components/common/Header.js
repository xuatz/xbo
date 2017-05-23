import Link from "next/link";
import axios from "axios";

const linkStyle = {
	marginRight: 15
};

const Header = () => (
	<div>
		<Link href="/">
			<a style={linkStyle}>Home</a>
		</Link>
		<Link href="/about">
			<a style={linkStyle}>About</a>
		</Link>
		<a
			href="#"
			onClick={e => {
				let API = axios.create({
					baseURL: process.env.API_URL,
					withCredentials: true,
					timeout: 5000
				});

				API.get("/auth/logout").then(res => {
					console.log(res);
					window.location.reload();
				});
			}}>
			shitty logout
		</a>
	</div>
);

export default Header;
