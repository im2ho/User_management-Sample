package com.kh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kh.model.KakaoUser;

public interface KakaoUserRepository extends JpaRepository<KakaoUser, Long> {

	//회원정보 존재하는지 확인
	KakaoUser findByEmail(String email);
}
