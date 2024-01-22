package com.kh.dto;

import lombok.*;

@Builder
@Data
public class KakaoDTO {

	private long id;
	private String nickname;
	private String email;
	
	//add
	private String name;
	private String birthdate;
	
}
