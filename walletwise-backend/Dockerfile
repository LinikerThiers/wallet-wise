FROM eclipse-temurin:21-jdk-jammy
VOLUME /tmp
COPY . .
RUN chmod +x ./mvnw
RUN ./mvnw clean install -DskipTests
ENTRYPOINT ["java", "-jar", "target/walletwise-0.0.1-SNAPSHOT.jar"]



