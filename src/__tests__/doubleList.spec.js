import { doubleList } from '../filesUnderFocusForTesting/doubleList';

describe('CALLBACK FUNCTION', () => {
  const mockCallback = jest.fn();
  doubleList([1, 2, 3], mockCallback);

  it('calls the ~mockCallback~ function five times', () => {
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });

  it('calls the ~mockCallback~ function with argument 1 at first invocation', () => {
    expect(mockCallback.mock.calls[0][0]).toEqual(1);
  });

  it('calls the ~mockCallback~ function with argument 2 at second invocation', () => {
    expect(mockCallback.mock.calls[1][0]).toEqual(2);
  });
});

describe('CALLBACK FUNCTION', () => {
  it('mock the same return value at each invocation', () => {
    const mockCallback = jest.fn();
    mockCallback.mockReturnValue(90);
    doubleList([1, 2, 3], mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    // testing output at first invocation
    expect(mockCallback.mock.results[0].value).toEqual(90);
    // testing output at second invocation
    expect(mockCallback.mock.results[1].value).toEqual(90);
    // testing output at third invocation
    expect(mockCallback.mock.results[2].value).toEqual(90);
  });

  it('mock a different return value at each invocation', () => {
    const mockCallback = jest.fn();
    // we can customize a different return value at each invocation as well using method chaining
    mockCallback
      .mockReturnValueOnce(90)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(1000);
    doubleList([1, 2, 3], mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    // testing output at first invocation
    expect(mockCallback.mock.results[0].value).toEqual(90);
    // testing output at second invocation
    expect(mockCallback.mock.results[1].value).toEqual(100);
    // testing output at third invocation
    expect(mockCallback.mock.results[2].value).toEqual(1000);
  });
});

describe('CALLBACK FUNCTION', () => {
  it('mock implementation using jest.fn', () => {
    const mockCallback = jest.fn(num => num * 10);
    doubleList([1, 2], mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(2);
    // testing output at first invocation
    expect(mockCallback.mock.results[0].value).toEqual(10);
    // testing output at second invocation
    expect(mockCallback.mock.results[1].value).toEqual(20);
  });

  it('mock implementation using mockImplementation method on the function mock', () => {
    const mockCallback = jest.fn();
    mockCallback.mockImplementation(num => num * 100);
    doubleList([1, 2], mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback.mock.results[0].value).toEqual(100);
    expect(mockCallback.mock.results[1].value).toEqual(200);
  });

  it('mock implementation using mockImplementationOnce method on the function mock', () => {
    const mockCallback = jest.fn();
    // mockImplementationOnce comes in handy if you want to customize a more complex behavior of the mockCallback
    // such as producing different results with mutiple function calls
    mockCallback
      .mockImplementationOnce(num => num * 100)
      .mockImplementationOnce(num => num * 1000)
    doubleList([1, 2], mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback.mock.results[0].value).toEqual(100);
    expect(mockCallback.mock.results[1].value).toEqual(2000);
  });
});

describe('CALLBACK FUNCTION', () => {
  it('mocks the callback but keeps the original implementation intact', () => {
    const callback = num => num *= 2;
    // callback has to be placed inside an object for jest.spyOn to work properly
    const object = { callback };
    const mockCallback = jest.spyOn(object, "callback");
    const result = object.callback(1);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(1);
    expect(result).toEqual(2);
  });

  it('mocks and overrides the callback original implementation but resets it later', () => {
    const callback = num => num *= 2;
    const object = { callback };
    const mockCallback = jest.spyOn(object, "callback");
    // override the implementation
    mockCallback.mockImplementationOnce(() => 42);
    const result = object.callback(1);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(1);
    expect(result).toEqual(42);

    // restore the original implementation
    mockCallback.mockRestore();
    expect(object.callback(1)).toEqual(2);
  })
});