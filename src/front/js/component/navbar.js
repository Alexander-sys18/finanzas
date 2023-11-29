import React from "react";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg fixed-top navbar-light p-0 px-lg-5 mb-70">
			<div className="container-fluid containerDeNavbarHome">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">
							<img
							src="https://res.cloudinary.com/dronv3ars/image/upload/v1693774740/zyro-image__4_-removebg-preview_qxdzft.png"
							className="logo-img img-fluid"
							alt="Logo"
							/>
						</span> 
					</Link>
					<a
						className="navbar-toggler"
						type="link"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
						>
							<span className="landingButton"><i className="fa-solid fa-bars fa-lg"></i></span>
					</a>
				<div className="collapse navbar-collapse ml-auto" id="navbarNav">
					<ul className="navbar-nav landingNav">
						<li className="nav-item itemNav">
							<Link
								className="nav-link active text-light text-decoration-none"
								aria-current="page"
								to="/Nosotros"
								>
									Nosotros
							</Link>
						</li>
						<li className="nav-item itemNav">
							<Link
								className="nav-link text-light text-decoration-none"
								to="/Login"
								>
									Iniciar sesión
							</Link>
						</li>
						<li className="nav-item itemNav">
							<Link
								className="nav-link text-light text-decoration-none"
								to="/Registrarse"
							>
								Registrarse
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
