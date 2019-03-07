const totalFrequency = require("./TotalFrequency");

let testKeywords = [
{"Word" : "Sandshrew",
"Frequency" : 34},
{"Word" : "Vulpix",
"Frequency" : 24},
{"Word" : "Arcanine",
"Frequency" : 22},
{"Word" : "Cubone",
"Frequency" : 16},
{"Word" : "Mew",
"Frequency" : 1},
{"Word" : "Onix",
"Frequency" : 0}];


test('Calculates the total frequency of all keywords', () => {
    expect(totalFrequency(testKeywords)).toBe(97);
});