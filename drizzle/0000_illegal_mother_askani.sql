CREATE TABLE `Airline` (
	`name` varchar(255) NOT NULL,
	CONSTRAINT `Airline_name` PRIMARY KEY(`name`)
);
--> statement-breakpoint
CREATE TABLE `AirlineStaff` (
	`email` varchar(255) NOT NULL,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`password_hash` varchar(255) NOT NULL,
	`date_of_birth` datetime,
	`airline_name` varchar(255) NOT NULL,
	`permission` int NOT NULL,
	CONSTRAINT `AirlineStaff_email` PRIMARY KEY(`email`)
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
	`password_hash` varchar(255) NOT NULL,
	`booking_agent_id` varchar(20),
	`airline_name` varchar(255) NOT NULL,
	CONSTRAINT `BookingAgent_email` PRIMARY KEY(`email`),
	CONSTRAINT `BookingAgent_booking_agent_id_unique` UNIQUE(`booking_agent_id`)
);
--> statement-breakpoint
CREATE TABLE `Customer` (
	`email` varchar(100) NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
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
CREATE TABLE `Session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `Session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Ticket` (
	`ticket_id` varchar(36) NOT NULL,
	`customer_email` varchar(100),
	`flight_num` varchar(20),
	`booking_agent_id` varchar(20),
	CONSTRAINT `Ticket_ticket_id` PRIMARY KEY(`ticket_id`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`user_id` varchar(100) NOT NULL DEFAULT (UUID()),
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	CONSTRAINT `User_user_id` PRIMARY KEY(`user_id`),
	CONSTRAINT `User_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `AirlineStaff` ADD CONSTRAINT `AirlineStaff_email_User_email_fk` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `AirlineStaff` ADD CONSTRAINT `AirlineStaff_airline_name_Airline_name_fk` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Airplane` ADD CONSTRAINT `Airplane_airline_name_Airline_name_fk` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `BookingAgent` ADD CONSTRAINT `BookingAgent_airline_name_Airline_name_fk` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_airline_name_Airline_name_fk` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_airplane_id_Airplane_id_fk` FOREIGN KEY (`airplane_id`) REFERENCES `Airplane`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_departure_airport_Airport_name_fk` FOREIGN KEY (`departure_airport`) REFERENCES `Airport`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_arrival_airport_Airport_name_fk` FOREIGN KEY (`arrival_airport`) REFERENCES `Airport`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Session` ADD CONSTRAINT `Session_user_id_User_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_customer_email_Customer_email_fk` FOREIGN KEY (`customer_email`) REFERENCES `Customer`(`email`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_flight_num_Flight_flight_num_fk` FOREIGN KEY (`flight_num`) REFERENCES `Flight`(`flight_num`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_booking_agent_id_BookingAgent_booking_agent_id_fk` FOREIGN KEY (`booking_agent_id`) REFERENCES `BookingAgent`(`booking_agent_id`) ON DELETE no action ON UPDATE no action;