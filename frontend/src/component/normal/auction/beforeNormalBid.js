
export function setBidPlus(nowPrice) { // 호가 설정하는 함수
  let upUnit = 1000;
  let splitUnit = 10000;
  let unit = nowPrice / splitUnit;
  if (unit < 10) {
    return upUnit;
  }
  else if (unit >= 10 && unit < 100) {
    return upUnit * 10;
  }
  else if (unit >= 100 && unit < 1000) {
    return upUnit * 100;
  }
  else return upUnit * 1000 //호가 백만 원 맥스 
}

// 가격 한글 화
export function setBidUnit(price) {
  let unitWords = ['원', '만', '억', '조',];
  let splitUnit = 10000;
  let splitCount = unitWords.length;
  let resultArray = [];
  let resultString = '';

  for (let i = 0; i < splitCount; i++) {
    let unitResult = (price % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return resultString;
}