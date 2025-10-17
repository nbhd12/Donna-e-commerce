import { SignInForm } from "../../components/signinForm/signinForm";
import "./signinPage.css";

export const SignInPage = () => {
    return (
        <div className="signin-page">
            <div className="signin-container">
                <SignInForm/>
            </div>
        </div>
    );
};