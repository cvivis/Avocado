package com.avocado.member.controller.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SignInResponseDto {
    private String email;
    private String nickname;
}
