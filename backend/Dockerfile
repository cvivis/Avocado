# OpenJDK 기반 이미지를 사용합니다.
FROM openjdk:11-jdk

# 작업 디렉토리를 설정합니다.
WORKDIR /app


# 프로젝트 파일을 컨테이너 내부로 복사합니다.
COPY . .

# Gradle을 사용하여 애플리케이션을 빌드합니다.
RUN ./gradlew clean build

# 호스트에서 빌드된 JAR 파일을 이미지에 복사합니다.
COPY build/libs/*.jar /app/app.jar

# 애플리케이션을 실행합니다.
CMD ["java", "-jar", "app.jar"]





