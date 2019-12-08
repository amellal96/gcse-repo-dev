import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { upload } from '../../actions/upload';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import Checkboxes from '../checkboxes/checkboxes.component';

import './upload-form.styles.scss';

const UploadForm = ({ upload }) => {
    const[formData, setFormData] = useState({
        question: '',
        answer: '',
        difficulty: '',
        marks: '', 
    })

    const { question, answer, marks, difficulty } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        upload({ question, answer, marks, difficulty });
    }

    return (
        <div className='upload-question'>
            <h2>Upload New Question</h2>
            <form className='question-container' onSubmit={e => onSubmit(e)}>
                <div className='question-answer'>
                    <FormInput  
                        type='text'
                        name='question'
                        value={question}
                        onChange={e => onChange(e)}
                        label='Question'
                    />
                    <FormInput  
                        type='text'
                        name='answer'
                        value={answer}
                        onChange={e => onChange(e)}
                        label='Answer'
                    />
                </div>
                <div className='question-properties'>
                    <h3>Exam Boards</h3>
                    <div className='option-section'>
                        <span className='question-option-container'><input className='question-option' type="checkbox" name="AQA" value="AQA" /> AQA</span>
                        <span className='question-option-container'><input className='question-option' type="checkbox" name="Edexcel" value="Edexcel" /> Edexcel</span>
                        <span className='question-option-container'><input className='question-option' type="checkbox" name="OCR" value="OCR" /> OCR</span>
                        <span className='question-option-container'><input className='question-option' type="checkbox" name="WJEC" value="WJEC" /> WJEC</span>
                    </div>
                    <h3>Topics</h3>
                    <div className='option-section'>
                        <span className='question-option-container'> <input className='question-option' type="checkbox" name="Numbers" value="Numbers" /> Numbers </span>
                        <span className='question-option-container'> <input className='question-option' type="checkbox" name="Fractions" value="Fractions" /> Fractions </span>
                        <span className='question-option-container'> <input className='question-option' type="checkbox" name="Shapes" value="Shapes" /> Shapes </span>
                        <span className='question-option-container'> <input className='question-option' type="checkbox" name="Graphs" value="Graphs" /> Graphs </span>
                        <span className='question-option-container'> <input className='question-option' type="checkbox" name="Algebra" value="Algebra" /> Algebra </span> 
                    </div>
                    <h3>Total Marks</h3>
                    <FormInput  
                            type='text'
                            name='marks'
                            value={marks}
                            onChange={e => onChange(e)}
                            label='Marks'
                    />

                    <h3>Grade</h3>
                    <FormInput  
                            type='text'
                            name='difficulty'
                            value={difficulty}
                            onChange={e => onChange(e)}
                            label='Difficulty'
                    />
                </div>
                <CustomButton type='submit'>UPLOAD</CustomButton>
            </form>
        </div> 
    );
}

UploadForm.propTypes = {
    upload: PropTypes.func.isRequired
};  

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps, { upload }) (UploadForm);