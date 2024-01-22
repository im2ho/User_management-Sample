package com.kh.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;

import com.kh.common.MsgEntity;
import com.kh.dto.KakaoDTO;
import com.kh.model.KakaoUser;
import com.kh.repository.KakaoUserRepository;
import com.kh.service.KakaoUserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("kakao")
public class KakaoUserController {

	private final KakaoUserService kakaoUserService;
	private final KakaoUserRepository kakaoUserRepository;
	
	@GetMapping("/callback")
	//결과에 대한 내용을 담을 Entity 설정
	public String callback(HttpServletRequest request, 
												@RequestParam(required=false) String name, 
												@RequestParam(required=false)String birthdate, 
												Model model, 
												HttpSession session) throws Exception {
		
		// 이전에는 kakao/callback 을 작성하면 JSON 형식으로 이동했지만
		// 현재는 register html 파일로 이동하게 한다
		KakaoDTO kakaoInfo = kakaoUserService.getKakaoInfo(request.getParameter("code"), name, birthdate);
		
		//회원가입 진행시, 이미 존재하는 계정인지 확인 필요!
		KakaoUser existingUser = kakaoUserRepository.findByEmail(kakaoInfo.getEmail());
		if(existingUser != null) {
			session.setAttribute("loggedInUser", existingUser);
			return "redirect:/main"; //이미 앱에서 사용한 적이 있는 계정이라면 바로 로그인 완료
		}
		
		model.addAttribute("kakaoInfo", kakaoInfo);
		
		return "register";
	}
	
	
	
	//프론트앤드에서 가지고오는 회원가입 결과를 전달해주는 PostMapping
	@PostMapping("/register")
	public ResponseEntity<MsgEntity> registerUser(@RequestParam String email, 
												  @RequestParam String nickname, 
												  @RequestParam String name,
												  @RequestParam String birthdate) {
		
		KakaoDTO kakaoDTO = KakaoDTO.builder()
							.email(email)
							.nickname(nickname)
							.name(name)
							.birthdate(birthdate)
							.build();
		
		KakaoUser registeredUser = kakaoUserService.registerUser(kakaoDTO);
		
		return ResponseEntity.ok().body(new MsgEntity("Success", registeredUser));
	}
}
