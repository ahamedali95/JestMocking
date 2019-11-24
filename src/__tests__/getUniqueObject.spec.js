import * as utilities from '../thirdPartyutilities/utilities';
import getUniqueObjects from '../filesUnderFocusForTesting/getUniqueObjects';

jest.mock('../thirdPartyutilities/utilities.js');

describe('utilities', () => {
  it('tracks the function\'s behavior', () => {
    getUniqueObjects([{}], 'name');
    expect(utilities.uniqObjectsBasedOnAspecificProperty).toHaveBeenCalledTimes(1);
    expect(utilities.uniqObjectsBasedOnAspecificProperty).toHaveBeenCalledWith([{}], 'name');
  });
});