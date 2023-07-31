FROM openjdk:11-jdk-slim

WORKDIR /app

COPY target/your-app.jar your-app.jar

CMD ["java", "-jar", "your-app.jar"]
