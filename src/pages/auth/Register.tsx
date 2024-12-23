import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { AuthService } from '../../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        dateOfBirth: ''
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required')
            .min(2, 'First name must be at least 2 characters')
            .max(50, 'First name must be at most 50 characters'),
        lastName: Yup.string().required('Last name is required')
            .min(2, 'Last name must be at least 2 characters')
            .max(50, 'Last name must be at most 50 characters'),
        email: Yup.string().required('Email is required')
            .email('Email is invalid').min(6, 'Email must be at least 6 characters')
            .max(50, 'Email must be at most 50 characters'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must be at most 20 characters'),
        confirmPassword: Yup.string().required('Confirm password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
        phoneNumber: Yup.string().required('Phone number is required'),
        dateOfBirth: Yup.date().required('Date of birth is required')
    })

    const onSubmit = async (values: any) => {
        try {
            const response = await AuthService.register(values);
            if (response) {
                console.log('Register success');
                navigate('/auth/login');
            } else {
                console.log('Register failed');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const formik = (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className='flex flex-wrap *:mb-3 *:w-1/2 *:px-2'>
                <div className="form-group">
                    <label htmlFor="firstName" className='block mb-2'>First Name</label>
                    <Field type="text" name="firstName" className="form-control p-2 border border-slate-300 rounded-sm w-full" />
                    <ErrorMessage name="firstName" component="div" className="text-red-500" />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName" className='block mb-2'>Last Name</label>
                    <Field type="text" name="lastName" className="form-control p-2 border border-slate-300 rounded-sm w-full" />
                    <ErrorMessage name="lastName" component="div" className="text-red-500" />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className='block mb-2'>Email</label>
                    <Field type="email" name="email" className="form-control p-2 border border-slate-300 rounded-sm w-full" />
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className='block mb-2'>Username</label>
                    <Field type="text" name="username" className="form-control p-2 border border-slate-300 rounded-sm w-full" />
                    <ErrorMessage name="username" component="div" className="text-red-500" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className='block mb-2'>Password</label>
                    <Field type="password" name="password" className="form-control p-2 border border-slate-300 rounded-sm w-full" />
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword" className='block mb-2'>Confirm Password</label>
                    <Field type="password" name="confirmPassword" className="form-control p-2 border border-slate-300 rounded-sm w-full" />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber" className='block mb-2'>Phone Number</label>
                    <Field type="text" name="phoneNumber" className="form-control p-2 border border-slate-300 rounded-sm w-full" />
                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth" className='block mb-2'>Date of Birth</label>
                    <Field type="date" name="dateOfBirth" className="form-control p-2 border border-slate-300 rounded-sm w-full" />
                    <ErrorMessage name="dateOfBirth" component="div" className="text-red-500" />
                </div>
                <div className="form-group !w-full">
                    <button type="submit" className="p-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-full w-full">Register</button>
                </div>
                <div className="form-group text-center !w-full">
                    <label htmlFor="login" className="mr-3 text-center">Already have an account?</label>
                    <Link to="/auth/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                </div>
            </Form>
        </Formik>
    )
    return (
        <section className='h-screen w-full flex justify-center items-center'>
            <div className="form-login w-[550px] border border-slate-300 rounded-md shadow-md p-5 bg-white">
                <h1 className='text-2xl font-bold text-center mb-4'>Register</h1>
                {formik}
            </div>
        </section>
    )
}

export default Login;