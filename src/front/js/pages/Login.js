import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css"
import { Context } from "./../store/appContext";

export const Login = () => {
    const {actions} = useContext(Context)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        try {
            const response = await axios.post(
                process.env.BACKEND_URL + "/api/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }
            );
            actions.savetoken(response.data.token)
            console.log("Inicio de sesión exitoso", response.data);
            // You can perform any necessary action after successful login, like redirecting the user.
            mostrarAlerta1()
            navigate("/Inicio")
        } catch (error) {
            mostrarAlerta2()
            console.error("Error al iniciar sesión", error.response.data);
        }
    };

    const mostrarAlerta1 = () => {
        swal({
            title: 'Inicio de sesión exitoso',
            // text: `Inicio de sesión exitoso`,
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
            title: 'Correo o Contraseña Invalidad',
            // text: `Inicio de sesión exitoso`,
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
        <div className="container-fluid containerDeLoginjs">
        <div className="container-fluid FondoRegistroDeLogin">
        </div>
        <div className="container containerDeLoginjssegundo">
            <h3 id="tituloDeLogin"><i className="fa-solid fa-user"></i> Iniciar sesión</h3>
            <form onSubmit={handleSubmit} className="formularioDeLogin">
                <input className="inputDeLogin" type="email" name="email" placeholder="Correo electrónico" required />
                <input className="inputDeLogin" type="password" name="password" placeholder="Contraseña" required />
                <button className="buttonCargadeDatosDeLogin btn btn-outline-dark" type="submit">Iniciar sesión  <i className="fa-solid fa-arrow-right"></i></button>
            </form>
            <p style={{whiteSpace: 'nowrap', display: 'inline-block'}} className="d-flex">¿Aún no tienes una cuenta? <Link to="/registro" style={{marginLeft: '5px'}}>Registrarse</Link></p>
        </div>
    </div>
    );
};
