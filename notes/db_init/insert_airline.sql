-- 确保 AirLine 表已存在
CREATE TABLE IF NOT EXISTS Airline (
    name VARCHAR(255) PRIMARY KEY
);

-- 插入一些常见的航空公司
INSERT INTO Airline (name) VALUES
('American Airlines'),
('Delta Airlines'),
('United Airlines'),
('Southwest Airlines'),
('Air Canada'),
('British Airways'),
('Lufthansa'),
('Emirates'),
('Qatar Airways'),
('Singapore Airlines'),
('Cathay Pacific'),
('Japan Airlines'),
('China Southern Airlines'),
('Air France'),
('KLM Royal Dutch Airlines'),
('Turkish Airlines'),
('Etihad Airways'),
('Virgin Atlantic'),
('Alaska Airlines'),
('Hawaiian Airlines');
