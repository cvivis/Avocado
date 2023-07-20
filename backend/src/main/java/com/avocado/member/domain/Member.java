package com.avocado.member.domain;

import com.avocado.common.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Builder
    public Member(String nickname, String email, String password, Status status) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.status = status;
    }
    
    // 다른 곳에서 빈 생성자를 사용하지 않도록 하기
    protected Member() {}
}
