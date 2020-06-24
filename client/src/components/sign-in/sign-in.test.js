import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import { mount } from 'enzyme';

jest.mock('../../actions/questions');
jest.mock('../../actions/user');

import SignIn from './sign-in.component';

const mockStore = configureStore([thunk]);

describe('BrowseContainer component', () => {
    let store;
    let wrapper;
    let mockLogin;
    let mockData;

    beforeEach(() => {
        store = mockStore({user: {
            user: {
                isAuthenticated: false
            }
        }});

        store.dispatch = jest.fn();
        mockLogin = jest.fn();
        mockData = {};

        const mockProps = {
            store,
            login: mockLogin
        }

        wrapper = mount(<Provider store={store}>
            <SignIn {...mockProps} />
        </Provider>);
    }); 

    it('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot(); 
    });

    it('should render sign in form', () => {
        expect(wrapper.find('.sign-in-form')).toHaveLength(1);
    });
});