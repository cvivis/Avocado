package com.avocado.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisService {

    private final RedisTemplate<String, String> redisTemplate;

    public void save(String key, String value, long limitTime) {
        if(Objects.isNull(key) || Objects.isNull(value) || Objects.isNull(limitTime)) {
            log.error("[RedisService save] 파라미터 null");
            return;
        }
        try {
            redisTemplate.opsForValue().set(key, value, limitTime, TimeUnit.MILLISECONDS);
        } catch(Exception e) {
            log.error("[RedisService save] redis 저장 중 오류 : {}",e.getMessage());
        }
    }

    public String getValue(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void delete(String key) {
        redisTemplate.delete(key);
    }
}
