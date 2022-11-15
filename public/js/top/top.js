const getJson = (json) => {
  console.log(json.name);
  return json.name;
};
axios
  .get('http://localhost/IW31auctionAPI/top/helloworld.php', {
    url: '/php',
    adapter: axiosJsonpAdapter,
    callbackParamName: 'getJson',
    params: {
      name: 'siwk',
    },
  })
  .then((res) => {
    console.log(res);
  });
