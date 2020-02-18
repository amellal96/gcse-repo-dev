import React from 'react';

import EditForm from '../../components/edit-question-form/edit-question-form.component';

import './edit-question.styles.scss';

class EditQuestion extends React.Component {
  render() {
    return (
      <div className='homepage'>
      <EditForm />
      </div>
    )
  }

}
export default EditQuestion;