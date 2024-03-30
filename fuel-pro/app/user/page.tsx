// // Login.js
// 'use client';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { redirect } from 'next/navigation';

// function Login() {
//     const [formData, setFormData] = useState({ username: '', password: '' });
//     const [error, setError] = useState<string | null>(null);
//     const [isValidUser, setIsValidUser] = useState<boolean>(false);
//     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         console.log(formData)

//         try {
//             const response = await axios.post("http://localhost:4000/user", formData);

//             console.log('Login successful:', response.data);
//             console.log('Response:', response); // Log the response object
//             console.log('Data:', response.data); // Log the data property of the response
//             setFormData({ username: '', password: '' });
//             setError(null);
//             setIsValidUser(true);
//             setIsLoggedIn(true);
//             redirect('/dashboard'); // Redirect to the dashboard
//         } catch (error: any) {
//             console.error('Error during login:', error);
//             setError(error.response.data.error);
//             setIsValidUser(false);
//         }
//     };

//     if (isLoggedIn) {
//         return redirect('/dashboard'); // Redirect if logged in
//     }

//     return (
//         <div>
//             <h1>Login</h1>
//             {isValidUser && <p>Valid user</p>}
//             {error && <p>Error: {error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="username">Username:</label>
//                     <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password:</label>
//                     <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default Login;
