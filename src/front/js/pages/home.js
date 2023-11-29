import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div id="carouselExampleCaptions" className="carousel slide">
			<div className="carousel-indicators">
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
			</div>
			<div className="carousel-inner">
                <div id="carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
						<div className="carousel-item active">	
							<img
								src="https://res.cloudinary.com/dronv3ars/image/upload/v1694015259/Control_poe1p7.png"
								className="mx-auto img-fluid d-none d-lg-block large-img"
								alt="Imagen para dispositivos grandes"
							/>
							<img
								src="https://res.cloudinary.com/dronv3ars/image/upload/v1694000131/Registra_de_manera_sencilla_todos_tus_ingresos_y_egresos._posohs.png"
								className="mx-auto img-fluid d-lg-none" 
								alt="Imagen para dispositivos medianos y pequeños"
							/>
						</div>
						<div className="carousel-item">	
							<img
								src="https://res.cloudinary.com/dronv3ars/image/upload/v1694015266/Progreso_zd4y6m.png"
								className="mx-auto img-fluid d-none d-lg-block large-img"
								alt="Imagen para dispositivos grandes"
							/>
                       		<img
								src="https://res.cloudinary.com/dronv3ars/image/upload/v1694012091/ProgresoMobile_i8rhy4.png"
								className="mx-auto img-fluid d-lg-none" 
								alt="Imagen para dispositivos medianos y pequeños"
                        	/>
						</div>
						<div className="carousel-item">	
							<img
								src="https://res.cloudinary.com/dronv3ars/image/upload/v1694015280/Conversion_nlonf7.png"
								className="mx-auto img-fluid d-none d-lg-block large-img"
								alt="Imagen para dispositivos grandes"
							/>
                       		<img
								src="https://res.cloudinary.com/dronv3ars/image/upload/v1694013370/ConversionMobile_bcipg0.png"
								className="mx-auto img-fluid d-lg-none" 
								alt="Imagen para dispositivos medianos y pequeños"
                        	/>
						</div>
						<div className="carousel-item">	
							<img
								src="https://res.cloudinary.com/dronv3ars/image/upload/v1694017258/Manera_mqjaee.png"
								className="mx-auto img-fluid d-none d-lg-block large-img"
								alt="Imagen para dispositivos grandes"
							/>
                       		<img
								src="https://res.cloudinary.com/dronv3ars/image/upload/v1694017267/ManeraMobile_vp72co.png"
								className="mx-auto img-fluid d-lg-none" 
								alt="Imagen para dispositivos medianos y pequeños"
                        	/>
						</div>
                    </div>
                </div>    
            </div>
			<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
};
