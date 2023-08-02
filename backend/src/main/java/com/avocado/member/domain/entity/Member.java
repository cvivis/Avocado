package com.avocado.member.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity(name = "member")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;
    private String password;
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Role role;
}
