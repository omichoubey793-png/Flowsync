import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (

    <>
      {isLoggedIn ? (

        <Home setIsLoggedIn={setIsLoggedIn} />

      ) : (

        <Login
          setIsLoggedIn={setIsLoggedIn}
        />

      )}
    </>

  );
}

export default App;