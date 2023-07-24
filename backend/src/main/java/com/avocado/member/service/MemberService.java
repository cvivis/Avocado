package com.avocado.member.service;

import com.avocado.member.controller.dto.SignUpRequestDto;
import com.avocado.member.domain.entity.Member;
import com.avocado.member.domain.entity.Role;
import com.avocado.member.domain.reposiotry.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

    private final BCryptPasswordEncoder encoder;

    //유저조회
    public Member getMember(String email){
        return memberRepository.findByEmail(email).orElse(null);
    }
    //유저등록
    @Transactional
    public boolean registerMember(SignUpRequestDto signUpRequestDto) {
        try {
            memberRepository.save(Member.builder()
                    .email(signUpRequestDto.getEmail())
                    .password(encoder.encode(signUpRequestDto.getPassword()))
                    .nickname(signUpRequestDto.getNickname())
                    .role(Role.USER)
                    .build());
            return true;
        } catch(Exception e) {
            log.error("[MemberService registerMember] error : {}",e.getMessage());
        }
        return false;
    }

}
