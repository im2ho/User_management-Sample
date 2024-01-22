//package com.penpick.kakao.service;
//
//import org.json.simple.JSONObject;
//import org.json.simple.parser.JSONParser;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//import com.penpick.kakao.dto.KakaoLoginDTO;
//import com.penpick.kakao.model.KakaoUser;
//import com.penpick.kakao.repository.KakaoUserRepository;
//
//
//
//@Service
//public class KakaoLoginService {
//
//	@Value("${kakao.client.id}")
//	private String KAKAO_CLIENT_ID;
//	
//	@Value("${kakao.client.secret}")
//	private String KAKAO_CLIENT_SECRET;
//	
//	//vlaue를 사용했기 때문에 각 값을 변수에 넣어서 보관하겠다는 의미
//	@Value("${kakao.redirect.url}")
//	private String KAKAO_REDIRECT_URL;
//	
//	
//	//카카오 자체에서 인증으로 들어가는 공식 주소 (URI > URL)
//	private final static String KAKAO_AUTH_URI="https://kauth.kakao.com";
//	//카카오 자체에서 API로 들어가는 공식 주소
//	private final static String KAKAO_API_URI="https://kapi.kakao.com";
//	
//	private final KakaoUserRepository kakaoUserRepository;
//	
//	public KakaoLoginService(KakaoUserRepository kakaoUserRepository) {
//		this.kakaoUserRepository = kakaoUserRepository;
//	}
//	
//	public String getKakaoLogin() {
//        return KAKAO_AUTH_URI + "/oauth/authorize"
//                + "?client_id=" + KAKAO_CLIENT_ID
//                + "&redirect_uri=" + KAKAO_REDIRECT_URL
//                + "&response_type=code";
//    }
//	
//	//Database가 아닌, 카카오톡에서 인증한 이메일을 가지고 온다
//	public KakaoLoginDTO getKakaoInfo(String code) throws Exception{
//		
//		if(code == null) throw new Exception("존재하는 인증 코드가 없습니다.");
//		
//		//로그인이 허용된 토큰이 들어갈 공간
//		String accessToken="";
//		//만약 토큰 재발급 시 재발급 토근 들어갈 공간
//		String refreshToken="";
//		
//		//http HEADER에 내 정보를 보내겠음..
//		try {
//			HttpHeaders headers = new HttpHeaders();
//			headers.add("Content-type", "application/x-www-form-urlencoded");
//			
//			MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//			
//			params.add("grant_type", "authorization_code");
//			params.add("client_id", KAKAO_CLIENT_ID);
//			params.add("client_secret", KAKAO_CLIENT_SECRET);
//			params.add("code", code);
//			params.add("redirect_uri", KAKAO_REDIRECT_URL);
//			
//			//RestTemplate : Spring에서 제공하는 객체로, Http에 요청을 보내고 그에 대한 응답을 받아온다
//			//HTTP 요청을 생성하고 서버에 전달해주는 역할
//			RestTemplate restTemplate = new RestTemplate();
//			
//			//HTTP 요청이나 응답의 헤더 본문 http 메서드를 포함하는 엔티티
//			HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, headers);
//			
//			ResponseEntity<String> response = restTemplate.exchange(
//					//요청 보낼 URI
//					//카카오 OAuth 토큰을 얻기 위해서
//					KAKAO_AUTH_URI + "/oauth/token",
//					HttpMethod.POST,
//					httpEntity, //본문에서 요청하고자 하는 내용과 헤더 정보를 포함하는 객체
//					String.class //서버에서 오는 응답을 String 형태로 받아옴
//					);
//			
//			JSONParser jsonParser = new JSONParser();
//			JSONObject jsonObj = (JSONObject)jsonParser.parse(response.getBody());
//			
//			accessToken = (String)jsonObj.get("access_token");
//			refreshToken = (String)jsonObj.get("refresh_token");
//			
//		} catch(Exception err) {
//			throw new Exception("api를 불러오지 못했습니다");
//		}
//		
//		return getUserInfoWithToken(accessToken);
//	}
//	
//	//카카오에서 받은 로그인 허용 토큰을 사용해서 카카오 API에서 사용자 정보를 자겨오는 메서드
//	private KakaoLoginDTO getUserInfoWithToken(String accessToken) throws Exception{
//		//토큰용 HTTPHeader 생성
//		HttpHeaders headers = new HttpHeaders();
//		//Bearer : Http 요청해서 인증할 때 특정 형태로 변환해서 토큰 타입을 나타내기
//		headers.add("Authorization", "Bearer " + accessToken); // Bearer 다음에 공백 추가
//		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//		
//		//내용을 담을 템플릿 생성
//		RestTemplate rt = new RestTemplate();
//		HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(headers);
//
//		System.out.println("httpEntity : " + httpEntity);
//		
//		ResponseEntity<String> response = rt.exchange(
//												KAKAO_API_URI + "/v2/user/me",
//												HttpMethod.POST,
//												httpEntity,
//												String.class
//											);
//		System.out.println("response : " + response);
//		
//		//Response 데이터를 가져오기
//		JSONParser jsonParser = new JSONParser();
//		JSONObject jsonObj = (JSONObject)jsonParser.parse(response.getBody());
//		
//		JSONObject account = (JSONObject)jsonObj.get("kakao_account");
//		JSONObject profile = (JSONObject)account.get("profile");
//	
//		long id = (long) jsonObj.get("id");
//		String email = String.valueOf(account.get("email"));
//		String nickname = String.valueOf(profile.get("nickname"));
//		
//		return KakaoLoginDTO.builder()
//				.email(email)
//				.nickname(nickname)
//				.build();
//	}
//	
//	//데이터베이스에 소셜로그인 정보 저장하는 메서드 생성
//	public KakaoUser registerUser(KakaoLoginDTO kakaoDTO) {
//		
//		KakaoUser user = new KakaoUser();
//		user.setEmail(kakaoDTO.getEmail());
//		user.setNickname(kakaoDTO.getNickname());
//		//user.setName(kakaoDTO.getName());
//		//user.setBirthdate(kakaoDTO.getBirthdate());
//		
//		//사용자를 데이터베이스에 저장
//		return kakaoUserRepository.save(user);
//	}
//		
//}