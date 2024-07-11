package com.linikerthiers.walletwise;

import com.linikerthiers.walletwise.config.CorsConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(CorsConfig.class)
public class WalletwiseApplication {

	public static void main(String[] args) {
		SpringApplication.run(WalletwiseApplication.class, args);
	}

}
