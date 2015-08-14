import React from 'react/addons';
import moment from 'moment';

import CalendarDate from '../CalendarDate.jsx';

import BemMixin from '../../utils/BemMixin';


const TestUtils = React.addons.TestUtils;

describe('The CalendarDate Component', function () {

    beforeEach(() => {
        this.spyCx = spyOn(CalendarDate.prototype.__reactAutoBindMap, 'cx').and.returnValue('my-class');

        this.shallowRenderer = TestUtils.createRenderer();

        let d = moment(new Date());
        let firstOfMonth = moment(new Date());
        this.selectDateSpy = jasmine.createSpy();
        this.highlightDateSpy = jasmine.createSpy();

        this.shallowRenderer.render(<CalendarDate
            date={d}
            firstOfMonth={firstOfMonth}
            dateRangesForDate={function () {
                return {
                    count: function () {
                        return 5;
                    },
                    getIn: function () {
                        return '#333';
                    },
                }
            }}
            onSelectDate={this.selectDateSpy}
            onHighlightDate={this.highlightDateSpy}
        />);
        this.renderedComponent = this.shallowRenderer.getRenderOutput();
    });

    it('creates the right element', () => {
        expect(this.renderedComponent.type).toBe('td');
    });

    it('creates the right className', () => {
        //TODO: Test better modifiers and states
        expect(this.spyCx).toHaveBeenCalledWith({
            element: 'Date',
            modifiers: jasmine.any(Object),
            states: jasmine.any(Object),
        });
        expect(this.renderedComponent.props.className).toEqual('my-class');
    });

    describe('creates the right style', () => {

        it('when numStyles is 1', () => {

            let d = moment(new Date());
            let firstOfMonth = moment(new Date());
            this.selectDateSpy = jasmine.createSpy();

             this.shallowRenderer.render(<CalendarDate
                date={d}
                firstOfMonth={firstOfMonth}
                dateRangesForDate={function () {
                    return {
                        count: function () {
                            return 1;
                        },
                        getIn: function (data) {
                            if(data[0] === 0) {
                                return '#333';
                            }
                            return '#444';
                        },
                    }
                }}
                onSelectDate={this.selectDateSpy}
            />);
            this.renderedComponent = this.shallowRenderer.getRenderOutput();
            expect(this.renderedComponent.props.style.borderLeftColor).toEqual('#29');
            expect(this.renderedComponent.props.style.borderRightColor).toEqual('#29');
        });

        it('when numStyles is 1', () => {

            let d = moment(new Date());
            let firstOfMonth = moment(new Date());
            this.selectDateSpy = jasmine.createSpy();

            this.shallowRenderer.render(<CalendarDate
                date={d}
                firstOfMonth={firstOfMonth}
                dateRangesForDate={function () {
                    return {
                        count: function () {
                            return 2;
                        },
                        getIn: function (data) {
                            if(data[0] === 0) {
                                return '#333';
                            }
                            return '#444';
                        },
                    }
                }}
                onSelectDate={this.selectDateSpy}
            />);
            this.renderedComponent = this.shallowRenderer.getRenderOutput();
            expect(this.renderedComponent.props.style.borderLeftColor).toEqual('#29');
            expect(this.renderedComponent.props.style.borderRightColor).toEqual('#3a');
        });


    });

    describe('handles touch events', () => {

        beforeEach( () => {
            let d = moment(new Date());
            let firstOfMonth = moment(new Date());
            this.selectDateSpy = jasmine.createSpy();

            this.renderedComponent = TestUtils.renderIntoDocument(<table><tbody><CalendarDate
                date={d}
                firstOfMonth={firstOfMonth}
                dateRangesForDate={function () {
                    return {
                        count: function () {
                            return 2;
                        },
                        getIn: function (data) {
                            if(data[0] === 0) {
                                return '#333';
                            }
                            return '#444';
                        },
                    }
                }}
                onSelectDate={this.selectDateSpy}
                onHighlightDate={this.highlightDateSpy}
                /></tbody></table>);
            this.node =  TestUtils.findRenderedDOMComponentWithTag(this.renderedComponent, 'td');
        });


        it('by calling props.onHighlightDate after an interaction', () => {
            TestUtils.Simulate.touchStart(this.node);
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('touchend', false, false, null);
            document.dispatchEvent(evt);
            expect(this.highlightDateSpy).toHaveBeenCalled();
        });

        it('by calling props.onSelectDate after an interaction', () => {
            TestUtils.Simulate.touchStart(this.node);
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('touchend', false, false, null);
            document.dispatchEvent(evt);
            expect(this.selectDateSpy).toHaveBeenCalled();
        });

    });

    describe('handles mouse events', () => {

        it('by calling props.onHighlightDate after a mouse enter', () => {

        });

        it('by calling props.onSelectDate after mouse down + mouse leave', () => {

        });

        it('by calling props.onHighlightDate after a mouse leave', () => {

        });

        it('by calling props.onSelectDate after mouse up', () => {

        });

    });

    describe('handles half days', () => {

        it('by creating calendar date period when there is more than one period', () => {

        });

        it('by creating ca simple div when there is only one period', () => {

        });
    });

    describe('has a selection widget', () => {
        it('which shows for one of many reasons', () => {

        });

        it('which does not show otherwise', ()  => {

        });
    });

    describe('has a highlight modifier', () => {
        it('which shows when props.isHighlightedDate is true', () => {

        });

        it('which does not show otherwise', () => {

        });
    });


    //describe('#getInitialState', () => {
    //    it('returns the expected state', () => {
    //        expect(this.componentInstance.getInitialState()).toEqual({
    //            mouseDown: false
    //        });
    //    });
    //});
    //
    //describe('#mouseUp', () => {
    //    it('calls props.onSelectDate', () => {
    //        this.componentInstance.mouseUp();
    //        expect(this.selectDateSpy).toHaveBeenCalled();
    //    });
    //
    //    it('unsets the mouse down state', () => {
    //        this.componentInstance.setState({
    //            mouseDown: true
    //        });
    //        this.componentInstance.mouseUp();
    //        expect(this.componentInstance.state.mouseDown).toBe(false);
    //    });
    //
    //});
    //
    //describe('#render', () => {
    //    //it('should render the right element', () => {
    //    //    expect(this.renderedComponent.type).toBe('div');
    //    //    expect(this.spyCx).toHaveBeenCalledWith({
    //    //        modifiers: {
    //    //            month: true
    //    //        }
    //    //    });
    //    //    expect(this.renderedComponent.props.className).toEqual('my-class');
    //    //    expect(this.renderedComponent.props.style).toEqual({ backgroundColor: 'pink' });
    //    //});
    //
    //});



});