import React, { useState, useEffect, useContext } from "react";
import { Context } from "./store/appContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Redirect } from "react-router-dom";

import { Home } from "./pages/home";
import { Login } from "./pages/Login";
import { Single } from "./pages/single";
import { Registro } from "./pages/Registro";
import { Movimientos } from "./pages/Movimientos";
import { Ingresos } from "./pages/Ingresos";
import { Egresos } from "./pages/Egresos";
import injectContext from "./store/appContext";
import { UserHome } from "./pages/userHome";
import { NavbarUserHome} from "./component/NavbarUserHome";
import { CharDetail} from "./pages/chartDetails"
import { TypesOfCategories } from "./pages/TypesOfCategories";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Nosotros } from "./pages/Nosotros";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;
    const { store } = useContext(Context) 
    
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    
    //     if (token) {
    //       setIsLoggedIn(true);
    //     }
    //   }, []);

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                {store.token ? <NavbarUserHome /> : <Navbar />}
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/Login"/>
                        <Route element={<Nosotros />} path="/Nosotros"/>
                        <Route element={<Registro />} path="/Registrarse" />
                        <Route element={<Movimientos />} path="/RegistroMovimientos" />
                        <Route element={<Ingresos />} path="/Ingresos" />
                        <Route element={<Egresos />} path="/Egresos" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<UserHome />} path="/Inicio" />
                        <Route element={<CharDetail />} path="/InformeDetallado" />
                        <Route element={<TypesOfCategories />} path="/Categorias" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);