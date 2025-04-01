## ANOBOY SCRAPER

Official Website: <a href="https://ww1.anoboy.app/">anoboy</a><br>

### Anything we can do:
| No | Path | Query | Description |
| :---: | ------ | :------: | :--------: |
| 1 | Home | ❌ | Info pembaruan anime |
| <s>2</s> | <s>Search</s> | <s>✅</s> | <s>Coming soon!</s> | 
| <s>3</s> | <s>Detail</s> | <s>✅</s> | <s>Coming soon!</s> | 

### How to use:

```js
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
[
  {
    "name": "Solo Leveling Season 2 Episode 13 Selesai",
    "img": "https://ww1.anoboy.app/img/upload/01as-Solo%20Leveling%20Season%202.jpg",
    "uploaded_at": { "date": "2025/03", "day": "Minggu", "hour": "00:12 Wib" },
    "url": "https://ww1.anoboy.app/2025/03/solo-leveling-season-2-episode-13-selesai/",
    "base_url": "https://ww1.anoboy.app"
  },
  {
    "name": "Ao no Miburo Episode 24 Selesai",
    "img": "https://ww1.anoboy.app/img/upload/01as-Ao%20no%20Miburo.jpg",
    "uploaded_at": { "date": "2025/03", "day": "Sabtu", "hour": "22:58 Wib" },
    "url": "https://ww1.anoboy.app/2025/03/ao-no-miburo-episode-24-selesai/",
    "base_url": "https://ww1.anoboy.app"
  },

  ...
]
```

<br><br>

##### ⚠️ DISCLAIMER: FOR EDUCATE PURPOSE
