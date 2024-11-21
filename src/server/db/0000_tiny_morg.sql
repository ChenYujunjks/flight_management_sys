-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Airline` (
	`airline_name` varchar(50) NOT NULL,
	CONSTRAINT `Airline_airline_name` PRIMARY KEY(`airline_name`)
);
--> statement-breakpoint
CREATE TABLE `AirlineStaff` (
	`username` varchar(50) NOT NULL,
	`password` varchar(50),
	`first_name` varchar(50),
	`last_name` varchar(50),
	`date_of_birth` date,
	`airline_name` varchar(50),
	CONSTRAINT `AirlineStaff_username` PRIMARY KEY(`username`)
);
--> statement-breakpoint
CREATE TABLE `Airplane` (
	`id` varchar(20) NOT NULL,
	`airline_name` varchar(50),
	CONSTRAINT `Airplane_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Airport` (
	`name` varchar(50) NOT NULL,
	`city` varchar(50),
	CONSTRAINT `Airport_name` PRIMARY KEY(`name`)
);
--> statement-breakpoint
CREATE TABLE `BookingAgent` (
	`email` varchar(100) NOT NULL,
	`password` varchar(50),
	`booking_agent_id` varchar(20),
	CONSTRAINT `BookingAgent_email` PRIMARY KEY(`email`),
	CONSTRAINT `booking_agent_id` UNIQUE(`booking_agent_id`)
);
--> statement-breakpoint
CREATE TABLE `Customer` (
	`email` varchar(100) NOT NULL,
	`name` varchar(50),
	`password` varchar(50),
	`building_number` varchar(20),
	`street` varchar(50),
	`city` varchar(50),
	`state` varchar(50),
	`phone_number` varchar(20),
	`passport_number` varchar(20),
	`passport_expiration` date,
	`passport_country` varchar(50),
	`date_of_birth` date,
	CONSTRAINT `Customer_email` PRIMARY KEY(`email`)
);
--> statement-breakpoint
CREATE TABLE `Flight` (
	`flight_num` varchar(20) NOT NULL,
	`airline_name` varchar(50),
	`departure_time` datetime,
	`arrival_time` datetime,
	`price` decimal(10,2),
	`status` varchar(20),
	`airplane_id` varchar(20),
	`departure_airport` varchar(50),
	`arrival_airport` varchar(50),
	CONSTRAINT `Flight_flight_num` PRIMARY KEY(`flight_num`)
);
--> statement-breakpoint
CREATE TABLE `Ticket` (
	`ticket_id` varchar(20) NOT NULL,
	`customer_email` varchar(100),
	`flight_num` varchar(20),
	`booking_agent_id` varchar(20),
	CONSTRAINT `Ticket_ticket_id` PRIMARY KEY(`ticket_id`)
);
--> statement-breakpoint
ALTER TABLE `AirlineStaff` ADD CONSTRAINT `AirlineStaff_ibfk_1` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`airline_name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Airplane` ADD CONSTRAINT `Airplane_ibfk_1` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`airline_name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_ibfk_1` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`airline_name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_ibfk_2` FOREIGN KEY (`airplane_id`) REFERENCES `Airplane`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_ibfk_3` FOREIGN KEY (`departure_airport`) REFERENCES `Airport`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_ibfk_4` FOREIGN KEY (`arrival_airport`) REFERENCES `Airport`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_ibfk_1` FOREIGN KEY (`customer_email`) REFERENCES `Customer`(`email`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_ibfk_2` FOREIGN KEY (`flight_num`) REFERENCES `Flight`(`flight_num`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_ibfk_3` FOREIGN KEY (`booking_agent_id`) REFERENCES `BookingAgent`(`booking_agent_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `airline_name` ON `AirlineStaff` (`airline_name`);--> statement-breakpoint
CREATE INDEX `airline_name` ON `Airplane` (`airline_name`);--> statement-breakpoint
CREATE INDEX `airline_name` ON `Flight` (`airline_name`);--> statement-breakpoint
CREATE INDEX `airplane_id` ON `Flight` (`airplane_id`);--> statement-breakpoint
CREATE INDEX `departure_airport` ON `Flight` (`departure_airport`);--> statement-breakpoint
CREATE INDEX `arrival_airport` ON `Flight` (`arrival_airport`);--> statement-breakpoint
CREATE INDEX `customer_email` ON `Ticket` (`customer_email`);--> statement-breakpoint
CREATE INDEX `flight_num` ON `Ticket` (`flight_num`);--> statement-breakpoint
CREATE INDEX `booking_agent_id` ON `Ticket` (`booking_agent_id`);
*/