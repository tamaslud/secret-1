export const validator = (cname, lname, isValid) => {
  isValid = false;
  const cnameRegExp = /^\w+[\s]\w+$/;
  /*/^\w+[(\s\-)|(\, )]{0-1}\w*([\s\-]*\w*)*$/;*/
  const lnameRegExp = /^\w+[\s]\w+$/;

  const cnameMatch = String(cname).toLowerCase().match(cnameRegExp);
  const lnameMatch = String(lname).toLowerCase().match(lnameRegExp);

  if (cnameMatch && lnameMatch) {
    isValid = true;
  } else if (!cnameMatch && lnameMatch) {
    isValid = false;
    console.log("Common name is not valid");
  } else if (cnameMatch && !lnameMatch) {
    isValid = false;
    console.log("Latin name is not valid");
  } else {
    isValid = false;
    console.log("None of your inputs are valid");
  }

  return isValid;
};
