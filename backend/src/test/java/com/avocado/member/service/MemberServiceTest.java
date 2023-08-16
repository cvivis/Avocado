package com.avocado.member.service;

import com.avocado.member.domain.Member;
import com.avocado.member.domain.MemberRepository;
import com.avocado.member.domain.Status;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@SpringBootTest
class MemberServiceTest {

    @Autowired
    MemberRepository memberRepository;

    @Test
    public void 테스트_메소드명은_한글도_돼요() {
        // given
        // data.sql에 테스트 데이터를 자동으로 넣을 수 있어요.
        List<Member> members = memberRepository.findAll();

        // when
        Member member = members.get(0);

        // then
        assertThat(member.getEmail()).isEqualTo("test1@ssafy.com");
    }

}