package com.kh.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class KakaoUser {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="kakaoUser_seq")
	private Long id;
	private String email;
	private String nickname;
	private String name;
	private String birthdate;
}
