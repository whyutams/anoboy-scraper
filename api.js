const axios = require('axios').default;
const cheerio = require('cheerio');

const BASE_URL = "https://ww1.anoboy.app";

/**
 * Mengambil daftar anime terbaru dari halaman beranda
 * @param {number} page - Nomor halaman
 * @param {boolean} download_update - true/false untuk filter pembaruan download (default: false)
 */
async function Home(page, download_update = false) {
    try {
        const response = await axios.get(BASE_URL + (page ? "/page/" + page : ""));
        const $ = cheerio.load(response.data);
        let results = [];

        $(".container .home_index a").each((i, el) => {
            let url = $(el).attr("href");
            if (url.includes("page/") || url.includes("/jadwal.php") || url == "#") return;

            let jamup = $(el).find(".jamup").text().split(",");

            let _ = {
                title: $(el).attr("title"),
                img: `${BASE_URL}` + $(el).find("amp-img").attr("src"),
                uploaded_at: {
                    date: url.replace(BASE_URL + "/", "").split("/").slice(0, 2).join("/"),
                    day: jamup[0].replace("UP", "").trim(),
                    hour: jamup[1]?.trim(),
                },
                url: url,
                base_url: BASE_URL
            };

            if (_.uploaded_at.day == '' || !_.uploaded_at.day || _.img == BASE_URL || !download_update && _.title.toLowerCase().includes("download")) return;
            results.push(_);
        });

        return {
            page: page ? page : 1,
            results: results
        };
    } catch (error) {
        throw new Error("Gagal fetch data Home: " + error.message);
    }
}

/**
 * Mencari anime berdasarkan query
 * @param {string} query - Query pencarian
 * @param {number} page - Nomor halaman
 * @param {boolean} download_update - true/false untuk filter pembaruan download (default: false)
 */
async function Search(query, page, download_update = false) {
    if (!query || query.trim().length === 0) throw new Error("Harap masukkan query!");

    try {
        const searchUrl = `${BASE_URL}/?s=${encodeURIComponent(query.split(" ").join("+"))}${page ? "/page/" + page : ""}`;
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);
        let results = [];

        $(".container .column-content a").each((i, el) => {
            let url = $(el).attr("href");
            if (url.includes("page/") || url.includes("/jadwal.php") || url == "#") return;

            let jamup = $(el).find(".jamup").text().split(",");

            let _ = {
                title: $(el).attr("title"),
                img: `${BASE_URL}` + $(el).find("amp-img").attr("src"),
                uploaded_at: {
                    date: url.replace(BASE_URL + "/", "").split("/").slice(0, 2).join("/"),
                    day: jamup[0].replace("UP", "").trim(),
                    hour: jamup[1]?.trim(),
                },
                url: url,
                base_url: BASE_URL
            };

            if (_.uploaded_at.day == '' || !_.uploaded_at.day || _.img == BASE_URL || !download_update && _.title.toLowerCase().includes("download")) return;
            results.push(_);
        });

        return {
            page: page ? page : 1,
            results: results
        };
    } catch (error) {
        throw new Error("Gagal fetch data Search: " + error.message);
    }
}

/**
 * Detail anime
 * @param {string} url - link url anime 
 */
async function Detail(url) {
    if (!url || url.trim().length === 0 || !isValidUrl(url)) throw new Error("Harap masukkan url yang valid!");

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        let result = {};

        $(".container").each((i, el) => {
            let jamup = $(el).find("time.updated").text().split(",");
            let column = $(el).find(".column-three-fourth");
            let seri = [];

            $(el).find(".hq").each((_, __) => {
                seri.push($(__).text().trim());
            });

            result = {
                pagetitle: $(el).find(".pagetitle h1").text().trim(),
                title: $(el).find(".unduhan table tr td").eq(0).text().trim(),
                img: column.find("amp-img").attr("src"),
                total_eps: $(el).find(".unduhan table tr td").eq(1).text().trim().split(" ")[2] || "-",
                total_season: seri.filter(x => x.toLowerCase().includes("season")).length || null,
                studio: $(el).find(".unduhan table tr td").eq(2).text().trim() || "-",
                source: $(el).find(".unduhan table tr td").eq(3).text().trim() || "-",
                genre: $(el).find(".unduhan table tr td").eq(4).text().trim() || "-",
                score: $(el).find(".unduhan table tr td").eq(5).text().trim() || "-",
                synopsis: $(el).find(".unduhan").eq(0).text().trim() || "-",
                serial: seri,
                updated_at: {
                    date: $(el).find("time.updated").attr("datetime").split(" ")[0],
                    day: jamup[0].trim(),
                    hour: jamup[1]?.trim(),
                },
                url: url,
                base_url: BASE_URL
            };
        });

        return result;
    } catch (error) {
        throw new Error("Gagal fetch data Search: " + error.message);
    }
}

const isValidUrl = url => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = { Home, Search, Detail };
