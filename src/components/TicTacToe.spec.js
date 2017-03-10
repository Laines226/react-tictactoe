import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils'
import { shallow, mount } from 'enzyme'
import TicTacToe from './TicTacToe';
import { PlayingFieldSection } from './TicTacToe';

describe('<TicTacToe />', () => {
    it('renders without crashing', () => {
        shallow(<TicTacToe />);
    });
    it('renders Title "Tic Tac Toe', () => {
        const wrapper = shallow(<TicTacToe />);
        const title = <h2>Tic Tac Toe</h2>;
        expect(wrapper.contains(title)).toEqual(true);
    });
    it('gets \'n\' as return of checkThreeInARow at beginning ', () => {
        const app = new TicTacToe();
        expect(app.checkThreeInARow()).toBe('n');
    });
    it('renders playingFieldSection', () => {
        const wrapper = mount(<TicTacToe />);
        let handleSectionClick = () => {
            console.log("clicked");
        }
        let section00 = wrapper.find('[id="00"]').simulate('click');
        expect(section00).not.toBe(undefined);
    });
    it('change Text to X after Click in playingFieldSection', () => {
        const wrapper = mount(<TicTacToe />);
        let handleSectionClick = () => {
            console.log("clicked");
        }
        let section00 = wrapper.find('[id="00"]').simulate('click');
        expect(section00.childAt(0).text()).toBe('X');
    });
    it('change Text to O after second Click in playingFieldSection', () => {
        const wrapper = mount(<TicTacToe />);
        let handleSectionClick = () => {
            console.log("clicked");
        }
        let section00 = wrapper.find('[id="00"]').simulate('click');
        let section01 = wrapper.find('[id="01"]').simulate('click');
        expect(section01.childAt(0).text()).toBe('O');
    });
});
describe('<TicTacToe /> checkThreeInARow', () => {
    it('one row with Xs to return true', () => {
        const wrapper = mount(<TicTacToe />);
        let handleSectionClick = () => {
            console.log("clicked");
        }
        let section00 = wrapper.find('[id="00"]').simulate('click');
        let section10 = wrapper.find('[id="10"]').simulate('click');
        let section01 = wrapper.find('[id="01"]').simulate('click');
        let section11 = wrapper.find('[id="11"]').simulate('click');
        let section02 = wrapper.find('[id="02"]').simulate('click');
        expect(wrapper.instance().checkThreeInARow()).toBe('X');
    });
});
