import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signupForm.css";
import { useAuthContext } from "../../contexts/authenticationContext";


interface SignUpFormData {
    first_name: string;
    last_name:string;
    email: string;
    password: string;
    verifyPassword: string;
}

export const SignUpForm = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        verifyPassword:"",
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {setUser, setToken} = useAuthContext();
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const feildName = event.target.name;
        const feildValue = event.target.value;

        setFormData((prev) => ({...prev, [feildName]: feildValue}));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLElement>) =>{
        event.preventDefault();
        setError(null);

        if (formData.password.length < 4){
            setError("Password must be at least 4 characters");
            return;
        }

        setLoading(true);

        try{
            const {verifyPassword, ...SignUpData} = formData;

            const response = await fetch("http://localhost:5000/api/users/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(SignUpData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Sign up failed");
                setLoading(false);
            return;            
            }

            setUser(data.user);
            setToken(data.token);

            navigate("/profile");
            } catch (error) {
                console.error("Sign up error:", error);
                setError("Shoot! Seems like you have a network error. Please try again!");
                setLoading(false);
            }
    };

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            {error && <p className="error">{error}</p>}

            <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
            disabled={loading}
            />

            <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
            disabled={loading}
            />

            <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            />

            <input
            type="password"
            name="verifyPassword"
            placeholder="Confirm Password"
            value={formData.verifyPassword}
            onChange={handleChange}
            required
            disabled={loading}
            />

            <button 
            type="submit" 
            disabled={loading}>
            {loading? "Creating account...": "Sign Up"}
            </button>

        </form>
    );
};