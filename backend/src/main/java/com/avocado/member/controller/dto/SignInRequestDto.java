package com.avocado.member.controller.dto;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignInRequestDto {
    private String email;
    private String password;
}
