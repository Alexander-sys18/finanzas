import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Ingresos&Egresos.css"
import swal from 'sweetalert';

export const Ingresos = () => {
    const { store, actions } = useContext(Context);
    const [ingresos, setIngresos] = useState([]);
    const navigate = useNavigate();

    const fetchIngresos = async () => {
        try {
            const API_URL = process.env.BACKEND_URL;
            const response = await fetch(API_URL + "/api/ObtenerIngresos", {
                headers: {
                    "Authorization": "Bearer " + store.token
                }
            });

            if (response.status !== 200) {
                console.log("Error en la solicitud. Código: ", response.status);
                return;
            }

            const data = await response.json();
            setIngresos(data.ingresos);
        } catch (error) {
            console.log(error);
        }
    };



    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    

    useEffect(() => {
        actions.checkLogin(navigate);
        fetchIngresos();
    }, []);

    const sortIngresosByDate = (ingresos) => {
        return ingresos.sort((a, b) => {
            const dateA = new Date(a.time_selected);
            const dateB = new Date(b.time_selected);
            return dateB - dateA;
        });
    };

    const handleDelete = async (ingresoId) => {
        if (!ingresoId || typeof ingresoId !== 'number' || isNaN(ingresoId)) {
            return;
        }
    
        try {
            const API_URL = process.env.BACKEND_URL;
            swal({
                title: '¿Está seguro de que desea eliminar el ingreso?',
                icon: 'warning',
                buttons: {
                    no: {
                        text: "No",
                        value: false,
                        className: "custom-button-no",
                    },
                    yes: {
                        text: "Si",
                        value: true,
                        className: "custom-button-yes",
                    },
                },
                customClass: {
                    modal: 'custom-modal', 
                },
            }).then(async (respuesta) => {
                if (respuesta) {
                    const response = await fetch(API_URL + `/api/EliminarIngreso/${ingresoId}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": "Bearer " + store.token
                        }
                    });
    
                    if (response.status !== 200) {
                        console.log("Error en la solicitud. Código: ", response.status);
                        return;
                    }
    
                    await fetchIngresos();
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
      

    return (
        <div className="container containerIngresosNicoSuper">
            <div className="containerTituloIngresosyEgresosNico">
                <h2><i className="fa-solid fa-money-bill-trend-up iconDeIngresosIngresos" style={{color: "black"}}></i>Ingresos</h2>
            </div>
            <div className="table-responsive">
                <table className="table custom-table">
                    <thead style={{background: "rgba(75, 192, 192, 0.4)"}}>
                        <tr>
                            <th className="custom-header">Fecha</th>
                            <th className="custom-header">Movimiento</th>
                            <th className="custom-header">Categoría</th>
                            <th className="custom-header">Monto</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortIngresosByDate(ingresos).map((ingreso) => (
                            <tr key={ingreso.id} className="custom-row">
                                <td className="custom-cell">{formatDate(ingreso.time_selected)}</td>
                                <td className="custom-cell">{ingreso.tipo_movimiento}</td>
                                <td className="custom-cell">{ingreso.tipo_categoria}</td>
                                <td className="custom-cell">{ingreso.monto}</td>
                                <td className="custom-cell">
                                    <button
                                        className="btn btn-danger btnNicoIngresos"
                                        onClick={() => handleDelete(ingreso.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );     
    }