
const  { callFakeAPI } = require( './App');
const fetchMock = 'jest-fetch-mock';


fetchMock.enableMocks();

describe('API Call Count Test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should make the correct number of API calls based on the number of winners', async () => {
    const winners = ['X', 'O', 'X']; 
    await callFakeAPI(winners);
    expect(fetchMock).toHaveBeenCalledTimes(winners.length);
  });
});
