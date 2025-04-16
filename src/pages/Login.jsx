import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { checkLogin } from "../api/moivesAPI";
import { TOKEN, USER_LOGIN, setCookie } from "../utils/settings";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const loginMutation = useMutation({
        mutationFn: checkLogin,
        onSuccess: (data) => {
            console.log("Login successful:", data);
            const accessToken = data.accessToken;
            console.log("Login successful:", data);
            localStorage.setItem(USER_LOGIN, JSON.stringify(data));
            localStorage.setItem(TOKEN, accessToken);
            setCookie(TOKEN, accessToken, 7);
            navigate("/");
        },

        onError: (error) => {
            console.error("Login failed:", error);
        },
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Please enter your username"),
            password: Yup.string()
                .min(3, "Password must be at least 3 characters")
                .required("Please enter your password"),
        }),
        onSubmit: (values) => {
            if (!values.username || !values.password) {
                alert("Username and password are required.");
                return;
            }
            loginMutation.mutate(values);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Login
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                                formik.touched.username &&
                                formik.errors.username
                                    ? "border-red-500 focus:ring-red-300"
                                    : "border-gray-300 focus:ring-yellow-400"
                            }`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.username}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700  mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                                formik.touched.password &&
                                formik.errors.password
                                    ? "border-red-500 focus:ring-red-300"
                                    : "border-gray-300 focus:ring-yellow-400"
                            }`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition duration-300"
                        disabled={loginMutation.isLoading}
                    >
                        {loginMutation.isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="ml-2 text-yellow-500 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
