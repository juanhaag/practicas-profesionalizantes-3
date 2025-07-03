
CREATE TABLE Countries (
    country_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    capital VARCHAR(100) NOT NULL,
    language VARCHAR(100) NOT NULL,
    surface_area DECIMAL(15, 2) NOT NULL,
    population BIGINT NOT NULL
);


CREATE TABLE Cities (
    city_id INT PRIMARY KEY AUTO_INCREMENT,
    country_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    population BIGINT NOT NULL,
    surface_area DECIMAL(15, 2) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    is_coastal BOOLEAN NOT NULL,
    FOREIGN KEY (country_id) REFERENCES Countries(country_id)
);



DELIMITER //
CREATE PROCEDURE GetCountryDetails(
    IN p_country_id INT
)
BEGIN
    SELECT country_id, name, capital, language, surface_area, population
    FROM Countries
    WHERE country_id = p_country_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE CreateCountry(
    IN p_name VARCHAR(100),
    IN p_capital VARCHAR(100),
    IN p_language VARCHAR(100),
    IN p_surface_area DECIMAL(15, 2),
    IN p_population BIGINT
)
BEGIN
    INSERT INTO Countries (name, capital, language, surface_area, population)
    VALUES (p_name, p_capital, p_language, p_surface_area, p_population);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE UpdateCountry(
    IN p_country_id INT,
    IN p_name VARCHAR(100),
    IN p_capital VARCHAR(100),
    IN p_language VARCHAR(100),
    IN p_surface_area DECIMAL(15, 2),
    IN p_population BIGINT
)
BEGIN
    UPDATE Countries
    SET
        name = p_name,
        capital = p_capital,
        language = p_language,
        surface_area = p_surface_area,
        population = p_population
    WHERE country_id = p_country_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE DeleteCountry(
    IN p_country_id INT
)
BEGIN
    DELETE FROM Countries
    WHERE country_id = p_country_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetCityDetails(
    IN p_city_id INT
)
BEGIN
    SELECT city_id, country_id, name, population, surface_area, postal_code, is_coastal
    FROM Cities
    WHERE city_id = p_city_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE CreateCity(
    IN p_country_id INT,
    IN p_name VARCHAR(100),
    IN p_population BIGINT,
    IN p_surface_area DECIMAL(15, 2),
    IN p_postal_code VARCHAR(20),
    IN p_is_coastal BOOLEAN
)
BEGIN
    INSERT INTO Cities (country_id, name, population, surface_area, postal_code, is_coastal)
    VALUES (p_country_id, p_name, p_population, p_surface_area, p_postal_code, p_is_coastal);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE UpdateCity(
    IN p_city_id INT,
    IN p_country_id INT,
    IN p_name VARCHAR(100),
    IN p_population BIGINT,
    IN p_surface_area DECIMAL(15, 2),
    IN p_postal_code VARCHAR(20),
    IN p_is_coastal BOOLEAN
)
BEGIN
    UPDATE Cities
    SET
        country_id = p_country_id,
        name = p_name,
        population = p_population,
        surface_area = p_surface_area,
        postal_code = p_postal_code,
        is_coastal = p_is_coastal
    WHERE city_id = p_city_id;
END //
DELIMITER ;

-- Procedure to Delete a City
DELIMITER //
CREATE PROCEDURE DeleteCity(
    IN p_city_id INT
)
BEGIN
    DELETE FROM Cities
    WHERE city_id = p_city_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetCountryWithMostPopulousCity()
BEGIN
    SELECT C.name AS country_name
    FROM Countries C
    JOIN Cities Ci ON C.country_id = Ci.country_id
    ORDER BY Ci.population DESC
    LIMIT 1;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetCountriesWithLargeCoastalCities()
BEGIN
    SELECT DISTINCT C.name AS country_name
    FROM Countries C
    JOIN Cities Ci ON C.country_id = Ci.country_id
    WHERE Ci.is_coastal = TRUE AND Ci.population > 1000000;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetCityWithHighestPopulationDensity()
BEGIN
    SELECT C.name AS country_name, Ci.name AS city_name, (Ci.population / Ci.surface_area) AS population_density
    FROM Countries C
    JOIN Cities Ci ON C.country_id = Ci.country_id
    ORDER BY (Ci.population / Ci.surface_area) DESC
    LIMIT 1;
END //
DELIMITER ;




-- DATA GENERADA CON IA --

INSERT INTO Countries (name, capital, language, surface_area, population) VALUES
('United States', 'Washington D.C.', 'English', 9833520.00, 331000000),
('Canada', 'Ottawa', 'English, French', 9984670.00, 38000000),
('Argentina', 'Buenos Aires', 'Spanish', 2780400.00, 45000000),
('Brazil', 'Brasília', 'Portuguese', 8515767.00, 212000000),
('Australia', 'Canberra', 'English', 7692024.00, 25000000),
('Japan', 'Tokyo', 'Japanese', 377975.00, 126000000),
('Egypt', 'Cairo', 'Arabic', 1010408.00, 102000000);


INSERT INTO Cities (country_id, name, population, surface_area, postal_code, is_coastal) VALUES
-- Cities for United States (country_id: 1)
(1, 'New York City', 8419000, 783.80, '10001', TRUE),
(1, 'Los Angeles', 3980000, 1302.00, '90001', TRUE),
(1, 'Chicago', 2705000, 606.00, '60601', FALSE),
-- Cities for Canada (country_id: 2)
(2, 'Toronto', 2930000, 630.20, 'M5G', FALSE),
(2, 'Vancouver', 675000, 114.97, 'V6B', TRUE),
-- Cities for Argentina (country_id: 3)
(3, 'Buenos Aires', 3077000, 203.00, 'C1000', TRUE),
(3, 'Córdoba', 1500000, 576.00, 'X5000', FALSE),
-- Cities for Brazil (country_id: 4)
(4, 'São Paulo', 12330000, 1521.00, '01000', FALSE),
(4, 'Rio de Janeiro', 6770000, 1260.00, '20000', TRUE),
-- Cities for Australia (country_id: 5)
(5, 'Sydney', 5310000, 12144.00, '2000', TRUE),
(5, 'Melbourne', 5080000, 9992.50, '3000', TRUE),
-- Cities for Japan (country_id: 6)
(6, 'Tokyo', 13960000, 2194.00, '100-0001', TRUE),
(6, 'Osaka', 2750000, 223.00, '530-0001', TRUE),
-- Cities for Egypt (country_id: 7)
(7, 'Cairo', 9850000, 528.00, '11511', FALSE),
(7, 'Alexandria', 5300000, 2679.00, '21500', TRUE);