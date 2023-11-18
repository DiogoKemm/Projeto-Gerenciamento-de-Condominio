import React from "react";
import { Outlet, Link } from "react-router-dom";

function ButtonMenu() {
    return (
        <>
            <Link to="/CadastrarMorador">
            <button type="button" class="btn">Cadastrar morador</button>
            </Link>
            <Link to="/ListaApartamentos">
            <button type="button" class="btn">Lista de apartamentos</button>
            </Link>
            <Link to="/ListaMercadoras">
            <button type="button" class="btn">Lista de mercadorias</button>
            </Link>
            <Link to="/CadastrarZelador">
            <button type="button" class="btn">Cadastrar zelador</button>
            </Link>
            <Link to="/Conflitos">
            <button type="button" class="btn">Conflitos</button>
            </Link>
            <Outlet/>
        </>
    );
}

export default ButtonMenu;