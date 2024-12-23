import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { AuthService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const initialValues = {
        username: '',
        password: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must be at most 20 characters')

    })

    const onSubmit = async (values: any) => {
        try {
            const response = await AuthService.login(values);
            if (response) {
                console.log('Login success');
                navigate('/');
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const formik = (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
                <div className="form-group mb-3">
                    <label htmlFor="username" className='block mb-2'>Username</label>
                    <Field type="text" name="username" className="form-control p-2 border border-slate-300 rounded-sm w-full" />
                    <ErrorMessage name="username" component="div" className="text-red-500" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className='block mb-2'>Password</label>
                    <Field type="password" name="password" className="form-control p-2 border border-slate-300 rounded-sm w-full" />
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>
                <button type="submit" className="p-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-full w-full">Login</button>
            </Form>
        </Formik>
    )
    return (
        <section className='h-screen w-full flex justify-center items-center'>
            <div className="form-login w-[450px] border border-slate-300 rounded-md shadow-md p-5">
                {formik}
            </div>
        </section>
    )
}

export default Login;