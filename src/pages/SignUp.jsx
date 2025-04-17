import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/moivesAPI";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            console.log("Đăng ký thành công:", data);
            navigate("/login");
        },
        onError: (error) => {
            console.error("Đăng ký thất bại:", error);
        },
    });

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: "GP01",
            hoTen: "",
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required("Username is required"),
            matKhau: Yup.string()
                .min(3, "Minimum 3 characters")
                .required("Password is required"),
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
            soDt: Yup.string().required("Phone number is required"),
            hoTen: Yup.string().required("Full name is required"),
        }),
        onSubmit: (values) => {
            console.log("Dữ liệu gửi đi nè:", values);
            mutation.mutate(values);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-md text-white">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Sign Up
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Username */}
                    <InputField
                        label="Username"
                        id="taiKhoan"
                        formik={formik}
                        type="text"
                        placeholder="Enter your username"
                    />

                    {/* Password */}
                    <InputField
                        label="Password"
                        id="matKhau"
                        formik={formik}
                        type="password"
                        placeholder="Enter your password"
                    />

                    {/* Email */}
                    <InputField
                        label="Email"
                        id="email"
                        formik={formik}
                        type="email"
                        placeholder="Enter your email"
                    />

                    {/* Phone Number */}
                    <InputField
                        label="Phone Number"
                        id="soDt"
                        formik={formik}
                        type="text"
                        placeholder="Enter your phone number"
                    />

                    {/* Full Name */}
                    <InputField
                        label="Full Name"
                        id="hoTen"
                        formik={formik}
                        type="text"
                        placeholder="Enter your full name"
                    />

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition duration-300"
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
const InputField = ({ label, id, formik, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium mb-2">
            {label}
        </label>
        <input
            id={id}
            name={id}
            {...props}
            className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border ${
                formik.touched[id] && formik.errors[id]
                    ? "border-red-500"
                    : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[id]}
        />
        {formik.touched[id] && formik.errors[id] && (
            <p className="text-red-400 text-sm mt-1">{formik.errors[id]}</p>
        )}
    </div>
);
