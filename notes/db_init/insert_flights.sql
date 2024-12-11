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
