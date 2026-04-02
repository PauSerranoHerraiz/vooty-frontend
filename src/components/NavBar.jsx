import { Link } from "react-router-dom";

function NavBar(){
    return(
        <>
        <h1>This is the NavBar</h1>
         <Link to="/create">
        <button>+ Crear encuesta</button>
      </Link>
        </>
    )
}

export default NavBar