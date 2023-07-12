import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar";
import { setUser } from "./store/auth.js";

function App() {
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const {user} = await res.json();
      dispatch(setUser(user));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUser();
// eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <p>Loading ... This may take a while depending on network. if it persists kindly refresh the page. Thanks</p>;
  }

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
