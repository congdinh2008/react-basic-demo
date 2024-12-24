import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

const Home = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const gotoAbout = () => {
        navigate('/about');
    }

    return (
        <section>
            <h1 className="text-2xl font-semibold">Welcome {isAuthenticated ? "Yes" : "No"}</h1>
            <button className="p-2 px-4 bg-blue-500 rounded-full text-white" onClick={gotoAbout}>
                Go to About
            </button>
        </section>
    );
}

export default Home;