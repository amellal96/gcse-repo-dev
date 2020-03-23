import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import EditQuestionForm from './edit-question-form.component';

const mockStore = configureStore([thunk]);

describe('EditQuestionForm component', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore({
            question: {
                question: {

                }
            }
        });

        store.dispatch = jest.fn();

        const mockProps = {
            store
        }

        wrapper = mount(
            <Router>
                <Provider store={store}>
                    <EditQuestionForm {...mockProps} />
                </Provider>
            </Router>
        );
    });

    it('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot(); 
    });

    it('should render form if question found', () => {
        expect(wrapper.find('.upload-question')).toHaveLength(1);
    });
});