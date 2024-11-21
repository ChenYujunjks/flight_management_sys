import { relations } from "drizzle-orm/relations";
import { airline, airlineStaff, airplane, flight, airport, customer, ticket, bookingAgent } from "./schema";

export const airlineStaffRelations = relations(airlineStaff, ({one}) => ({
	airline: one(airline, {
		fields: [airlineStaff.airlineName],
		references: [airline.airlineName]
	}),
}));

export const airlineRelations = relations(airline, ({many}) => ({
	airlineStaffs: many(airlineStaff),
	airplanes: many(airplane),
	flights: many(flight),
}));

export const airplaneRelations = relations(airplane, ({one, many}) => ({
	airline: one(airline, {
		fields: [airplane.airlineName],
		references: [airline.airlineName]
	}),
	flights: many(flight),
}));

export const flightRelations = relations(flight, ({one, many}) => ({
	airline: one(airline, {
		fields: [flight.airlineName],
		references: [airline.airlineName]
	}),
	airplane: one(airplane, {
		fields: [flight.airplaneId],
		references: [airplane.id]
	}),
	airport_departureAirport: one(airport, {
		fields: [flight.departureAirport],
		references: [airport.name],
		relationName: "flight_departureAirport_airport_name"
	}),
	airport_arrivalAirport: one(airport, {
		fields: [flight.arrivalAirport],
		references: [airport.name],
		relationName: "flight_arrivalAirport_airport_name"
	}),
	tickets: many(ticket),
}));

export const airportRelations = relations(airport, ({many}) => ({
	flights_departureAirport: many(flight, {
		relationName: "flight_departureAirport_airport_name"
	}),
	flights_arrivalAirport: many(flight, {
		relationName: "flight_arrivalAirport_airport_name"
	}),
}));

export const ticketRelations = relations(ticket, ({one}) => ({
	customer: one(customer, {
		fields: [ticket.customerEmail],
		references: [customer.email]
	}),
	flight: one(flight, {
		fields: [ticket.flightNum],
		references: [flight.flightNum]
	}),
	bookingAgent: one(bookingAgent, {
		fields: [ticket.bookingAgentId],
		references: [bookingAgent.bookingAgentId]
	}),
}));

export const customerRelations = relations(customer, ({many}) => ({
	tickets: many(ticket),
}));

export const bookingAgentRelations = relations(bookingAgent, ({many}) => ({
	tickets: many(ticket),
}));