import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signinForm.css"
import { useAuthContext } from "../../contexts/authenticationContext";

export const SignInForm = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)

    const {setUser, setToken} = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (event : React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

    try{
        const response = await fetch("http://localhost:5000/api/users/signin", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email,password}),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message || "Invalid Credentials");
            setLoading(false);
            return;
        }

        setUser(data.user);
        setToken(data.token);

        navigate("/Category");
    } catch (error) {
        console.error("Sign in Error!", error);
        setError("Network Error. Please try again.");
        setLoading(false);
    } 
};

return(
    <form className="signin" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}

        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event)=> setEmail(event.target.value)}
        required
        disabled={loading}
        />

        <input
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={(event)=> setPassword(event.target.value)}
        disabled={loading}
        />

        <button type="submit" disabled={loading}>
            {loading? "Signing in...": "Sign In"}
        </button>

        <p className="signup-link">
            Don't have an account yet? <Link to="/SignUp">Sign Up</Link>
        </p>

    </form>
);
};