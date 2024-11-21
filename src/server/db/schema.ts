import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, varchar, index, foreignKey, date, unique, datetime, decimal } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const airline = mysqlTable("Airline", {
	airlineName: varchar("airline_name", { length: 50 }).notNull(),
},
(table) => {
	return {
		airlineAirlineName: primaryKey({ columns: [table.airlineName], name: "Airline_airline_name"}),
	}
});

export const airlineStaff = mysqlTable("AirlineStaff", {
	username: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 50 }),
	firstName: varchar("first_name", { length: 50 }),
	lastName: varchar("last_name", { length: 50 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateOfBirth: date("date_of_birth", { mode: 'string' }),
	airlineName: varchar("airline_name", { length: 50 }).references(() => airline.airlineName),
},
(table) => {
	return {
		airlineName: index("airline_name").on(table.airlineName),
		airlineStaffUsername: primaryKey({ columns: [table.username], name: "AirlineStaff_username"}),
	}
});

export const airplane = mysqlTable("Airplane", {
	id: varchar({ length: 20 }).notNull(),
	airlineName: varchar("airline_name", { length: 50 }).references(() => airline.airlineName),
},
(table) => {
	return {
		airlineName: index("airline_name").on(table.airlineName),
		airplaneId: primaryKey({ columns: [table.id], name: "Airplane_id"}),
	}
});

export const airport = mysqlTable("Airport", {
	name: varchar({ length: 50 }).notNull(),
	city: varchar({ length: 50 }),
},
(table) => {
	return {
		airportName: primaryKey({ columns: [table.name], name: "Airport_name"}),
	}
});

export const bookingAgent = mysqlTable("BookingAgent", {
	email: varchar({ length: 100 }).notNull(),
	password: varchar({ length: 50 }),
	bookingAgentId: varchar("booking_agent_id", { length: 20 }),
},
(table) => {
	return {
		bookingAgentEmail: primaryKey({ columns: [table.email], name: "BookingAgent_email"}),
		bookingAgentId: unique("booking_agent_id").on(table.bookingAgentId),
	}
});

export const customer = mysqlTable("Customer", {
	email: varchar({ length: 100 }).notNull(),
	name: varchar({ length: 50 }),
	password: varchar({ length: 50 }),
	buildingNumber: varchar("building_number", { length: 20 }),
	street: varchar({ length: 50 }),
	city: varchar({ length: 50 }),
	state: varchar({ length: 50 }),
	phoneNumber: varchar("phone_number", { length: 20 }),
	passportNumber: varchar("passport_number", { length: 20 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	passportExpiration: date("passport_expiration", { mode: 'string' }),
	passportCountry: varchar("passport_country", { length: 50 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateOfBirth: date("date_of_birth", { mode: 'string' }),
},
(table) => {
	return {
		customerEmail: primaryKey({ columns: [table.email], name: "Customer_email"}),
	}
});

export const flight = mysqlTable("Flight", {
	flightNum: varchar("flight_num", { length: 20 }).notNull(),
	airlineName: varchar("airline_name", { length: 50 }).references(() => airline.airlineName),
	departureTime: datetime("departure_time", { mode: 'string'}),
	arrivalTime: datetime("arrival_time", { mode: 'string'}),
	price: decimal({ precision: 10, scale: 2 }),
	status: varchar({ length: 20 }),
	airplaneId: varchar("airplane_id", { length: 20 }).references(() => airplane.id),
	departureAirport: varchar("departure_airport", { length: 50 }).references(() => airport.name),
	arrivalAirport: varchar("arrival_airport", { length: 50 }).references(() => airport.name),
},
(table) => {
	return {
		airlineName: index("airline_name").on(table.airlineName),
		airplaneId: index("airplane_id").on(table.airplaneId),
		departureAirport: index("departure_airport").on(table.departureAirport),
		arrivalAirport: index("arrival_airport").on(table.arrivalAirport),
		flightFlightNum: primaryKey({ columns: [table.flightNum], name: "Flight_flight_num"}),
	}
});

export const ticket = mysqlTable("Ticket", {
	ticketId: varchar("ticket_id", { length: 20 }).notNull(),
	customerEmail: varchar("customer_email", { length: 100 }).references(() => customer.email),
	flightNum: varchar("flight_num", { length: 20 }).references(() => flight.flightNum),
	bookingAgentId: varchar("booking_agent_id", { length: 20 }).references(() => bookingAgent.bookingAgentId),
},
(table) => {
	return {
		customerEmail: index("customer_email").on(table.customerEmail),
		flightNum: index("flight_num").on(table.flightNum),
		bookingAgentId: index("booking_agent_id").on(table.bookingAgentId),
		ticketTicketId: primaryKey({ columns: [table.ticketId], name: "Ticket_ticket_id"}),
	}
});
