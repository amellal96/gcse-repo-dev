import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in.styles.scss';

const SignIn = ({ login }) => {
    const[formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        login(email, password);
    };

    return (
        <div className='sign-in'>
            <h2 className='title'>I have an account</h2>
            <form className='sign-in-form' onSubmit={e => onSubmit(e)}>
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    label='Password'
                    required
                />
                <CustomButton type='submit'>SIGN IN</CustomButton>
            </form>
        </div>
    )
}

SignIn.propTypes = {
    login: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    
  });
  
  export default connect(
    mapStateToProps,
    { login }
  )(SignIn); 