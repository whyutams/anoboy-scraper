const axios = require('axios').default;
const cheerio = require('cheerio');

const BASE_URL = "https://ww1.anoboy.app";

/**
 * Mengambil daftar anime terbaru dari halaman beranda
 * @param {number} page - nomor halaman
 * @param {boolean} not_downloadable - true/false untuk filter pembaruan download (default: false)
 */
async function Home(page, not_downloadable = false) {
    try {
        const response = await axios.get(BASE_URL + (page ? "/page/" + page : ""));
        const $ = cheerio.load(response.data);
        let results = [];

        $(".container .home_index a").each((i, el) => {
            let url = $(el).attr("href");
            if (url.includes("page/") || url.includes("/jadwal.php") || url == "#") return;

            let jamup = $(el).find(".jamup").text().split(",");

            let _ = {
                name: $(el).attr("title"),
                img: `${BASE_URL}` + $(el).find("amp-img").attr("src"),
                uploaded_at: {
                    date: url.replace(BASE_URL + "/", "").split("/").slice(0, 2).join("/"),
                    day: jamup[0].replace("UP", "").trim(),
                    hour: jamup[1]?.trim(),
                },
                url: url,
                base_url: BASE_URL
            };

            if (_.uploaded_at.day == '' || !_.uploaded_at.day || _.img == BASE_URL || not_downloadable && _.name.toLowerCase().includes("download")) return;
            results.push(_);
        });

        return results;
    } catch (error) {
        throw new Error("Gagal fetch data Home: " + error.message);
    }
} 

module.exports = { Home };
