function checkAuthorisation(response) {
  return new Promise((resolve, reject) => {
    if (response.status === 401) {
      reject();
    } else {
      resolve(response);
    }
  })
}   

export default checkAuthorisation;