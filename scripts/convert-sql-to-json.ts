import fs from "fs";
import path from "path";

// 指向 SQL 文件路径
const sqlFilePath = path.join(__dirname, "insert_data.sql");
const outputJsonPath = path.join(__dirname, "flights.json");

const sql = fs.readFileSync(sqlFilePath, "utf8");

// 正则提取 INSERT INTO Flight (...) VALUES (...) 的每一组 ()
const regex =
  /\('([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*([\d.]+),\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)'\)/g;

const matches = [...sql.matchAll(regex)];

const flights = matches.map((match) => {
  const [
    _,
    flightNum,
    airlineName,
    departureTime,
    arrivalTime,
    price,
    status,
    airplaneId,
    departureAirport,
    arrivalAirport,
  ] = match;

  return {
    flightNum,
    airlineName,
    departureTime,
    arrivalTime,
    price,
    status,
    airplaneId,
    departureAirport,
    arrivalAirport,
  };
});

fs.writeFileSync(outputJsonPath, JSON.stringify(flights, null, 2));
console.log(`✅ Converted ${flights.length} entries to flights.json`);
