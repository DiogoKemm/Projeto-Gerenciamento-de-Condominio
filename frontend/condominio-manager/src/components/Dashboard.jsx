import React, { useState, useEffect } from "react";

const Dashboard = ({ role }) => {
    const [countMercadorias, setCountMercadorias] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            const token = localStorage.getItem("token")

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
        <>
            <p>Você está logado como: {role}</p>
            <p>Número de mercadorias: {countMercadorias.total}</p>
        </>
    )

};

export default Dashboard;
