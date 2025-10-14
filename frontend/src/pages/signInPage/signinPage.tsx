// //sampletext
// import { useState } from "react";
// import "./signinPage.css";
// import type {ApiUserResult} from "../../../";
// import {useAuthContext} from "../../../core/AuthContext";
// import {useNavigate} from "react-router";


// interface SignInFormData {
//     email: string;
//     password: string;
// }

// const defSignInFormData: SignInFormData ={
//     email: "",
//     password: "",
// };

// export const SignIn = () => {
//     const [formData,setFormData] = useState<SignInFormData> (defSignInFormData);
//     const [submitError, setSubmitError] = useState <string | null> (null);
    
//     const {setUser, setToken} = useAuthContext();
//     const navigate = useNavigate();

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const {name,value} = event.target;

//     setFormData((prev) => ({...prev, [name]: value }));
//     };

//     const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         try{
//             const resposne = await fetch ()
//         }
//     }

// } 