-- 1. Airline
INSERT INTO Airline (name) VALUES ('Delta');
INSERT INTO Airline (name) VALUES ('American Airlines');
INSERT INTO Airline (name) VALUES ('United');
INSERT INTO Airline (name) VALUES ('Air France');
INSERT INTO Airline (name) VALUES ('Lufthansa');

-- 2. Airport
INSERT INTO Airport (name, city) VALUES ('JFK', 'New York');
INSERT INTO Airport (name, city) VALUES ('LAX', 'Los Angeles');
INSERT INTO Airport (name, city) VALUES ('HND', 'Tokyo');
INSERT INTO Airport (name, city) VALUES ('CDG', 'Paris');
INSERT INTO Airport (name, city) VALUES ('FRA', 'Frankfurt');

-- 3. Airplane
-- Delta
INSERT INTO Airplane (id, airline_name) VALUES ('D100', 'Delta');
INSERT INTO Airplane (id, airline_name) VALUES ('D200', 'Delta');
INSERT INTO Airplane (id, airline_name) VALUES ('D300', 'Delta');

-- American Airlines
INSERT INTO Airplane (id, airline_name) VALUES ('A100', 'American Airlines');
INSERT INTO Airplane (id, airline_name) VALUES ('A200', 'American Airlines');

-- United
INSERT INTO Airplane (id, airline_name) VALUES ('U100', 'United');
INSERT INTO Airplane (id, airline_name) VALUES ('U200', 'United');

-- Air France
INSERT INTO Airplane (id, airline_name) VALUES ('AF100', 'Air France');
INSERT INTO Airplane (id, airline_name) VALUES ('AF200', 'Air France');
INSERT INTO Airplane (id, airline_name) VALUES ('AF300', 'Air France');

-- Lufthansa
INSERT INTO Airplane (id, airline_name) VALUES ('LH100', 'Lufthansa');
INSERT INTO Airplane (id, airline_name) VALUES ('LH200', 'Lufthansa');

-- 4. Flight
INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport) VALUES
('F110', 'Delta', '2025-01-01 08:00:00', '2025-01-01 13:00:00', 300.00, 'On-Time', 'D100', 'JFK', 'LAX'),
('F111', 'Delta', '2025-01-02 09:00:00', '2025-01-02 14:00:00', 400.00, 'On-Time', 'D200', 'LAX', 'HND'),
('F112', 'Delta', '2025-01-03 10:00:00', '2025-01-03 15:00:00', 350.00, 'On-Time', 'D300', 'HND', 'CDG'),
('F113', 'Delta', '2025-01-04 07:30:00', '2025-01-04 12:30:00', 450.00, 'On-Time', 'D100', 'CDG', 'FRA'),
('F114', 'Delta', '2025-01-05 06:00:00', '2025-01-05 11:00:00', 500.00, 'On-Time', 'D200', 'FRA', 'JFK'),
('F115', 'Delta', '2025-01-06 08:15:00', '2025-01-06 13:15:00', 550.00, 'On-Time', 'D300', 'JFK', 'HND');

INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport) VALUES
('F210', 'American Airlines', '2025-01-01 09:00:00', '2025-01-01 14:00:00', 320.00, 'On-Time', 'A100', 'LAX', 'JFK'),
('F211', 'American Airlines', '2025-01-02 10:30:00', '2025-01-02 16:00:00', 420.00, 'On-Time', 'A200', 'JFK', 'CDG'),
('F212', 'American Airlines', '2025-01-03 11:00:00', '2025-01-03 17:00:00', 310.00, 'On-Time', 'A100', 'CDG', 'HND'),
('F213', 'American Airlines', '2025-01-04 13:00:00', '2025-01-04 19:00:00', 600.00, 'On-Time', 'A200', 'HND', 'FRA'),
('F214', 'American Airlines', '2025-01-05 08:30:00', '2025-01-05 14:30:00', 250.00, 'On-Time', 'A100', 'FRA', 'LAX'),
('F215', 'American Airlines', '2025-01-06 07:45:00', '2025-01-06 13:45:00', 700.00, 'On-Time', 'A200', 'LAX', 'HND');

INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport) VALUES
('F310', 'United', '2025-01-01 10:00:00', '2025-01-01 15:30:00', 400.00, 'On-Time', 'U100', 'JFK', 'FRA'),
('F311', 'United', '2025-01-02 07:00:00', '2025-01-02 12:00:00', 420.00, 'On-Time', 'U200', 'FRA', 'CDG'),
('F312', 'United', '2025-01-03 09:15:00', '2025-01-03 15:15:00', 500.00, 'On-Time', 'U100', 'CDG', 'LAX'),
('F313', 'United', '2025-01-04 14:00:00', '2025-01-04 20:00:00', 450.00, 'On-Time', 'U200', 'LAX', 'HND'),
('F314', 'United', '2025-01-05 05:30:00', '2025-01-05 11:30:00', 380.00, 'On-Time', 'U100', 'HND', 'JFK'),
('F315', 'United', '2025-01-06 11:45:00', '2025-01-06 17:45:00', 560.00, 'On-Time', 'U200', 'JFK', 'CDG');

INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport) VALUES
('F410', 'Air France', '2025-01-01 06:00:00', '2025-01-01 12:00:00', 600.00, 'On-Time', 'AF100', 'CDG', 'JFK'),
('F411', 'Air France', '2025-01-02 07:30:00', '2025-01-02 13:30:00', 450.00, 'On-Time', 'AF200', 'JFK', 'FRA'),
('F412', 'Air France', '2025-01-03 08:45:00', '2025-01-03 14:45:00', 700.00, 'On-Time', 'AF300', 'FRA', 'HND'),
('F413', 'Air France', '2025-01-04 11:20:00', '2025-01-04 17:20:00', 800.00, 'On-Time', 'AF100', 'HND', 'LAX'),
('F414', 'Air France', '2025-01-05 09:10:00', '2025-01-05 15:10:00', 500.00, 'On-Time', 'AF200', 'LAX', 'CDG'),
('F415', 'Air France', '2025-01-06 12:00:00', '2025-01-06 18:00:00', 650.00, 'On-Time', 'AF300', 'CDG', 'JFK');

INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport) VALUES
('F510', 'Lufthansa', '2025-01-01 13:00:00', '2025-01-01 19:00:00', 300.00, 'On-Time', 'LH100', 'FRA', 'LAX'),
('F511', 'Lufthansa', '2025-01-02 05:30:00', '2025-01-02 11:30:00', 350.00, 'On-Time', 'LH200', 'LAX', 'JFK'),
('F512', 'Lufthansa', '2025-01-03 07:45:00', '2025-01-03 13:45:00', 480.00, 'On-Time', 'LH100', 'JFK', 'HND'),
('F513', 'Lufthansa', '2025-01-04 10:50:00', '2025-01-04 16:50:00', 520.00, 'On-Time', 'LH200', 'HND', 'CDG'),
('F514', 'Lufthansa', '2025-01-05 14:30:00', '2025-01-05 20:30:00', 600.00, 'On-Time', 'LH100', 'CDG', 'FRA'),
('F515', 'Lufthansa', '2025-01-06 08:00:00', '2025-01-06 14:00:00', 900.00, 'On-Time', 'LH200', 'FRA', 'HND');
-- 2024 年 12 月
INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport) VALUES
('F610', 'Delta', '2024-12-01 08:00:00', '2024-12-01 13:00:00', 320.00, 'On-Time', 'D100', 'JFK', 'LAX'),
('F611', 'Delta', '2024-12-02 09:30:00', '2024-12-02 14:30:00', 380.00, 'On-Time', 'D200', 'LAX', 'HND'),
('F612', 'Delta', '2024-12-03 10:00:00', '2024-12-03 15:00:00', 350.00, 'On-Time', 'D300', 'HND', 'CDG'),
('F613', 'Delta', '2024-12-04 07:00:00', '2024-12-04 12:00:00', 450.00, 'Delayed', 'D100', 'CDG', 'FRA'),
('F614', 'Delta', '2024-12-05 06:15:00', '2024-12-05 11:15:00', 500.00, 'On-Time', 'D200', 'FRA', 'JFK');

INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport) VALUES
('F710', 'American Airlines', '2024-12-01 09:00:00', '2024-12-01 14:00:00', 340.00, 'On-Time', 'A100', 'LAX', 'JFK'),
('F711', 'American Airlines', '2024-12-02 10:15:00', '2024-12-02 16:15:00', 420.00, 'On-Time', 'A200', 'JFK', 'CDG'),
('F712', 'American Airlines', '2024-12-03 11:30:00', '2024-12-03 17:30:00', 310.00, 'On-Time', 'A100', 'CDG', 'HND'),
('F713', 'American Airlines', '2024-12-04 13:45:00', '2024-12-04 19:45:00', 590.00, 'On-Time', 'A200', 'HND', 'FRA'),
('F714', 'American Airlines', '2024-12-05 08:20:00', '2024-12-05 14:20:00', 260.00, 'On-Time', 'A100', 'FRA', 'LAX');

-- 2025 年 2 月
INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport) VALUES
('F810', 'United', '2025-02-01 10:00:00', '2025-02-01 15:30:00', 400.00, 'On-Time', 'U100', 'JFK', 'FRA'),
('F811', 'United', '2025-02-02 07:00:00', '2025-02-02 12:00:00', 420.00, 'On-Time', 'U200', 'FRA', 'CDG'),
('F812', 'United', '2025-02-03 09:15:00', '2025-02-03 15:15:00', 510.00, 'On-Time', 'U100', 'CDG', 'LAX'),
('F813', 'United', '2025-02-04 14:00:00', '2025-02-04 20:00:00', 460.00, 'Delayed', 'U200', 'LAX', 'HND'),
('F814', 'United', '2025-02-05 05:30:00', '2025-02-05 11:30:00', 380.00, 'On-Time', 'U100', 'HND', 'JFK');

-- 2025 年 3 月
INSERT INTO Flight (flight_num, airline_name, departure_time, arrival_time, price, status, airplane_id, departure_airport, arrival_airport) VALUES
('F910', 'Air France', '2025-03-01 06:00:00', '2025-03-01 12:00:00', 600.00, 'On-Time', 'AF100', 'CDG', 'JFK'),
('F911', 'Air France', '2025-03-02 07:30:00', '2025-03-02 13:30:00', 450.00, 'On-Time', 'AF200', 'JFK', 'FRA'),
('F912', 'Air France', '2025-03-03 08:45:00', '2025-03-03 14:45:00', 720.00, 'On-Time', 'AF300', 'FRA', 'HND'),
('F913', 'Air France', '2025-03-04 11:20:00', '2025-03-04 17:20:00', 800.00, 'On-Time', 'AF100', 'HND', 'LAX'),
('F914', 'Air France', '2025-03-05 09:10:00', '2025-03-05 15:10:00', 500.00, 'On-Time', 'AF200', 'LAX', 'CDG');