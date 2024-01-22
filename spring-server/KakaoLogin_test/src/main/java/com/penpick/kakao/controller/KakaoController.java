package com.penpick.kakao.controller;

//예시: KakaoController.java

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KakaoController {

	@GetMapping("/kakao/callback")
	public String kakaoCallback(@RequestParam String code) {
		// code를 이용하여 Kakao로부터 토큰을 받아오는 로직
		// 토큰을 이용하여 사용자 정보를 요청하고, 필요한 처리를 수행
		
		return "Kakao login success!";
	}
}