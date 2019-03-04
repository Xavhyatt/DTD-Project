function totalFrequency(keywordArray){
    let totalWords = 0;
    for(let i = 0; i < keywordArray.length; i++){
        totalWords += keywordArray[i].Frequency;
    }
    return totalWords;
}

module.exports = totalFrequency;