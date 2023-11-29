import React from "react";
import "../../styles/nosotros.css";
import 'animate.css'


export const Nosotros = () => {
    return (
        <div className="container principalNosotros">
            <h1 className="titulo text-center">Desarrolladores</h1>
            <div className="container containerNosotrosTodos">
                <div className="container containerPrincipalFotoNosotros">
                    <div className="container containerCirculoParaFotoNosotrosLeo">
                    </div>
                    <div className="containerFotoNombresNosotrosLeo">

                    </div>
                </div>
                <div className="container containerPrincipalFotoNosotros">
                    <div className="container containerCirculoParaFotoNosotros">
                    </div>
                    <div className="containerFotoNombresNosotros">

                    </div>
                </div>
                <div className="container containerPrincipalFotoNosotros">
                    <div className="container containerCirculoParaFotoNosotrosRuben">
                    </div>
                    <div className="containerFotoNombresNosotrosRuben">

                    </div>
                </div>
            </div>
            <div className="container tech d-flex">
                    <h1 className="tecnologias">Tecnologías</h1>
                <div className="logo containerlogosTecnologiasSuperNico">
                    <div class="logo-row justify-content-center d-flex mb-3">
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269073/html_slnwee.png" className="icon" alt="HTML Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269078/css3_bit3fz.png" className="icon" alt="CSS Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269115/bootstrap_aiuuuw.png" className="icon" alt="Bootstrap Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269111/javascript_ebr6td.png" className="icon" alt="JavaScript Logo"/></span>
                    </div>
                    <div className="logo-row justify-content-center d-flex">
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269107/react_vnhobk.png" className="icon" alt="React Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269097/postgresql_jp7vii.png" className="icon" alt="PostgreSQL Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269086/flask_yi0gfl.png" className="icon" alt="Flask Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269082/python_kygkmg.png" className="icon" alt="Python Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269069/chart-removebg-preview_jvqkvr.png" className="icon" alt="Chart Logo"/></span>
                    </div>
                </div>
            </div>
            <div className="container proyeccion align-items-center d-flex">
                <h1 className="titulo">Proyección</h1>
                <div className="roadmap">
                    <span className="roadmap"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693770125/Proyeccion_sin_fondo_sgxivj.png" className="iconroadmap" alt="map"/></span>
                </div>
            </div>
    </div>
    )
}

