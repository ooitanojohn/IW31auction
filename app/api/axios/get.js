const axios = require('axios');

axios
  .get('http://localhost:180/IW31auction/API/temp.php')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {});
