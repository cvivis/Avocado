package com.avocado.member.auth;

import com.avocado.member.domain.reposiotry.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetailsImpl loadUserByUsername(String email) throws UsernameNotFoundException {
        return memberRepository.findByEmail(email)
                .map((member -> new UserDetailsImpl(member)))
                .orElseThrow(()-> new UsernameNotFoundException("해당 이메일 검색 x. email:" + email));
    }
}
