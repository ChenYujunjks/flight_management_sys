CREATE TABLE Airline (
    airline_name VARCHAR(50) PRIMARY KEY  -- Primary key: Airline name (unique identifier)
);

CREATE TABLE Airplane (
    id VARCHAR(20) PRIMARY KEY,  -- Primary key: Unique identification number for the airplane
    airline_name VARCHAR(50),
    FOREIGN KEY (airline_name) REFERENCES Airline(airline_name)  -- Foreign key: Reference to the Airline table
);

CREATE TABLE Airport (
    name VARCHAR(50) PRIMARY KEY,  -- Primary key: Airport name (unique identifier)
    city VARCHAR(50)
);

CREATE TABLE Flight (
    flight_num VARCHAR(20) PRIMARY KEY,  -- Primary key: Unique flight number
    airline_name VARCHAR(50),
    departure_time DATETIME,
    arrival_time DATETIME,
    price DECIMAL(10, 2),
    status VARCHAR(20),
    airplane_id VARCHAR(20),
    departure_airport VARCHAR(50),
    arrival_airport VARCHAR(50),
    FOREIGN KEY (airline_name) REFERENCES Airline(airline_name),  -- Foreign key: Reference to the Airline table
    FOREIGN KEY (airplane_id) REFERENCES Airplane(id),  -- Foreign key: Reference to the Airplane table
    FOREIGN KEY (departure_airport) REFERENCES Airport(name),  -- Foreign key: Reference to the Airport table
    FOREIGN KEY (arrival_airport) REFERENCES Airport(name)  -- Foreign key: Reference to the Airport table
);

CREATE TABLE Customer (
    email VARCHAR(100) PRIMARY KEY,  -- Primary key: Unique email address for the customer
    name VARCHAR(50),
    password VARCHAR(50),
    building_number VARCHAR(20),
    street VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(50),
    phone_number VARCHAR(20),
    passport_number VARCHAR(20),
    passport_expiration DATE,
    passport_country VARCHAR(50),
    date_of_birth DATE
);

CREATE TABLE BookingAgent (
    email VARCHAR(100) PRIMARY KEY,  -- Primary key: Unique email address for the booking agent
    password VARCHAR(50),
    booking_agent_id VARCHAR(20),
    UNIQUE (booking_agent_id)  -- Ensures booking_agent_id is unique
);

CREATE TABLE AirlineStaff (
    username VARCHAR(50) PRIMARY KEY,  -- Primary key: Unique username for the airline staff
    password VARCHAR(50),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    airline_name VARCHAR(50),
    FOREIGN KEY (airline_name) REFERENCES Airline(airline_name)  -- Foreign key: Reference to the Airline table
);

CREATE TABLE Ticket (
    ticket_id VARCHAR(20) PRIMARY KEY,  -- Primary key: Unique ticket ID
    customer_email VARCHAR(100),
    flight_num VARCHAR(20),
    booking_agent_id VARCHAR(20) NULL,
    FOREIGN KEY (customer_email) REFERENCES Customer(email),  -- Foreign key: Reference to the Customer table
    FOREIGN KEY (flight_num) REFERENCES Flight(flight_num),  -- Foreign key: Reference to the Flight table
    FOREIGN KEY (booking_agent_id) REFERENCES BookingAgent(booking_agent_id)  -- Foreign key: Reference to the BookingAgent table
);
