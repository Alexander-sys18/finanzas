import React, { useState } from "react";
import axios from "axios";
import "../../styles/Registro.css"
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export const Registro = () => {
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            user_name: e.target.user_name.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            password: e.target.password.value
        };

        try {
            const response = await axios.post(
                process.env.BACKEND_URL+"/api/signup",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            );
            // console.log("Registro exitoso", response.data);
            mostrarAlerta1()
            navigate("/Login")
        } catch (error) {
          mostrarAlerta2()
            console.error("Error al registrar", error);
        }

    };

      const mostrarAlerta1 = () => {
        swal({
            title: 'Registro exitoso',
            // text: `Registro exitoso`,
            icon: 'success',
            timer: '3000',
          buttons: {
            yes: {
              text: "Ok",
              value: true,
              className: "custom-button-yes",
            },
          },
          customClass: {
            modal: 'custom-modal', 
          },
        })
      };

      const mostrarAlerta2 = () => {
        swal({
            title: 'Usuario o Correo ya existente',
            // text: `Registro exitoso`,
            icon: 'success',
            timer: '3000',
          buttons: {
            yes: {
              text: "Ok",
              value: true,
              className: "custom-button-yes",
            },
          },
          customClass: {
            modal: 'custom-modal', 
          },
        })
      };

    return (
        <div className="container-fluid containerDeRegistrojs">
        <div className="container-fluid FondoRegistroDeUsuario">
        </div>
        <div className="container containerDeRegistrojsSegundo">
            <h4 id="tituloRegistroDeUsuario"><i className="fa-solid fa-user"></i> Registro de Usuario</h4>
            <form onSubmit={handleSubmit} className="formularioDeRegistroDeUsuario">
                <input className="inputRegistroDeUsuario" type="text" name="user_name" placeholder="Nombre de usuario" required />
                <input className="inputRegistroDeUsuario" type="text" name="first_name" placeholder="Nombre" required />
                <input className="inputRegistroDeUsuario" type="text" name="last_name" placeholder="Apellido" required />
                <input className="inputRegistroDeUsuario" type="email" name="email" placeholder="Correo electrónico" required />
                <input className="inputRegistroDeUsuario" type="password" name="password" placeholder="Contraseña" required />
                <button className="buttonCargadeDatosDeRegistroDeUsuario btn btn-outline-dark" type="submit">Registrarse  <i className="fa-solid fa-arrow-right"></i></button>
            </form>
            <p style={{whiteSpace: 'nowrap', display: 'inline-block', flexDirection: 'row'}}>¿Ya te registraste?<Link to="/Login" style={{marginLeft: '5px'}}>Iniciar sesión</Link></p>
        </div>
        </div>
    );
};