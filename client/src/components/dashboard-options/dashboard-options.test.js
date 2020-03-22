import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import DashboardOptions from './dashboard-options.component';

const mockStore = configureStore([thunk]);
jest.mock('react-router-dom/Link'); 

describe('Dashboard Options with student login', () => {
    let store;
    let wrapper;
    let mockHistory;
    let mockLink;

    beforeEach(() => {
        store = mockStore({
            user: {
                user: {
                    accountType: 'student'
                }
            }
        });

        store.dispatch = jest.fn();
        mockHistory = { listen: jest.fn() };
        mockLink = { to: jest.fn() };     

        wrapper = mount(
        <MemoryRouter >
                <Provider store={store}>
                    <DashboardOptions />
                </Provider>
        </MemoryRouter>
        );
    })

    it('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render 2 dashboard options', () => {
        expect(wrapper.find('.dashboard-options')).toHaveLength(2);
    })
})