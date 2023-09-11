package com.avocado.member.controller.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignInResponseDto {
    private String email;
    private String nickname;
}
