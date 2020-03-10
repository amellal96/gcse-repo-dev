import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { mount } from 'enzyme';

import BrowseContainer from './browse-container.component';

const mockStore = configureStore([thunk]);

describe('BrowseContainer component', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore({
            question: jest.fn(),
            user: []
        });

        store.dispatch = jest.fn();

        const mockProps = {
            store
        }
        wrapper = mount(<BrowseContainer {...mockProps}/>)
    });

    // it('should match the snapshot', () => {
    //     expect(wrapper.html()).toMatchSnapshot(); 
    // });

    it('should render option fields', () => {
        // expect(wrapper.find('.option-container')).toHaveLength(4);
    });
});