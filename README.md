# GestionAgro Springboot and Reactjs project
GestionAgro is a Spring Boot application designed to streamline agricultural management processes. It offers features such as user authentication, user roles and permissions, and CRUD operations for managing agricultural data.

## Requirements

- Java 17
- Maven 3.6.3

## Configuration

1. Clone this repository.
2. Configure the database in `application.properties`.
3. Run `mvn install` to build the project.

## Execution Instructions

1. Run `mvn spring-boot:run` to start the project.
2. Open your browser at http://localhost:8080.

## Project Structure

- src/
  - main/
    - java/
      - com/
        - postgresql/
          - connect/
            - controller/
            - dtos
            - model/
            - notifications
            - repo/
            - security/
            - specs/
            - utils
    - resources/
      - application.properties
- pom.xml

## Usage
First you have to be as a persona in the database: (localhost:8080/api/persona/create)
Then you have to be register as an user or admin: (localhost:8080/api/auth/register) localhost:8080/api/auth/registerAdm
For example: 
{
    "usu_persona": 702,
    "login": "Lux",
    "password": "pochoclo",
    "estado": 1
}
To get the list of users, visit (http://localhost:8080/api/usuario/list).
and so on with persona, and perfil.
