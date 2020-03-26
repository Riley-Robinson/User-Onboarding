import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field} from "formik";
import './Form.css';
import * as Yup from 'yup';
import axios from 'axios';

const Forms = ({ values, touched, errors, status}) => {
    const [People, setPeople] = useState({});
    console.log('submitting', values.isSubmitting);
    useEffect(() => {
        status && setPeople(status);
    }, [status]);
    console.log(errors);
    console.log(touched);

    return (
        <div className='container'>
        <div className='signup'>
            <Form>
                <Field type='text' name='name' placeholder='Name:' />
                {touched.name && errors.name && (
                    <p classNAme='errors'>{errors.name}</p>
                )}
                <Field type='email' name='email' placeholder='Email:'/>
                {touched.email && errors.email && (
                 <p className='errors'>{errors.email}</p>   
                )}
                <Field type='password' name='password' placeholder='Password:'/>
                {touched.password && errors.password && (
                 <p className='errors'>{errors.password}</p> 
                )}
                <Field
                    type='checkbox'
                    checked={values.SellingYourSole}
                    name='SellingYourSole'
                />
                <button type='submit' disabled={values.SoleSold}>
                    {values.SoleSold ? 'Submitting' : 'Submit'}
                </button>
            </Form>
        </div>    
        <div className='YaSign'>
            <h3> Welcome! {People.name} Tastey Soles</h3>
            {
                <ul key={People.id}>
                    <li>Name: {People.name}</li>
                    <li>Email: {People.email}</li>
                </ul>
            }
        </div>
        </div>
    );
};

export default withFormik({
    mapPropsToValues: props=> ({
        name: '',
        email: '',
        password: '',
        SellingYourSoles: false
    }),
    SoleStealingSchema: Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(69, 'Too Long!')
        .required('Name is Required!'),
    Email: Yup.string()
        .min(5, 'Too Short!')
        .max(69, 'Too Long!')
        .email('Invalid email')
        .required('Email is Required!'),
    password: Yup.string()
        .min(5, 'Too Short!')
        .max(69, 'Too Long!')
        .required('Password is Required!'),
    }),
    handleSubmit: (values, { resetForm, setStatus}) => {
        axios
            .post('https://reqres.in/api/users', values)
            .then(response=> {
                console.log('value', values);
                resetForm();
                setStatus(response.data);
            })
            .catch(err => console.log(err.resoponse));
    }
})(Forms);

