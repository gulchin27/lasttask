// components/Schemas/LoginFormSchemas.js
import * as Yup from 'yup';

const LoginFormSchemas = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')  
    .required('Email field is required'), 

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')  
    .required('Password field is required'), 
});

export default LoginFormSchemas;
