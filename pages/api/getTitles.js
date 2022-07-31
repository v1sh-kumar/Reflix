import getDBPool from "./config/db";
const reflix = getDBPool("d89m0rkc1o20ec");

module.exports = async (req, res) => {
    // Get Form Data
    const data = req.body.data;
    try {
        // Get genres data from DB
        const genresData = await reflix.query(
            `SELECT * FROM "genres" WHERE name = $1`,
            [data.genre.name]
        );
        // Get genresTitle data from DB
        const genresTitleData = await reflix.query(
            `SELECT * FROM "genretitles" WHERE genreid = $1`,
            [genresData.rows[0].genreid]
        );

        let titlesQuery = `SELECT * FROM "titles" WHERE titleid IN (`;
        let titlesValues = [];
        genresTitleData.rows.forEach((item, i) => {
            titlesValues.push(item.titleid);
            titlesQuery += `$${i + 1},`;
        });
        titlesQuery = titlesQuery.slice(0, -1) + ")";
        const titleData = await reflix.query(titlesQuery, titlesValues);
        if (genresData.rows.length == 0) {
            res.status(200).json({ data: [] });
        } else {
            res.status(200).json({ data: titleData.rows });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message, server: true });
    }
};
