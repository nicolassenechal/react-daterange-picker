import DateRangePicker from '../DateRangePicker.jsx';
import PaginationArrow from '../PaginationArrow.jsx';
import CalendarMonth from '../calendar/CalendarMonth.jsx';
import moment from 'moment';
import 'moment-range';

import React from 'react/addons';

const TestUtils = React.addons.TestUtils;

describe('The DateRangePicker component', function () {

  const getDateRangePicker = (props) => {
    props = props || {};
    return (<DateRangePicker {...props} />);
  };

  const useShallowRenderer = (props) => {
    this.shallowRenderer = TestUtils.createRenderer();
    this.shallowRenderer.render(getDateRangePicker(props));
    this.renderedComponent = this.shallowRenderer.getRenderOutput();
  };

  const useDocumentRenderer = (props) => {
    this.renderedComponent = TestUtils.renderIntoDocument(getDateRangePicker(props));
  };

  beforeEach(() => {
    this.spyCx = spyOn(DateRangePicker.prototype.__reactAutoBindMap, 'cx').and.callFake( (data) => {
      return data.element || 'my-class';
    });
  });


  it('defines the expected top level elements', () => {
    useShallowRenderer();
    expect(this.renderedComponent.type).toBe('div');
    expect(this.spyCx).toHaveBeenCalledWith({element: null});
    expect(this.renderedComponent.props.className).toBe('my-class');
  });

  describe('contains PaginationArrow components', () => {

    it('2 of them', () => {
      useShallowRenderer();
      expect(this.renderedComponent.props.children[0].type).toBe(PaginationArrow);
      expect(this.renderedComponent.props.children[2].type).toBe(PaginationArrow);
    });

    it('the left one gets disabled when we are at the start of the permitted period', () => {
      useShallowRenderer({
        minimumDate: new Date(2000, 6, 15),
        initialYear: 2000,
        initialMonth: 6,
      });
      expect(this.renderedComponent.props.children[0].props.disabled).toBe(true);
    });

    it('the left one does not get disabled when we are not at the start of the permitted period', () => {
      useShallowRenderer({
        minimumDate: new Date(2000, 1, 15),
        initialYear: 2000,
        initialMonth: 6,
      });
      expect(this.renderedComponent.props.children[0].props.disabled).toBe(false);
    });

    it('the left one when clicked moves the calendar one month in the past', () => {
      useDocumentRenderer({
        initialYear: 2000,
        initialMonth: 6,
      });
      var leftArrow = TestUtils.scryRenderedDOMComponentsWithClass(this.renderedComponent, 'DateRangePicker__PaginationArrowIcon')[0];
      TestUtils.Simulate.click(leftArrow);

      expect(this.renderedComponent.state.month).toBe(5);
    });

    it('the right one gets disabled when we are at the end of the permitted period', () => {
      useShallowRenderer({
        maximumDate: new Date(2000, 6, 15),
        initialYear: 2000,
        initialMonth: 6,
      });
      expect(this.renderedComponent.props.children[2].props.disabled).toBe(true);
    });

    it('the right one does not get disabled when we are not at the end of the permitted period', () => {
      useShallowRenderer({
        maximumDate: new Date(2000, 6, 15),
        initialYear: 2000,
        initialMonth: 6,
      });
      expect(this.renderedComponent.props.children[2].props.disabled).toBe(true);
    });

    it('the right one when clicked moves the calendar one month in the future', () => {
      useDocumentRenderer({
        initialYear: 2000,
        initialMonth: 6,
      });
      var rightArrow = TestUtils.scryRenderedDOMComponentsWithClass(this.renderedComponent, 'DateRangePicker__PaginationArrowIcon')[1];
      TestUtils.Simulate.click(rightArrow);

      expect(this.renderedComponent.state.month).toBe(7);
    });

  });

  describe('contains CalendarMonth components', () => {

    describe('which number is', () => {
      it('by default only one', () => {
        useShallowRenderer();
        expect(this.renderedComponent.props.children[1].length).toBe(1);
        expect(this.renderedComponent.props.children[1][0].type).toBe(CalendarMonth);
      });

      it('otherwise a number equal to props.numberOfCalendars', () => {
        useShallowRenderer({
          numberOfCalendars: 3,
        });
        expect(this.renderedComponent.props.children[1].length).toBe(3);
        expect(this.renderedComponent.props.children[1][0].type).toBe(CalendarMonth);
      });
    });

    describe('for each component the value', () => {

      describe('when it is a moment', () => {

        it('is set to null if it is not included in the corresponding month', () => {
          var value = moment('2003 01 01', 'YYYY MM DD');
          useShallowRenderer({
            initialYear: 2000,
            initialMonth: 6,
            value: value,
            selectionType: 'single',
            initialFromValue: false,
          });
          expect(this.renderedComponent.props.children[1][0].props.value).toBe(null);
        });

        it('otherwise it uses props.value', () => {
          var value = moment('2000 06 05', 'YYYY MM DD');
          useShallowRenderer({
            initialYear: 2000,
            initialMonth: 5,
            value: value,
            selectionType: 'single',
            initialFromValue: false,
          });
          expect(this.renderedComponent.props.children[1][0].props.value).toBe(value);
        });

      });

      describe('when it is a moment range', () => {

        it('is set to null if it is not overlapping the corresponding month', () => {
          var value = moment.range(moment('2003 01 01', 'YYYY MM DD'), moment('2004 01 01', 'YYYY MM DD'));
          useShallowRenderer({
            initialYear: 2000,
            initialMonth: 6,
            value: value,
            selectionType: 'range',
            initialFromValue: false,
          });
          expect(this.renderedComponent.props.children[1][0].props.value).toBe(null);
        });

        it('otherwise it uses props.value', () => {
          var value = moment.range(moment('2000 04 01', 'YYYY MM DD'), moment('2000 09 01', 'YYYY MM DD'));
          useShallowRenderer({
            initialYear: 2000,
            initialMonth: 6,
            value: value,
            selectionType: 'range',
            initialFromValue: false,
          });
          expect(this.renderedComponent.props.children[1][0].props.value).toBe(value);
        });

      });

    });

    describe('for each component the highlighted date', () => {

      it('defaults to props.highlightedDate', () => {

      });

      it('is set to null if it is not a moment', () => {

      });

      it('is set to null if the current month does not include the date',  () => {

      });

    });

    describe('for each component the highlighted range', () => {

      it('defaults to props.highlightedRange', () => {

      });

      it('is set to null if it is not a moment range', () => {

      });

      it('is set to null if the current month does not include the date range',  () => {

      });

    });

    describe('each component takes in a large number of other attributes', () => {

      it('like props.bemBlock', () => {

      });

      it('like props.bemNamespace', () => {

      });

      it('like props.firstOfWeek', () => {

      });


    });

    describe('each component is provided with a number of event handlers', () => {

      it('onMonthChange', () => {

      });

      it('onYearChange', () => {

      });

      it('onSelectDate', () => {

      });

      it('onHighlightDate', () => {

      });

      it('onUnHighlightDate', () => {

      });

    });

  });

  describe('contains a help message', () => {

    it('if props.helpMessage is defined', () => {

    });

    it('but not otherwise', () => {

    });

  });

  describe('contains a Legend component', () => {

    it('if props.showLegend is defined', () => {

    });

    it('but not otherwise', () => {

    });

  });



});
