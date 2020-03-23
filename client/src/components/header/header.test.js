import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './header.component';

const mockStore = configureStore([thunk]);

describe('Header component', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore({
            auth: {
                isAuthenticated: true,
                loading: '',
                user: {

                }
            }
        });

        store.dispatch = jest.fn();

        const mockProps = {
            store
        }

        wrapper = mount(
                <Provider store={store}>
                    <Header {...mockProps} />
                </Provider>
        );
    });

    // it('should match the snapshot', () => {
    //     expect(wrapper.html()).toMatchSnapshot(); 
    // });

    it('should render form if question found', () => {
        expect(wrapper.find('.upload-question')).toHaveLength(1);
    });
});