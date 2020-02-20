import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editQuestion } from '../../actions/questions';
import { Redirect } from 'react-router';
import { withRouter } from "react-router-dom";

import FormInput from '../form-input/form-input.component';

import './edit-question-form.styles.scss';

const EditForm = ({ editQuestion, history, question: { question } }) => {
    const[formData, setFormData] = useState({
        questionText: question && question.question ? question.question : '',
        answer: question && question.answer ? question.answer : '',
        difficulty: question && question.difficulty ? question.difficulty : '',
        marks: question && question.marks ? question.marks : '', 
        examBoards: question && question.examBoards ? question.examBoards : [],
        topics: question && question.topics ? question.topics : []
    })

    if(!question) {
        return <Redirect to='/submitted-questions' />
    }

    const { questionText, answer, marks, difficulty, examBoards, topics } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        const questionId = question._id;
        editQuestion({ questionId, questionText, answer, marks, difficulty, examBoards, topics, history });
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

    const isSelected = value => {
        if (formData.topics.includes(value) || formData.examBoards.includes(value)) {
            return true;
        }

        return false;
    }

    const addSymbolQuestion = async e => {
        setFormData({ ...formData, questionText: [formData.questionText] + (e.target.value) });
    }

    const addSymbolAnswer = async e => {
        setFormData({ ...formData, answer: [formData.answer] + (e.target.value) });
    }

    return ( 
        <div className='upload-question'>
            <h2>Edit Question</h2>
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
                            name='questionText'
                            value={questionText}
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
                </div>
                <div className='question-properties'>
                    <h3>Exam Boards</h3>
                    <div className='option-selection'
                        value={examBoards}
                        onChange={e => checkExamBoards(e)}
                    >
                        <span className='question-option-container'>
                            <input className='question-option' defaultChecked={isSelected('AQA') ? 'checked' : ''} type="checkbox" name="AQA" value="AQA" /> AQA
                        </span>
                        <span className='question-option-container'>
                            <input className='question-option' defaultChecked={isSelected('Edexcel') ? 'checked' : ''} type="checkbox" name="Edexcel" value="Edexcel" /> Edexcel
                        </span>
                        <span className='question-option-container'>
                            <input className='question-option' defaultChecked={isSelected('OCR') ? 'checked' : ''} type="checkbox" name="OCR" value="OCR" /> OCR
                        </span>
                        <span className='question-option-container'>
                            <input className='question-option' defaultChecked={isSelected('WJEC') ? 'checked' : ''} type="checkbox" name="WJEC" value="WJEC" /> WJEC
                        </span>
                    </div>
                    <h3>Topics</h3>
                    <div className='option-selection'
                        value={topics}
                        onChange={e => checkTopics(e)}
                    >
                        <span className='question-option-container'> 
                            <input className='question-option' defaultChecked={isSelected('Number') ? 'checked' : ''} type="checkbox" name="Number" value="Number" /> Number 
                        </span>
                        <span className='question-option-container'> 
                            <input className='question-option' defaultChecked={isSelected('Algebra') ? 'checked' : ''} type="checkbox" name="Algebra" value="Algebra" /> Algebra 
                        </span>
                        <span className='question-option-container'> 
                            <input className='question-option' defaultChecked={isSelected('Ratio, Proportion and Rates of change') ? 'checked' : ''} type="checkbox" name="Ratio, Proportion and Rates of change" value="Ratio, Proportion and Rates of change" /> Ratio, Proportion and Rates of change 
                        </span>
                        <span className='question-option-container'> 
                            <input className='question-option' defaultChecked={isSelected('Geometry and Measures') ? 'checked' : ''} type="checkbox" name="Geometry and Measures" value="Geometry and Measures" /> Geometry and Measures 
                        </span>
                        <span className='question-option-container'> 
                            <input className='question-option' defaultChecked={isSelected('Statistics & Probability') ? 'checked' : ''} type="checkbox" name="Statistics & Probability" value="Statistics & Probability" /> Statistics & Probability 
                        </span> 
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
                <input type='submit' className='btn btn-primary btn-lg' value='UPDATE' />
            </form>
        </div> 
    );
}

EditForm.propTypes = {
    editQuestion: PropTypes.func.isRequired
};  

const mapStateToProps = state => ({
    question: state.question
});

export default connect(mapStateToProps, { editQuestion })(withRouter(EditForm));