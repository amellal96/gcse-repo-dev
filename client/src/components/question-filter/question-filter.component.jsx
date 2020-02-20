import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { filterQuestions } from '../../actions/questions';

import './question-filter.styles.scss';

const QuestionFilter = ({ question: { questions }, filterQuestions}) => {
    const[filterOptions, setfilterOptions] = useState({
        'examBoards': [],
        'topics': [],
        'difficulty': {
            min: 1,
            max: 9
        },
        'marks': {
            min: 1,
            max: 9
        }
    })

    useEffect(() => {
        filterQuestions(filterOptions, questions);
    }, [filterQuestions, questions, filterOptions]);

    const changeExamBoards = (e, filterOptions) => {
        // e.preventDefault();
        if(e.target.checked && !(filterOptions.examBoards.includes(e.target.value))) {
            setfilterOptions({ ...filterOptions, examBoards: [...filterOptions.examBoards, e.target.value] });
        }
        else {
            setfilterOptions({ ...filterOptions, examBoards: [...filterOptions.examBoards.filter(item => item !== e.target.value)] });
        }
    };

    const changeTopics = (e, filterOptions) => {
        // e.preventDefault();
        if(e.target.checked && !(filterOptions.topics.includes(e.target.value))) {
            setfilterOptions({ ...filterOptions, topics: [...filterOptions.topics, e.target.value] });
        }
        else {
            setfilterOptions({ ...filterOptions, topics: [...filterOptions.topics.filter(item => item !== e.target.value)] });
        }
    };

    const changeDifficulty = (e, filterOptions) => {
        e.preventDefault();
        if (e.target.name === "min") {
            setfilterOptions({ ...filterOptions, 
                difficulty: { ...filterOptions.difficulty, min: e.target.value ? e.target.value : 1 }});
        }
        else {
            setfilterOptions({ ...filterOptions, 
                difficulty: { ...filterOptions.difficulty, max: e.target.value ? e.target.value : 9 }});
        }
    };

    const changeMarks = (e, filterOptions) => {
        e.preventDefault();
        if (e.target.name === "min") {
            setfilterOptions({ ...filterOptions, 
                marks: { ...filterOptions.marks, min: e.target.value ? e.target.value : 1 }});
        }
        else {
            setfilterOptions({ ...filterOptions, 
                marks: { ...filterOptions.marks, max: e.target.value ? e.target.value : 9 }});
        }
    };

    const refreshPage = (e) => {
        e.preventDefault();

        window.location.reload();
    }

    return (
        <div className='container'>
            <h3>Filter</h3>
            <form className='option'>
                <h5>Exam Boards</h5>
                <div className='option-container' onChange={e => changeExamBoards(e, filterOptions)}>
                    <div className='question-option-container' ><input className='question-option' type="checkbox" name="AQA" value="AQA" /> AQA</div>
                    <div className='question-option-container'><input className='question-option' type="checkbox" name="Edexcel" value="Edexcel" /> Edexcel</div>
                    <div className='question-option-container'><input className='question-option' type="checkbox" name="OCR" value="OCR" /> OCR</div>
                    <div className='question-option-container'><input className='question-option' type="checkbox" name="WJEC" value="WJEC" /> WJEC</div>
                </div>

                <h5>Topics</h5>
                <div className='option-container' onChange={e => changeTopics(e, filterOptions)}>
                    <div className='question-option-container'> <input className='question-option' type="checkbox" name="Numbers" value="Number" /> Number </div>
                    <div className='question-option-container'> <input className='question-option' type="checkbox" name="Fractions" value="Algebra" /> Algebra </div>
                    <div className='question-option-container'> <input className='question-option' type="checkbox" name="Ratio, Proportion and Rates of change" value="Ratio, Proportion and Rates of change" /> Ratio, Proportion and Rates of change </div>
                    <div className='question-option-container'> <input className='question-option' type="checkbox" name="Geometry and Measures" value="Geometry and Measures" /> Geometry and Measures </div>
                    <div className='question-option-container'> <input className='question-option' type="checkbox" name="Algebra" value="Statistics & Probability" /> Statistics & Probability </div> 
                </div>

                <h5>Difficulty</h5>
                <div className='option-container' onChange={e => changeDifficulty(e, filterOptions)}>
                    <label className="col-form-label col-form-label-sm" htmlFor="inputSmall">From</label>
                    <input name="min" className="form-control form-control-sm filter" type="text"  id="inputSmall"></input>
                    <label name="max" className="col-form-label col-form-label-sm" htmlFor="inputSmall">To</label>
                    <input className="form-control form-control-sm filter" type="text" id="inputSmall"></input>
                </div>

                <h5>Marks</h5>
                <div className='option-container' onChange={e => changeMarks(e, filterOptions)}>
                    <label className="col-form-label col-form-label-sm" htmlFor="inputSmall">From</label>
                    <input name="min" className="form-control form-control-sm filter" type="text"  id="inputSmall"></input>
                    <label name="max" className="col-form-label col-form-label-sm" htmlFor="inputSmall">To</label>
                    <input className="form-control form-control-sm filter" type="text" id="inputSmall"></input>
                </div>

                <button type="button" className="btn btn-primary" onClick={e => refreshPage(e)}>Clear</button>
            </form>
        </div>
    )
};

QuestionFilter.propTypes = {
    filterQuestions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    question: state.question
});

export default connect(mapStateToProps, { filterQuestions }) (QuestionFilter);