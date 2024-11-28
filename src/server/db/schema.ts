import {
  mysqlTable,
  varchar,
  date,
  datetime,
  decimal,
  int,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const userTable = mysqlTable("User", {
  id: varchar("user_id", { length: 100 })
    .primaryKey()
    .default(sql`(UUID())`),
  email: varchar("email", {
    length: 255,
  })
    .unique()
    .notNull(), // 用户唯一标识符
  password: varchar("password_hash", { length: 255 }).notNull(),
});

export const sessionTable = mysqlTable("Session", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.id),
  expiresAt: datetime("expires_at").notNull(),
});

export const airline = mysqlTable("Airline", {
  name: varchar("name", { length: 255 }).primaryKey(),
});

export const airlineStaff = mysqlTable("AirlineStaff", {
  email: varchar("email", { length: 255 })
    .references(() => userTable.email)
    .primaryKey(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  password: varchar("password_hash", { length: 255 }).notNull(),
  dateOfBirth: datetime("date_of_birth", { mode: "string" }),
  airlineName: varchar("airline_name", { length: 255 })
    .references(() => airline.name)
    .notNull(),
  permission: int("permission").notNull(),
});

export const airplane = mysqlTable("Airplane", {
  id: varchar("id", { length: 20 }).notNull().primaryKey(),
  airlineName: varchar("airline_name", { length: 50 }).references(
    () => airline.name
  ),
});

export const airport = mysqlTable("Airport", {
  name: varchar("name", { length: 50 }).notNull().primaryKey(),
  city: varchar("city", { length: 50 }),
});

export const bookingAgent = mysqlTable("BookingAgent", {
  email: varchar("email", { length: 100 }).notNull().primaryKey(),
  password: varchar("password_hash", { length: 255 }).notNull(),
  bookingAgentId: varchar("booking_agent_id", { length: 20 }).unique(),
  airlineName: varchar("airline_name", { length: 255 })
    .notNull()
    .references(() => airline.name), // foreign key
});

export const customer = mysqlTable("Customer", {
  email: varchar("email", { length: 100 }).notNull().primaryKey(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  password: varchar("password_hash", { length: 255 }).notNull(),
  buildingNumber: varchar("building_number", { length: 20 }),
  street: varchar("street", { length: 50 }),
  city: varchar("city", { length: 50 }),
  state: varchar("state", { length: 50 }),
  phoneNumber: varchar("phone_number", { length: 20 }),
  passportNumber: varchar("passport_number", { length: 20 }),
  passportExpiration: date("passport_expiration", { mode: "string" }),
  passportCountry: varchar("passport_country", { length: 50 }),
  dateOfBirth: date("date_of_birth", { mode: "string" }),
});

export const flight = mysqlTable("Flight", {
  flightNum: varchar("flight_num", { length: 20 }).notNull().primaryKey(),
  airlineName: varchar("airline_name", { length: 50 }).references(
    () => airline.name
  ),
  departureTime: datetime("departure_time", { mode: "string" }),
  arrivalTime: datetime("arrival_time", { mode: "string" }),
  price: decimal("price", { precision: 10, scale: 2 }),
  status: varchar("status", { length: 20 }),
  airplaneId: varchar("airplane_id", { length: 20 }).references(
    () => airplane.id
  ),
  departureAirport: varchar("departure_airport", { length: 50 }).references(
    () => airport.name
  ),
  arrivalAirport: varchar("arrival_airport", { length: 50 }).references(
    () => airport.name
  ),
});

export const ticket = mysqlTable("Ticket", {
  ticketId: varchar("ticket_id", { length: 20 }).notNull().primaryKey(),
  customerEmail: varchar("customer_email", { length: 100 }).references(
    () => customer.email
  ),
  flightNum: varchar("flight_num", { length: 20 }).references(
    () => flight.flightNum
  ),
  bookingAgentId: varchar("booking_agent_id", { length: 20 }).references(
    () => bookingAgent.bookingAgentId
  ),
});
