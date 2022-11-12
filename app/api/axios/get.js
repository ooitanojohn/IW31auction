const axios = require('axios');

axios.get('http://127.0.0.1:180/IW13auction/temp/helloworld.php')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
  });