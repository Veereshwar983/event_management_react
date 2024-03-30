import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Logout = ({ loggedIn, handleLogout }) => {

    const navigate = useNavigate();

    const tempHandleLogout = () => {
        navigate('/login')
        handleLogout();
    }
  return (
    <>
      {loggedIn ? (
        <Button color="inherit" onClick={tempHandleLogout}>Logout</Button>
      ) : (
        <Button component={Link} to="/login" color="inherit"></Button>
      )}
    </>
  );
};

export default Logout;
