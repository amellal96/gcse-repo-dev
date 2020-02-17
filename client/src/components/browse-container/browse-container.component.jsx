import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionFilter from '../question-filter/question-filter.component';

import { getQuestions, rateQuestion } from '../../actions/questions';
import { saveQuestion, unsaveQuestion } from '../../actions/user';

import './browse-container.styles.scss';

const BrowseContainer = ({ getQuestions, 
  saveQuestion, 
  unsaveQuestion,
  rateQuestion, 
  question: { filteredQuestions, questions }, 
  user: { user }}
  ) => {
    useEffect(() => {
      getQuestions();
    }, [getQuestions]);

    const saveButton = (questionId) => (
      <div className='save'>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={() => saveQuestion(questionId)}>
          Save
        </button>
      </div>
    )

    const unsaveButton = (questionId) => (
      <div className='save'>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => unsaveQuestion(questionId)}>
          Unsave
        </button>
      </div>
    )

    const questionVote = (e, questionId) => {
      e.preventDefault();
      rateQuestion(e.target.getAttribute('data-value'), questionId, user._id);
    }

    const rateButtonUI = (question) => {
      const userRating = question.ratings.find(rating => 
        rating.userID === (user && user._id)
      );

      console.log(question.ratings);
      console.log(user && user._id);

      if (!userRating) {
        console.log("User rating does not exist");
        return null;
      }

      if (userRating && userRating.rating === -1) {
        console.log("Returning downvote")
        return "downvote"
      }
      else if (userRating && userRating.rating === 1) {
        console.log("Returning upvote")
        return "upvote";
      }
      else {
        console.log("Returning null")
        return null;
      }
      
    }

    // const [revealButton, revealAnswer] = useState(<button type="button" className="btn btn-info">Reveal</button>);
  
    return (
      <div className='browse-container'>  
        <div className='filter-container'>
          <QuestionFilter />
        </div>
        
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Marks</th>
              <th>Topics</th>
              <th>Exam Boards</th>
              <th>Grade</th>
              <th>Rating</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            {(filteredQuestions ? filteredQuestions : questions).map(question => 
                <Fragment key={question._id}>
                  <tr className='table-active'>
                    <td>{question.question}</td>
                    <td> 
                      {question.answer}
                      {/* <button type="button" className="btn btn-info" onClick={revealAnswer(question.answer)}>Reveal</button> */}
                      {/* <div onClick={() => revealAnswer(question.answer)}>{revealButton}</div> */}
                    </td>
                    <td>{question.marks}</td>
                    <td>{question.topics.map(topic => <div key={question._id + topic}>{topic}</div>)}</td>
                    <td>{question.examBoards.map(board => <div key={question._id + board}>{board}</div>)}</td>
                    <td>{question.difficulty}</td>
                    <td>
                      {question.rating}
                      <div className="vote-container" onClick={e => questionVote(e, question._id)}>
                        <span data-value="1" 
                        className={rateButtonUI(question) === "upvote" ? "btn btn-success" : "btn btn-outline-success"}
                        >Upvote</span>
                        <span data-value="-1" 
                        className={rateButtonUI(question) === "downvote" ? "btn btn-danger" : "btn btn-outline-danger"}
                        >Downvote</span>
                      </div>
                    </td>
                    <td>
                      { user && (user.savedQuestions).includes(question._id) ? unsaveButton(question._id) : saveButton(question._id) }
                    </td>
                  </tr>
                </Fragment>
            )}
          </tbody>
        </table>
      </div>
    )
  };
  
BrowseContainer.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  saveQuestion: PropTypes.func.isRequired,
  unsaveQuestion: PropTypes.func.isRequired,
  rateQuestion: PropTypes.func.isRequired,
};
  
const mapStateToProps = state => ({
  question: state.question,
  user: state.user
});
  
export default connect(
  mapStateToProps, 
  { 
    getQuestions, 
    saveQuestion, 
    unsaveQuestion,
    rateQuestion
  }) 
  (BrowseContainer);