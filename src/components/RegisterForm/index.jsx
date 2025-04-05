import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; // MUI Button kullanımı
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RegisterFormSchemas from '../Schemas/RegisterFormSchemas.jsx';
import { useNavigate } from 'react-router-dom';
import './style.css';

const RegisterForm = ({ onRegister }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      
    },
    validationSchema: RegisterFormSchemas,
    onSubmit: (values) => {
      localStorage.setItem("user", JSON.stringify(values));
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("isLoggedIn", "true");

      alert("Registration successful! You are being directed to the home page...");
      if (onRegister) onRegister();
      navigate("/today");
    },
  });

  return (
    <form className="registerform" onSubmit={formik.handleSubmit}>
          <div className='titleregister'>Registration</div>
      <TextField
        label="E-mail"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ""}
        error={formik.errors.email && formik.touched.email}
        autoComplete="username"
        className="Input-regst"
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.errors.password && formik.touched.password ? formik.errors.password : ""}
        error={formik.errors.password && formik.touched.password}
        autoComplete="new-password"
        className="Input-regst"
      />

      <TextField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
        error={formik.errors.confirmPassword && formik.touched.confirmPassword}
        autoComplete="new-password"
        className="Input-regst"
      />

      <Button 
        variant="contained" 
        type="submit" 
        className="register"
      >
       Register
      </Button>

      <div className="term-input">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </form>
  );
};

export default RegisterForm;
