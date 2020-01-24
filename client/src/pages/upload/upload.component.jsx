import React from 'react';

import UploadQuestionForm from '../../components/upload-form/upload-form.component';

import './upload.styles.scss';

// import connect from '../../db/db-handling';

class UploadQuestion extends React.Component {
  render() {
    return (
      <div className='homepage'>
      <UploadQuestionForm />
      <button >Connect</button>
      </div>
    )
  }

}
export default UploadQuestion;