## ANOBOY SCRAPER

Official Website: <a href="https://ww1.anoboy.app/">anoboy</a><br>

### Anything we can do:

| No  | Endpoint | Method |         Description          |
| :-: | -------- | :----: | :--------------------------: |
|  1  | Home     |   -    |     Info pembaruan anime     |
|  2  | Search   | Query  | Cari anime berdasarkan judul |
|  3  | Detail   |  URL   |      Info detail anime       |

### How to use:

```js
const api = require("./api");

(() => {
  let page = 2;

  api
    .Home(page)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
})();

// OR

(async () => {
  let page = 2;

  try {
    let result = await api.Home(page);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
})();
```

### Result:

```json
{
  page: 2,
  results: [
    {
      name: 'Solo Leveling Season 1 + 2',
      img: 'https://ww1.anoboy.app/img/upload/01as-Solo%20Leveling.jpg',
      uploaded_at: { date: '2024/01', day: 'Minggu', hour: '00:30 Wib' },
      url: 'https://ww1.anoboy.app/2024/01/solo-leveling-season-1-2/',
      base_url: 'https://ww1.anoboy.app'
    },
    {
      name: 'Fate/Grand Order: Shuukyoku Tokuiten – Kani Jikan Shinden Solomon',
      img: 'https://ww1.anoboy.apphttps://blogger.googleusercontent.com/img/a/AVvXsEhcefQ7BQyvVvFd0PWG5QDNCQnoJ0Y-TuzcZfVZCRhYu5e0Z6G4ZUBNbmAfDpsRizZRmh6AGRnPYAt2cn_MD3m_lwXFCw04btCgoGhNFg0aE0fUXHpePuqHsSv3hGHfhw-Cd6Cw0GN289U9FQ9dnvlJNPiqmsFcXQhAW00k7EEmBwQv9fwJOZ4DDD1T=s240',
      uploaded_at: { date: '2022/02', day: 'Senin', hour: '03:28 Wib' },
      url: 'https://ww1.anoboy.app/2022/02/fate-grand-order-shuukyoku-tokuiten-kani-jikan-shinden-solomon/',
      base_url: 'https://ww1.anoboy.app'
    },

    ...
  ]
}
```

<br><br>

##### ⚠️ DISCLAIMER: FOR EDUCATE PURPOSE
