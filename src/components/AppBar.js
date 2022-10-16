import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout} from "../store/auth.js";


export default function ButtonAppBar({firstName}) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const dispatch = useDispatch();

  function _logout() {
    Cookies.remove("token");
    dispatch(logout());
    navigate("/login");
  }

  const person = useSelector((state) => state.auth.user)
  // const user = person.firstName

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {
            !isAuthenticated && (
              <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link className="text-white" to="/">
                  Code Diary
                </Link>
            </Typography>
             
             <Link to="/login" className="text-white">
               <Button color="inherit">Login</Button>
             </Link>
             <Link to="/register" className="text-white">
               <Button color="inherit">Register</Button>
             </Link>
           </>
            )
          }
        
        {
            isAuthenticated && (
              <>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link className="text-white" to="/">
                    {/* {user}'s Code Diary */}
                    {person}'s Code Diary
                  </Link>
                </Typography>

                <Button color="inherit" onClick={_logout}>
                  Logout
                </Button>
              </>
            
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}