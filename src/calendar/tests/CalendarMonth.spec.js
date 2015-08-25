import React from 'react/addons';
import CalendarMonth from '../CalendarMonth.jsx';
import CalendarDate from '../CalendarDate.jsx';
import moment from 'moment';
import {} from 'moment-range';


const TestUtils = React.addons.TestUtils;

describe('The CalendarMonth Component', function () {
  beforeEach(() => {
    this.spyCx = spyOn(CalendarMonth.prototype.__reactAutoBindMap, 'cx').and.returnValue('my-class');

    var shallowRenderer = TestUtils.createRenderer();
    var firstOfWeek = 0;
    var firstOfMonth = moment();
    shallowRenderer.render(<CalendarMonth
      firstOfWeek={firstOfWeek}
      firstOfMonth={firstOfMonth}
      enabledRange={moment.range()}
      dateComponent={CalendarDate}
    />);
    this.renderedComponent = shallowRenderer.getRenderOutput();
  });

  it('should render the right element', () => {
    expect(this.renderedComponent.type).toBe('div');
    expect(this.spyCx).toHaveBeenCalledWith({
      element: 'Month',
    });
    expect(this.renderedComponent.props.className).toEqual('my-class');
  });

  describe('has a logical header', () => {

    it('which is a div with the correct class', () => {

    });

    describe('displaying month information', () => {

      it('which displays the name of the month', () => {

      });

      it('which does not show navigation if props.disableNavigation is true', () => {

      });

      it('which shows navigation if props.disableNavigation is false', () => {

      });

      it('which calls props.onMonthChange if props.disableNavigation is false and if the selected value changes', () => {

      });

    });

    describe('displaying year information', () => {

      it('which displays the name of the year', () => {

      });

      it('which does not show navigation if props.disableNavigation is true', () => {

      });

      it('which shows navigation if props.disableNavigation is false', () => {

      });

      it('which calls props.onYearChange if props.disableNavigation is false and if the selected value changes', () => {

      });

    });

    describe('has a table', () => {

      it('which has the expected className', () => {

      });

      describe('whose head contains day information', () => {

        it('has the correct type and class', () => {

        });

        it('contains the expected elements', () => {

        });

      });

    });

    it('has a body containing the weeks', () =>{

    });


  });
});
