import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './header.component';

const mockStore = configureStore([thunk]);

describe('Header component - teacher links', () => {
    let store;
    let wrapper;
    let mockAuth;

    beforeEach(() => {
        store = mockStore({
            user: {
                isAuthenticated: true,
                loading: false,
                user: {
                    accountType: 'teacher'
                }
            }
        }); 

        store.dispatch = jest.fn();

        const mockProps = {
            store,
            mockAuth: jest.fn()
        }

        wrapper = mount(
                <Provider store={store}>
                    <Header {...mockProps} />
                </Provider>
        );
    });

    it('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot(); 
    });

    it('should render teacher links in nav bar', () => {
        expect(wrapper.find('.nav-item.active')).toHaveLength(5);
    });
});

describe('Header component - student links', () => {
    let store;
    let wrapper;
    let mockAuth;

    beforeEach(() => {
        store = mockStore({
            user: {
                isAuthenticated: true,
                loading: false,
                user: {
                    accountType: 'student'
                }
            }
        }); 

        store.dispatch = jest.fn();

        const mockProps = {
            store,
            mockAuth: jest.fn()
        }

        wrapper = mount(
                <Provider store={store}>
                    <Header {...mockProps} />
                </Provider>
        );
    });

    it('should render student links in nav bar', () => {
        expect(wrapper.find('.nav-item.active')).toHaveLength(4);
    });
});

describe('Header component - guest links', () => {
    let store;
    let wrapper;
    let mockAuth;

    beforeEach(() => {
        store = mockStore({
            user: {
                isAuthenticated: false,
                loading: false,
                user: {
                    
                }
            }
        }); 

        store.dispatch = jest.fn();

        const mockProps = {
            store,
            mockAuth: jest.fn()
        }

        wrapper = mount(
                <Provider store={store}>
                    <Header {...mockProps} />
                </Provider>
        );
    });

    it('should render guest links in nav bar', () => {
        expect(wrapper.find('.nav-item.active')).toHaveLength(3);
    });
});