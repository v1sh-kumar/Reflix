// POSTGRES
const Pool = require("pg").Pool;

function getDBPool(dbname) {
    const pool = new Pool({
        user: "vmicoqcyqmzsrf",
        host: "ec2-54-170-90-26.eu-west-1.compute.amazonaws.com",
        password:
            "666b5cf84e9b29f8e23b7243f92f5fa01d9718cf7bdb8d1c427fd0bad50b08e0",
        port: 5432,
        database: dbname,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    return pool;
}

export default getDBPool;
