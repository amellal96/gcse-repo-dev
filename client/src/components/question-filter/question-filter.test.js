import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import { mount, shallow } from 'enzyme';

import QuestionFilter from './question-filter.component';

jest.mock('../../actions/questions');

const mockStore = configureStore([thunk]);

describe('QuestionFilter component', () => {
    let store;
    let wrapper;
    let mockChangeExamBoards;
    let mockRefreshPage;
    let mockChangeDifficulty;

    beforeEach(() => {
        store = mockStore({
            question: []
        });

        mockChangeExamBoards = jest.fn();
        mockRefreshPage = jest.fn();
        store.dispatch = jest.fn();
        mockChangeDifficulty = jest.fn();

        const mockProps = {
            store,
            refreshPage: mockRefreshPage,
            changeExamBoards: mockChangeExamBoards,
            changeDifficulty: mockChangeDifficulty
        }
        
        wrapper = mount(<Provider store={store}>
            <QuestionFilter {...mockProps} />
        </Provider>)
    });

    // it('expect changeExamBoards to be called', () => {
    //     const eMock = { preventDefault: jest.fn(), target: 'fake target', checked: true };
        
    //     expect(mockChangeExamBoards).not.toHaveBeenCalled();

    //     wrapper.instance().changeExamBoards = jest.fn();

    //     wrapper.find('.option-container')
    //         .at(0)
    //         .simulate('change', eMock);

    //     wrapper.find('.question-option-container')
    //         .at(0)
    //         .simulate('change', eMock);

    //     wrapper.find('.question-option')
    //         .at(0)
    //         .simulate('change', eMock);

    //     expect(mockChangeExamBoards).toHaveBeenCalled();
    // });

    it('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot(); 
    });

    it('should render option fields', () => {
        expect(wrapper.find('.option-container')).toHaveLength(4);
    });

    // it('should check that checkbox is checked', () => {
    //     const eMock = { preventDefault: jest.fn(), target: 'fake target', checked: true };

    //     wrapper.find('.question-option')
    //         .at(2)
    //         .simulate('change', eMock);

    //     const checkbox = wrapper.find('.question-option').at(2);

    //     checkbox.simulate('change', eMock);

    //     expect(checkbox.checked).toEqual(true);
    // });

    it('check reload page occurs', () => {
        const mockEvent = { preventDefault: jest.fn() };

        window.location.reload = jest.fn();

        wrapper.find('.btn.btn-primary')
            .simulate('click', mockEvent);

        expect(window.location.reload).toHaveBeenCalled();
    });
});