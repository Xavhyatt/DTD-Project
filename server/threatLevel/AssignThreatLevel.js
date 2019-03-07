function assignThreatLevel(boundOne, boundTwo, percentage){
    let threatLevel;
    let lowerBound;
    let higherBound;

    if (boundOne < boundTwo) {
        lowerBound = boundOne;
        higherBound = boundTwo;
    } else {
        higherBound = boundOne;
        lowerBound = boundTwo;
    }

    if(percentage < lowerBound){
        threatLevel = "Low";
    }
    else if (percentage < higherBound) {
        threatLevel = "Medium";
    } else {
        threatLevel = "High";
    }

    return threatLevel;
}

module.exports = assignThreatLevel;