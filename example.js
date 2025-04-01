const api = require("./api");

(() => {
  let page = 2;

  api
    .Home(page).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
})();

// OR

/* (async () => {
  let page = 2;

  try {
    let result = await api.Home(page);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
})(); */