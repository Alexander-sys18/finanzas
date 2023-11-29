import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/NavbarUserHome.css"

export const NavbarUserHome = () => {
    const { store, actions } = useContext(Context);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top px-lg-5" id="navUserHomeNicoSupremo">
            <div className="container-fluid containerDeNavbarUerHome">
                <Link className="navbar-brand" to="/Inicio"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693774740/zyro-image__4_-removebg-preview_qxdzft.png" className="logo-img img-fluid NicoNavbarUSerHomeImg"/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-bars fa-lg" style={{color: "white"}}></i>
                    </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active text-light" aria-current="page" to="/Inicio">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/Categorias">Personalizar Categorias</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/RegistroMovimientos" className="nav-link text-light">Registro de Movimientos</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/InformeDetallado" className="nav-link text-light">Informes Detallados</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#" onClick={handleLogout}>Cerrar sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
	);
};