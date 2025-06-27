import React, { useState, useEffect } from "react";
import "../App.css"

const Dashboard = ({ role }) => {
    const [countMercadorias, setCountMercadorias] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            const token = sessionStorage.getItem("token")
            const data = await fetch("http://localhost:8080/countMercadorias", {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            const json = await data.json();
            setCountMercadorias(json)
        }
        fetchData().catch(console.error);
    }, []);

    return (
        <div id='dashboard'>
            <p>
                <strong>Você está logado como:</strong> {role}
            </p>
            <p>
                <strong>Número de mercadorias</strong>
                <span id='countMercadorias'><br></br>{countMercadorias.total}</span>
            </p>
        </div>
    )

};

export default Dashboard;
