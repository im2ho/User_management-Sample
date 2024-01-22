package com.penpick.kakao.dto;

import lombok.Data;
import lombok.Builder;

//DTO(Data Transfer Object)
//React에서 전송한 Kakao 로그인 정보를 담는 클래스
@Builder
@Data
public class KakaoLoginDTO {
   
	private String accessToken;
	private String nickname;
	private String email;
	
//	//add
//	private String name;
//	private String birthdate;

}
