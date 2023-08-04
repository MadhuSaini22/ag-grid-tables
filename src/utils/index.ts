export const convertFragmentDataIntoOptions = (inputObj: any) => {
  const result = [];
  for (const key in inputObj) {
    if (inputObj.hasOwnProperty(key)) {
      const value = inputObj[key];
      const obj = { value: key, label: value };
      result.push(obj);
    }
  }
  return result;
};
