import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';


import './sign-up.styles.scss';

const SignUp = ({ register, setAlert }) => {
  const[formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    password: '',
    password2: '',
    accountType: '',
    school: ''
  })

  const { firstName, surname, email, password, password2, school, accountType } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
      console.log("Passwords don't match");
    } else {
      register({ firstName, surname, email, password, school, accountType });
    }
  };

    return (
        <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={e => onSubmit(e)}>
            <FormInput
                type='text'
                name='firstName'
                value={firstName}
                onChange={e => onChange(e)}
                label='First Name'
                required
            />
            <FormInput
                type='text'
                name='surname'
                value={surname}
                onChange={e => onChange(e)}
                label='Surname'
                required
            />
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
            <FormInput
                type='password'
                name='password2'
                value={password2}
                onChange={e => onChange(e)}
                label='Confirm Password'
                required
            />
            <FormInput
                type='text'
                name='school'
                value={school}
                onChange={e => onChange(e)}
                label='School'
            />
            <span>Are you a student or teacher?</span>
            <select
            name='accountType'
            value={accountType}
            onChange={e => onChange(e)}
            >
                <option value='0'>* Select</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>
            <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
        </div>
    );
  }

  SignUp.propTypes = {
    register: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    
  });
  
  export default connect(
    mapStateToProps,
    { register, setAlert }
  )(SignUp); 