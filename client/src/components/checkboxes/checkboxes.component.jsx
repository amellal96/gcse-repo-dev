import React from 'react';

import './checkboxes.styles.scss';

class Checkboxes extends React.Component {
    render () {
        return (
            <div className='checkbox-container'>
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
                <input type='text' name="Marks"/>

                <h3>Grade</h3>
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>

            </div>
        )
    }
}

export default Checkboxes;