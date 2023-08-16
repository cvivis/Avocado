package com.avocado;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AvocadoApplication {

	public static void main(String[] args) {
		SpringApplication.run(AvocadoApplication.class, args);
	}

}
