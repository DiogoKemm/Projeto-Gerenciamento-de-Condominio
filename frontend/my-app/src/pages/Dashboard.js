import React from "react";
import ButtonMenu from "../components/ButtonMenu";

const Dashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
      // verifica se já está logado
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);
  
    const handleLogin = () => {
      setIsLoggedIn(true);
    };
  
    const handleLogout = () => {
      // Clear the token from localStorage
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    };
    return (
        <>
        {isLoggedIn ? (
       <ButtonMenu/>
        ) : (<Login onLogin={handleLogin}/>)}
        </>
    )
};

export default Dashboard;
