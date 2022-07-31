import getDBPool from "./config/db";
const reflix = getDBPool("d89m0rkc1o20ec");

module.exports = async (req, res) => {
    try {
        // Get genres data from DB
        const genresData = await reflix.query(`SELECT * FROM "genres"`);
        if (genresData.rows.length == 0) {
            res.status(200).json({ data: [] });
        } else {
            res.status(200).json({ data: genresData.rows });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message, server: true });
    }
};
