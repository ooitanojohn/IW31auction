axios
  .get('http://localhost/IW31auctionAPI/top/helloworld.php', {
    withCredentials: true, // cookieを送信したい場合
    params: {
      name: 'siwk',
    },
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
