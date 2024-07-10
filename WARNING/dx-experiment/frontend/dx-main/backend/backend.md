1. elysia
2. django
3. laravel
4. fiber
5. spring-boot
6. ruby-on-rails
7. phoenix














































1. Elysia
npm install -g bun
npm install -g npm@10.4.0
bun create elysia elysia
bun run dev

2. Laravel
composer create-project laravel/laravel laravel
php artisan serve


3. Spring Boot
curl https://start.spring.io/starter.zip -o project.zip
unzip project.zip
rm project.zip

pom.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.1</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.example</groupId>
    <artifactId>spring-boot-project</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>spring-boot-project</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>11</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- Added dependencies for testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>5.7.0</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>

 ```
 ./mvnw spring-boot:run

4. Rust
5. Phenix






wget https://download.java.net/java/GA/jdk21/13/GPL/openjdk-21_linux-x64_bin.tar.gz









<!-- composer global require laravel/installer:^5.4
laravel new laravel
cd laravel
composer require laravel/breeze --dev
php artisan breeze:install api -->