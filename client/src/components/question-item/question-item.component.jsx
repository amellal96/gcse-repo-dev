import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { getQuestions } from '../../actions/questions';
import { connect } from 'react-redux';

import './question-item.styles.scss';

const QuestionItem = ({ getQuestions, question: { questions } }) => {
    useEffect(() => {
        getQuestions();
      }, [getQuestions]);

    return (
        <div className='question-item-container'>
            {/* {questions.map(question => {
                <Fragment>
                    <tr key={question._id}>
                        <td>{question.question}</td>
                        <td>{question.answer}</td>
                        <td>{question.examBoards}</td>
                        <td>{question.topics}</td>
                        <td>{question.difficulty}</td>
                        <td>{question.grade}</td>
                    </tr>
                </Fragment>
            })} */}
        </div>
    )
    }

QuestionItem.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    questions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   question: state.question
});

export default connect(mapStateToProps, { getQuestions }) (QuestionItem);