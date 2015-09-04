import CustomPropTypes from '../CustomPropTypes.js';

import moment from 'moment';
import {} from 'moment-range';

describe('CustomPropTypes', function () {

  beforeEach(() => {
    this.props = {
      'att-string': 'val1',
      'att-moment': moment(),
      'att-moment-range': moment.range(),
    };
  });

  describe('#momentOrMomentRange', () => {

    it('returns null if no property matches the property name', () => {
      expect(CustomPropTypes.momentOrMomentRange(this.props, 'att-nothing')).toBe(null);
    });

    it('returns null if the property is a moment', () => {
      expect(CustomPropTypes.momentOrMomentRange(this.props, 'att-moment')).toBe(null);
    });

    it('returns null if the property is a moment range', () => {
      expect(CustomPropTypes.momentOrMomentRange(this.props, 'att-moment-range')).toBe(null);
    });

    it('throws an error otherwise', () => {
      expect(CustomPropTypes.momentOrMomentRange(this.props, 'att-string')).toEqual(new Error('\'att-string\' must be a moment or a moment range'));
    });

  });

  describe('#moment', () => {

    it('returns null if no property matches the property name', () => {
      expect(CustomPropTypes.moment(this.props, 'att-nothing')).toBe(null);
    });

    it('returns null if the property is a moment', () => {
      expect(CustomPropTypes.moment(this.props, 'att-moment')).toBe(null);
    });

    it('throws an error otherwise', () => {
      expect(CustomPropTypes.moment(this.props, 'att-moment-range')).toEqual(new Error('\'att-moment-range\' must be a moment'));
      expect(CustomPropTypes.moment(this.props, 'att-string')).toEqual(new Error('\'att-string\' must be a moment'));
    });

  });

  describe('#momentRange', () => {

    it('returns null if no property matches the property name', () => {
      expect(CustomPropTypes.momentRange(this.props, 'att-nothing')).toBe(null);
    });

    it('returns null if the property is a moment range', () => {
      expect(CustomPropTypes.momentRange(this.props, 'att-moment-range')).toBe(null);
    });

    it('throws an error otherwise', () => {
      expect(CustomPropTypes.momentRange(this.props, 'att-moment')).toEqual(new Error('\'att-moment\' must be a moment range'));
      expect(CustomPropTypes.momentRange(this.props, 'att-string')).toEqual(new Error('\'att-string\' must be a moment range'));
    });

  });

});
