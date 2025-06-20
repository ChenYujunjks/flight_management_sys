import "dotenv/config"; // 👈 这一行非常关键，必须放在最前面
import { db } from "@/server/db";
import { airline, airport, airplane, flight } from "@/server/db/schema";
import flights from "./flights.json"; // <-- 注意路径

async function main() {
  await db
    .insert(airline)
    .values([
      { name: "Delta" },
      { name: "American Airlines" },
      { name: "United" },
      { name: "Air France" },
      { name: "Lufthansa" },
    ]);

  await db.insert(airport).values([
    { name: "JFK", city: "New York" },
    { name: "LAX", city: "Los Angeles" },
    { name: "HND", city: "Tokyo" },
    { name: "CDG", city: "Paris" },
    { name: "FRA", city: "Frankfurt" },
  ]);

  await db.insert(airplane).values([
    { id: "D100", airlineName: "Delta" },
    { id: "D200", airlineName: "Delta" },
    { id: "D300", airlineName: "Delta" },
    { id: "A100", airlineName: "American Airlines" },
    { id: "A200", airlineName: "American Airlines" },
    { id: "U100", airlineName: "United" },
    { id: "U200", airlineName: "United" },
    { id: "AF100", airlineName: "Air France" },
    { id: "AF200", airlineName: "Air France" },
    { id: "AF300", airlineName: "Air France" },
    { id: "LH100", airlineName: "Lufthansa" },
    { id: "LH200", airlineName: "Lufthansa" },
  ]);

  // ✅ 从 JSON 插入 flight 数据
  await db.insert(flight).values(flights);

  console.log("✅ All data seeded!");
}

main().catch((err) => {
  console.error("❌ Error during seeding:", err);
  process.exit(1);
});
