import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import "../../styles/UserHome.css"
import { Link, useNavigate } from "react-router-dom";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

export const UserHome = () => {
    const { actions, store } = useContext(Context)
    const navigate = useNavigate()
    const { token } = useContext(Context);
    const [userData, setUserData] = useState(null);
    const currentMonth = new Date().getMonth();
    const [totalIngresos, setTotalIngresos] = useState(0);
    const [totalGastos, setTotalGastos] = useState(0);
    const [saldoDisponible, setSaldoDisponible] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [dolarBcv, getDollarBCV] = useState('');
    const [dolarParalelo, getDollarParelelo] = useState('');
    const [moneyRegisterData, setMoneyRegisterData] = useState([]);

    const fetchUserData = async () => {
        const options = {
            headers: {
                "Authorization": "Bearer " + store.token,
            },
        }
        try {
            const response = await axios.get(
                process.env.BACKEND_URL + "/api/protected",
                options
            );
            setUserData(response.data);
            const registrosDinero = response.data.money_register;

            const totalIngresos = registrosDinero.reduce((total, transaccion) => {
                if (transaccion.tipo_movimiento === "Ingresos") {
                    return total + transaccion.monto;
                }
                return total;
            }, 0);
            
            const totalGastos = registrosDinero.reduce((total, transaccion) => {
                if (transaccion.tipo_movimiento === "Egresos") {
                    return total + transaccion.monto;
                }
                return total;
            }, 0);
            
            const saldoDisponible = totalIngresos - totalGastos;

            setTotalIngresos(totalIngresos);
            setTotalGastos(totalGastos);
            setSaldoDisponible(saldoDisponible);

        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };
    useEffect(() => {

        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            const now = new Date();
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (6 - i));
                return formatDate(date);
            });
    
            const data = last7Days.map(date => {
                const utcDate = new Date(date);
                const dailyIncomes = userData.money_register.reduce((total, transaction) => {
                    const transactionDate = new Date(transaction.time_selected);
                    if (transactionDate.toISOString().split('T')[0] === utcDate.toISOString().split('T')[0] &&
                        transaction.tipo_movimiento === "Ingresos") {
                        return total + transaction.monto;
                    }
                    return total;
                }, 0);
            
                const dailyExpenses = userData.money_register.reduce((total, transaction) => {
                    const transactionDate = new Date(transaction.time_selected);
                    if (transactionDate.toISOString().split('T')[0] === utcDate.toISOString().split('T')[0] &&
                        transaction.tipo_movimiento === "Egresos") {
                        return total + transaction.monto;
                    }
                    return total;
                }, 0);
            
                return {
                    date,
                    dailyIncomes,
                    dailyExpenses
                };
            });
            
    
            setChartData(data);
        }
    }, [userData]);
    
    function formatDate(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
    
    useEffect(() => {
        if (chartData.length > 0) {
            const ctx = document.getElementById("myChart").getContext("2d");

            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: chartData.map(data => data.date),
                    datasets: [
                        {
                            label: "Ingresos",
                            backgroundColor: "rgba(75, 192, 192, 0.5)",
                            data: chartData.map(data => data.dailyIncomes),
                        },
                        {
                            label: "Egresos",
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                            data: chartData.map(data => data.dailyExpenses),
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }, [chartData]);

    const fetchMoneyRegisterData = async () => {
        const options = {
            headers: {
                "Authorization": "Bearer " + store.token,
            },
        }
        try {
            const response = await axios.get(
                process.env.BACKEND_URL + "/api/money-register-data",
                options
            );
            setMoneyRegisterData(response.data);
        } catch (error) {
            console.error("Error fetching money register data", error);
        }
    };

    const mensajesDeInspiracion = [
        "Cada pequeño ahorro te acerca a tus metas financieras.",
        "La disciplina financiera es la clave para la libertad económica.",
        "El control de gastos es el camino hacia la estabilidad financiera.",
        "Invierte en conocimiento financiero; es tu mejor inversión.",
        "El ahorro constante es la base de la riqueza futura.",
        "Gasta sabiamente hoy para disfrutar de un mañana más seguro.",
        "Cada inversión es un paso hacia un futuro financiero más sólido.",
        "El éxito financiero comienza con una planificación cuidadosa.",
        "Las deudas pueden ser cadenas; rompe esas cadenas con responsabilidad.",
        "El tiempo es tu aliado en el mundo de las inversiones.",
        "La paciencia en las finanzas te llevará lejos.",
        "El dinero no es el fin, sino el medio para lograr tus objetivos.",
        "El conocimiento financiero te empodera a tomar decisiones informadas.",
        "La consistencia en tus hábitos financieros marca la diferencia.",
        "La diversificación de tus inversiones reduce los riesgos financieros.",
        "Cada gasto innecesario es un obstáculo en el camino hacia la riqueza.",
        "El ahorro es una inversión en tu futuro financiero.",
        "El presupuesto es tu brújula hacia el éxito financiero.",
        "Las pequeñas inversiones hoy pueden generar grandes recompensas mañana.",
        "La planificación financiera te da el control de tu destino económico.",
        "Aprender de los errores financieros es una lección valiosa.",
        "La inversión en educación financiera siempre tiene un alto rendimiento.",
        "La consistencia en el ahorro te sorprenderá con el tiempo.",
        "Cada decisión financiera importa; elige sabiamente.",
        "La inversión en ti mismo es la inversión más valiosa que puedes hacer.",
        "La gratificación retrasada te acerca a tus objetivos financieros.",
        "El conocimiento de tus gastos es el primer paso hacia el ahorro.",
        "La inversión en activos genera ingresos pasivos.",
        "Cuida tu crédito; es una herramienta poderosa en las finanzas.",
        "La paciencia y la perseverancia son tus aliados en la inversión.",
        "El ahorro consistente es la base de la seguridad financiera.",
        "El dinero no duerme, pero tú debes descansar; diversifica tus ingresos.",
        "La educación financiera es la puerta de entrada a la libertad económica.",
        "Mide tu riqueza en tiempo y libertad, no solo en dinero.",
        "La inversión en bienestar y salud es una inversión en tu riqueza.",
        "Cada día es una oportunidad para mejorar tu situación financiera.",
        "La riqueza no es solo cuánto tienes, sino cómo lo usas.",
        "Los sueños financieros requieren acción; comienza hoy mismo.",
        "La inversión en habilidades siempre tiene un retorno positivo.",
        "El camino hacia la riqueza es un maratón, no una carrera.",
        "La diversificación de tus fuentes de ingresos es una estrategia inteligente.",
        "La perseverancia en las dificultades financieras te hace más fuerte.",
        "La inversión en relaciones sólidas también es una inversión financiera.",
    ];
    
    const mensajeInspiradorAleatorio = () => {
        const indiceAleatorio = Math.floor(Math.random() * mensajesDeInspiracion.length);
        return mensajesDeInspiracion[indiceAleatorio];
    };

    useEffect (() => {
        actions.getDollarBCV()
        actions.getDollarParelelo()
      },[])

    useEffect (() => {
        actions.checkLogin(navigate)
        fetchMoneyRegisterData()
      },[])

      const formatDateForTable = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container-fluid contarinerGeneralUserHomejs">
                <div className="presentationUserHome">
                    {userData ? (
                        <div className="welcomeMessage">
                        <h1 className="welcomeText">Bienvenido, {userData.user_name}</h1>
                        <p className="inspirationalMessage">{mensajeInspiradorAleatorio()}</p>
                        </div>
                    ) : (
                        <p className="loadingMessage">Cargando...</p>
                    )}
                </div>
            <Link className="container containerDeUsreHomejsonelinea" to="/Ingresos">
                <div className="mininavbarUserHome">
                    <h6 className="h6NicoUserHomejs"><strong>Total ingresos:</strong></h6><i className="fa-solid fa-money-bill-trend-up iconfontawesomeIngresos" style={{color: "white"}}></i>
                </div>
                    <h1 id="sumatotaldemovimientosverde" className="sumatotaldemovimientos">$ {totalIngresos.toFixed(2)}</h1>
                    <p className="letrasPequenasEnUserHomeDetalles">Haz Click para ver el detalle</p>
            </Link>
            <Link className="container containerDeUsreHomejsonelinea" to="/Egresos">
                <div className="mininavbarUserHome">
                    <h6 className="h6NicoUserHomejs"><strong>Total egresos:</strong></h6><i className="fa-solid fa-arrow-trend-down iconEgresosUserHomeNico" style={{color: "white"}}></i>
                </div>
                    <h1 id="sumatotaldemovimientosrojo" className="sumatotaldemovimientos">$ {totalGastos.toFixed(2)}</h1>
                    <p className="letrasPequenasEnUserHomeDetalles">Haz Click para ver el detalle</p>
            </Link>
            <div className="container containerDeUsreHomejsonelinea">
                <div className="mininavbarUserHome">
                    <h6 className="h6NicoUserHomejs"><strong>Saldo disponible:</strong></h6><i className="fa-solid fa-sack-dollar" style={{color: "white"}}></i>
                </div>
                    <h1 id="sumatotaldemovimientosamarillo" className="sumatotaldemovimientos">$ {saldoDisponible.toFixed(2)}</h1>
            </div>
            <div className="container containerDeUsreHomejsonelinea">
                <div className="mininavbarUserHome">
                    <p className="h6NicoUserHomejs"><strong>Valor del $ hoy:</strong></p><i className="fa-solid fa-dollar-sign" style={{color: "white"}}></i>
                </div>
                    <h1 id="sumatotaldemovimientosnegro" className="sumatotaldemovimientossegundo">BCV: Bs {store.dolarBcv}</h1>
                    <h1 id="sumatotaldemovimientosnegro" className="sumatotaldemovimientossegundo">Paralelo: Bs {store.dolarParalelo}</h1>
            </div>
            <div className="container containerDechartHomejs">
                {/* <h3 className="pdegrafica1Nico">Observa diariamente como se mueven tus estadísticas del mes actual!</h3> */}
                <canvas id="myChart" width="5vh" height="3vh"></canvas>
                <p className="letrasPequenasEnUserHomeDetalles">Últimos 7 días de movimientos</p>
            </div>
            <div className="container containerDeUsreHomejs">
                <table className="custom-table">
                    <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Tipo de Movimiento</th>
                        <th>Monto</th>
                    </tr>
                    </thead>
                    <tbody>
                    {moneyRegisterData
                        .slice()
                        .sort((a, b) => new Date(b.time_selected) - new Date(a.time_selected))
                        .map((transaction, index) => (
                        <tr key={index} className={transaction.tipo_movimiento === "Ingresos" ? "ingresos" : "egresos"}>
                            <td>{formatDateForTable(transaction.time_selected)}</td>
                            <td>{transaction.tipo_movimiento}</td>
                            <td>{transaction.monto}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};