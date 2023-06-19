#
# Build stage
#
FROM maven:3.9.2-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY . /app/
RUN mvn clean package

#
# Package stage
#
FROM openjdk:19
WORKDIR /app
COPY --from=build /app/target/*.jar /app/app.jar
EXPOSE 8004
ENTRYPOINT ["java","-jar","app.jar"]