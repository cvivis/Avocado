package com.avocado.config;

import com.avocado.member.auth.JwtAccessDeniedHandler;
import com.avocado.member.auth.JwtAuthenticationEntryPoint;
import com.avocado.member.auth.JwtAuthenticationFilter;
import com.avocado.member.auth.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true) //api 별 권한 (@Secured("ROLE_ADMIN))
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web)
                -> web
                .ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()); // 정적 리소스들
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource());
        //TODO : 인증/인가 필요한 경로 설정 및 웹소켓통신 interceptor 추가!
        http
                .httpBasic().disable()
                .csrf().disable()

                .formLogin().disable()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 예외 처리
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint) //customEntryPoint
                .accessDeniedHandler(jwtAccessDeniedHandler) // cutomAccessDeniedHandler

                .and()
                .authorizeRequests() // '인증'이 필요하다
//                .antMatchers("/member/auth/**").authenticated()
//                .antMatchers("/member/auth").authenticated()
//                .antMatchers("관리자 기능..").hasRole("ADMIN") // 관리자 페이지
                .anyRequest().permitAll()

                .and()
                .headers()
                .frameOptions().disable();

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        //TODO : 배포과정에서 재설정 필요!
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedHeader("*");
        // 개발 테스트 용도로 전부 열어둔다.
        configuration.addAllowedMethod("*"); // GET, POST, PUT, DELETE (Javascript 요청 허용)
        // 서버 리소스에 액세스할 수 있는 원본(도메인)을 지정합니다.
        configuration.addAllowedOriginPattern("*"); // 모든 IP 주소 허용 (프론트 앤드 IP만 허용 react)
        configuration.setAllowCredentials(true); // 클라이언트에서 쿠키 요청 허용
        // 브라우저가 Authorization을 읽을 수 있게 허용하는 옵션
        configuration.addExposedHeader("Authorization");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
