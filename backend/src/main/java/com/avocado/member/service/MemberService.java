package com.avocado.member.service;

import com.avocado.member.domain.Member;
import com.avocado.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public void testCreateMember(Member member) {
        memberRepository.save(member);
    }
}
