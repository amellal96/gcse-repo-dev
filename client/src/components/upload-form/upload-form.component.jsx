import React from 'react';

import FormInput from '../form-input/form-input.component';
import Checkboxes from '../checkboxes/checkboxes.component';

import './upload-form.styles.scss';

class UploadQuestionForm extends React.Component {

    render() {
        return (
            <div className='upload-question'>
                <h2>Upload New Question</h2>
                    <form className='question-container'>
                        <div className='question-answer'> 
                            <span>Question</span>
                            <FormInput  />

                            <span>Answer</span>
                            <FormInput  />  
                        </div>
                        <div className='question-properties'>
                            <Checkboxes />
                        </div>
                        
                    </form>
                    <button className='btn btn-primary'>Upload</button>
            </div> 
        );
  }
}

export default UploadQuestionForm;