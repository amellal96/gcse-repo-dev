import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { upload } from '../../actions/questions';

// import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './upload-form.styles.scss';

const UploadForm = ({ upload, user: { user } }) => {
    const[formData, setFormData] = useState({
        question: '',
        answer: '',
        difficulty: '',
        marks: '', 
        examBoards: [],
        topics: []
    })

    const { question, answer, marks, difficulty, examBoards, topics } = formData;
    const submittedBy = user && user.email;

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        upload({ question, answer, marks, difficulty, examBoards, topics, submittedBy});
    }

    const checkExamBoards = async e => {
        if(e.target.checked && !(formData.examBoards.includes(e.target.value))) {
            setFormData({ ...formData, examBoards: [...formData.examBoards, e.target.value] })
        }
        else {
            setFormData({ ...formData, examBoards: [...formData.examBoards.filter(item => item !== e.target.value)] });
        }
    }

    const checkTopics = async e => {
        if(e.target.checked && !(formData.topics.includes(e.target.value))) {
            setFormData({ ...formData, topics: [...formData.topics, e.target.value] })
        }
        else {
            setFormData({ ...formData, topics: [...formData.topics.filter(item => item !== e.target.value)] });
        }
    }

    const addSymbolQuestion = async e => {
        setFormData({ ...formData, question: [formData.question] + (e.target.value) });
    }

    const addSymbolAnswer = async e => {
        setFormData({ ...formData, answer: [formData.answer] + (e.target.value) });
    }

    return ( 
        <div className='upload-question'>
            <h2>Upload New Question</h2>
            <form className='question-container' onSubmit={e => onSubmit(e)}>
                <div className='question-answer'>
                    <h3>Question</h3>
                    <label htmlFor="exampleTextarea">Add Indices</label>
                    <div className="btn-toolbar" onClick={e => addSymbolQuestion(e)} role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" value="²" className="btn btn-secondary">²</button>
                            <button type="button" value="³" className="btn btn-secondary">³</button>
                            <button type="button" value="⁴" className="btn btn-secondary">⁴</button>
                            
                        </div>
                        <div className="btn-group mr-2" role="group" aria-label="Second group">
                            <button type="button" value="°" className="btn btn-secondary">°</button>
                        </div>
                    </div>
                    <textarea  
                        className='form-control'
                        rows='3'
                        type='text'
                        name='question'
                        value={question}
                        onChange={e => onChange(e)}
                        label='Question' 
                    />
                    <h3>Answer</h3>
                    <label htmlFor="exampleTextarea">Add Indices</label>
                    <div className="btn-toolbar" onClick={e => addSymbolAnswer(e)} role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" value="²" className="btn btn-secondary">²</button>
                            <button type="button" value="³" className="btn btn-secondary">³</button>
                            <button type="button" value="⁴" className="btn btn-secondary">⁴</button>
                            
                        </div>
                        <div className="btn-group mr-2" role="group" aria-label="Second group">
                        <button type="button" value="°" className="btn btn-secondary">°</button>
                        </div>
                    </div>
                    <textarea  
                        className='form-control'
                        rows='3'
                        type='text'
                        name='answer'
                        value={answer}
                        onChange={e => onChange(e)}
                        label='Answer'
                    />
                    {/* <div className="form-group">
                        <h3>Upload Answer</h3>
                        <input name='imgAnswer' type="file" className="form-control-file" onChange={e => imgUpload(e)} aria-describedby="fileHelp" />
                        <small id="fileHelp" className="form-text text-muted">If your answer is too complex to be just text, you can upload an image instead.</small>
                    </div> */}
                </div>
                <div className='question-properties'>
                    <h3>Exam Boards</h3>
                    <div className='option-selection'
                        value={examBoards}
                        onChange={e => checkExamBoards(e)}
                    >
                        <span className='question-option-container'><input className='question-option' type="checkbox" name="AQA" value="AQA" /> AQA</span>
                        <span className='question-option-container'><input className='question-option' type="checkbox" name="Edexcel" value="Edexcel" /> Edexcel</span>
                        <span className='question-option-container'><input className='question-option' type="checkbox" name="OCR" value="OCR" /> OCR</span>
                        <span className='question-option-container'><input className='question-option' type="checkbox" name="WJEC" value="WJEC" /> WJEC</span>
                    </div>
                    <h3>Topics</h3>
                    <div className='option-selection'
                        value={topics}
                        onChange={e => checkTopics(e)}
                    >
                        <span className='question-option-container'> <input className='question-option' type="checkbox" name="Number" value="Number" /> Number </span>
                        <span className='question-option-container'> <input className='question-option' type="checkbox" name="Algebra" value="Algebra" /> Algebra </span>
                        <span className='question-option-container'> <input className='question-option' type="checkbox" name="Ratio, Proportion and Rates of change" value="Ratio, Proportion and Rates of change" /> Ratio, Proportion and Rates of change </span>
                        <span className='question-option-container'> <input className='question-option' type="checkbox" name="Geometry and Measures" value="Geometry and Measures" /> Geometry and Measures </span>
                        <span className='question-option-container'> <input className='question-option' type="checkbox" name="Statistics & Probability" value="Statistics & Probability" /> Statistics & Probability </span> 
                    </div>
                    <h3>Marks</h3>
                    <FormInput  
                            type='text'
                            name='marks'
                            value={marks}
                            onChange={e => onChange(e)}
                    />
                    <div className="form-group">
                        <h3>Grade</h3>
                        <select className="form-control small" 
                        name='difficulty'
                        value={difficulty}
                        onChange={e => onChange(e)}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                        </select>
                    </div>
                    {/* <FormInput  
                            type='text'
                            name='difficulty'
                            value={difficulty}
                            onChange={e => onChange(e)}
                            label='Difficulty'
                    /> */}
                </div>
                <input type='submit' className='btn btn-primary btn-lg' value='UPLOAD' />
                {/* <CustomButton type='submit'>UPLOAD</CustomButton> */}
            </form>
        </div> 
    );
}

UploadForm.propTypes = {
    upload: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};  

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { upload }) (UploadForm);