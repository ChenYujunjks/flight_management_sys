-- Insert data into Airline table
INSERT INTO Airline (airline_name) VALUES ('China Eastern');
INSERT INTO Airline (airline_name) VALUES ('United Airlines');  -- 新增美国航空公司
INSERT INTO Airline (airline_name) VALUES ('Delta Airlines');   -- 新增美国航空公司
INSERT INTO Airline (airline_name) VALUES ('Emirates');  -- Insert data into Airline table for Emirates

-- Insert data into Airport table
INSERT INTO Airport (name, city) VALUES ('JFK', 'New York City');
INSERT INTO Airport (name, city) VALUES ('PVG', 'Shanghai');
INSERT INTO Airport (name, city) VALUES ('LAX', 'Los Angeles');  -- 新增加州机场
INSERT INTO Airport (name, city) VALUES ('MIA', 'Miami');        -- 新增佛罗里达机场

-- Insert data into Airplane table
INSERT INTO Airplane (id, airline_name) VALUES ('CE001', 'China Eastern');
INSERT INTO Airplane (id, airline_name) VALUES ('CE002', 'China Eastern');
INSERT INTO Airplane (id, airline_name) VALUES ('UA001', 'United Airlines');  -- 新增United Airlines飞机
INSERT INTO Airplane (id, airline_name) VALUES ('UA002', 'United Airlines');  -- 新增United Airlines飞机
INSERT INTO Airplane (id, airline_name) VALUES ('DL001', 'Delta Airlines');   -- 新增Delta Airlines飞机
INSERT INTO Airplane (id, airline_name) VALUES ('EK001', 'Emirates');  -- 新增Emirates航空公司的飞机

-- Insert data into Flight table
-- China Eastern flights
INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport)
VALUES ('CE1001', 'China Eastern', '2024-12-01 08:00:00', '2024-12-01 20:00:00', 500.00, 'upcoming', 'CE001', 'JFK', 'PVG');

INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport)
VALUES ('CE1002', 'China Eastern', '2024-11-25 09:00:00', '2024-11-25 19:00:00', 450.00, 'delayed', 'CE002', 'PVG', 'JFK');

-- New flight from JFK to Miami (MIA) by United Airlines
INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport)
VALUES ('UA1003', 'United Airlines', '2024-12-05 10:00:00', '2024-12-05 13:00:00', 300.00, 'in-progress', 'UA001', 'JFK', 'MIA');

-- Insert data into Flight table for Emirates flight
INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport)
VALUES ('EK1001', 'Emirates', '2024-12-10 15:00:00', '2024-12-10 23:00:00', 600.00, 'upcoming', 'EK001', 'JFK', 'LAX');  -- Emirates flight from JFK to LAX

-- Insert data into Customer table
INSERT INTO Customer (email, name, password, building_number, street, city, state, phone_number, passport_number, passport_expiration, passport_country, date_of_birth)
VALUES ('john.doe@example.com', 'John Doe', 'password123', '123', 'Main St', 'New York', 'NY', '1234567890', 'A1234567', '2030-12-31', 'USA', '1990-01-01');

INSERT INTO Customer (email, name, password, building_number, street, city, state, phone_number, passport_number, passport_expiration, passport_country, date_of_birth)
VALUES ('jane.smith@example.com', 'Jane Smith', 'password456', '456', 'High St', 'Shanghai', 'SH', '0987654321', 'B7654321', '2032-06-30', 'China', '1992-02-02');

-- New customer Bruce Chen
INSERT INTO Customer (email, name, password, building_number, street, city, state, phone_number, passport_number, passport_expiration, passport_country, date_of_birth)
VALUES ('bruce.chen@example.com', 'Bruce Chen', 'password789', '789', 'Broadway', 'Los Angeles', 'CA', '1122334455', 'C1234567', '2031-07-15', 'USA', '1991-03-03');

-- Insert data into BookingAgent table
INSERT INTO BookingAgent (email, password, booking_agent_id)
VALUES ('agent1@example.com', 'agentpass', 'AGENT001');

-- Insert data into AirlineStaff table
INSERT INTO AirlineStaff (username, password, first_name, last_name, date_of_birth, airline_name)
VALUES ('staff1', 'staffpass', 'Alice', 'Johnson', '1985-05-05', 'China Eastern');

-- Insert data into Ticket table
-- Customer buys ticket directly
INSERT INTO Ticket (ticket_id, customer_email, flight_num)
VALUES ('TICKET001', 'john.doe@example.com', 'CE1001');

-- Customer buys ticket using a booking agent
INSERT INTO Ticket (ticket_id, customer_email, flight_num, booking_agent_id)
VALUES ('TICKET002', 'jane.smith@example.com', 'CE1002', 'AGENT001');

-- New ticket for Bruce Chen on the flight from JFK to Miami
INSERT INTO Ticket (ticket_id, customer_email, flight_num)
VALUES ('TICKET003', 'bruce.chen@example.com', 'UA1003');
