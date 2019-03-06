function calculatePercentage(keywordFrequency, wordCount){
    return Math.round((keywordFrequency / wordCount) * 100);
}

module.exports = calculatePercentage;