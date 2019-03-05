const calculatePercentage = require('./CalculatePercentage');

let testWordCount = 5000
let keywordFrequency = 97;


test('Calculates the percentage and assigns threat level', () => {
    expect(calculatePercentage(keywordFrequency, testWordCount)).toBe(2);
});