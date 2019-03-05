const assignThreatLevel = require('./AssignThreatLevel.js');

test('Assigns medium threat level from percentage between bounds', () => {
    let boundOne = 2;
    let boundTwo = 4;
    let percentage = 3;
    expect(assignThreatLevel(boundTwo, boundOne, percentage)).toBe("Medium");
});

test('Assigns low threat level from percentage beneath lower bound', () => {
    let boundOne = 4;
    let boundTwo = 5;
    let percentage = 3;
    expect(assignThreatLevel(boundOne, boundTwo, percentage)).toBe("Low");
});

test('Assigns High threat level from percentage above higher bound', () => {
    let boundOne = 6;
    let boundTwo = 8;
    let percentage = 10;
    expect(assignThreatLevel(boundOne, boundTwo, percentage)).toBe("High");
});

test('Bounds are the same', () => {
    let boundOne = 6;
    let boundTwo = 6;
    let percentage = 10;
    expect(assignThreatLevel(boundOne, boundTwo, percentage)).toBe("High");
});
