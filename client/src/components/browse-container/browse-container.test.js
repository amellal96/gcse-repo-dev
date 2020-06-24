import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import { mount, shallow } from 'enzyme';

jest.mock('../../actions/questions');
jest.mock('../../actions/user');

import BrowseContainer from './browse-container.component';

const mockStore = configureStore([thunk]);

describe('BrowseContainer component', () => {
    let store;
    let wrapper;
    let mockGetQuestions;
    let mockRateQuestion;
    let mockSaveQuestion;
    let mockUnsaveQuestion;

    beforeEach(() => {
        store = mockStore({
            question: {
                questions: [{
                    _id: '1',
                    topics: [],
                    examBoards: [],
                    ratings: [{}]
                }, 
                {
                    _id: '2',
                    topics: [],
                    examBoards: [],
                    ratings: [{}]
                },
            ]},
            
            user: {
                user: {
                    savedQuestions: ['1']
                }
            }
        });

        store.dispatch = jest.fn();
        mockRateQuestion = jest.fn();
        mockSaveQuestion = jest.fn();
        mockUnsaveQuestion = jest.fn();
        mockGetQuestions = jest.fn();

        const mockProps = {
            store,
            getQuestions: mockGetQuestions,
            saveQuestion: mockSaveQuestion,
            unsaveQuestion: mockUnsaveQuestion,
            rateQuestion: mockRateQuestion
        }

        wrapper = mount(<Provider store={store}>
            <BrowseContainer {...mockProps} />
        </Provider>);
    }); 

    it('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot(); 
    });

    it('should render 2 rows in table', () => {
        expect(wrapper.find('.table-active')).toHaveLength(2);
    });

    it('should render 1 "unsave" button', () => {
        expect(wrapper.find('.unsave')).toHaveLength(1);
    })
});