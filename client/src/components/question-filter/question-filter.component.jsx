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
        }
    })

    useEffect(() => {
        filterQuestions(filterOptions, questions);
    }, [filterQuestions, questions, filterOptions]);

    const changeExamBoards = (e, filterOptions) => {
        // console.log("Changing exam board");
        if(e.target.checked && !(filterOptions.examBoards.includes(e.target.value))) {
            setfilterOptions({ ...filterOptions, examBoards: [...filterOptions.examBoards, e.target.value] });
        }
        else {
            setfilterOptions({ ...filterOptions, examBoards: [...filterOptions.examBoards.filter(item => item !== e.target.value)] });
        }

        // filterQuestions(filterOptions, questions);
    };

    const changeTopics = (e, filterOptions) => {
        console.log("Changing topics");
        if(e.target.checked && !(filterOptions.topics.includes(e.target.value))) {
            setfilterOptions({ ...filterOptions, topics: [...filterOptions.topics, e.target.value] });
        }
        else {
            setfilterOptions({ ...filterOptions, topics: [...filterOptions.topics.filter(item => item !== e.target.value)] });
        }
        
        // filterQuestions(filterOptions, questions);
    };

    const changeDifficulty = (e, filterOptions) => {
        console.log("Changing difficulty");
        
        // setfilterOptions({ ...filterOptions, topics: [...filterOptions.topics, e.target.value] });
    };

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
                    <label class="col-form-label col-form-label-sm" for="inputSmall">From</label>
                    <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm" id="inputSmall"></input>
                    <label class="col-form-label col-form-label-sm" for="inputSmall">To</label>
                    <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm" id="inputSmall"></input>
                </div>
            
                {/* <div className="form-group">
                    <h6>Difficulty</h6>
                    <select className="form-control">
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
                </div> */}

                <button type="button" className="btn btn-primary">Clear</button>
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