package com.kh.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;

import com.kh.model.KakaoUser;
import com.kh.service.KakaoUserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class HomeController {

	private final KakaoUserService kakaoService;

	
	//@RequestMapping(value="/", method=RequestMethod.GET)
	@GetMapping("/")
	public String login(Model model) {
		model.addAttribute("kakaoUrl", kakaoService.getKakaoLogin());
		return "index";
	}
	
	//현재는 Kakao로 로그인하지만, 추후 sns 인증을 거치지 않은 회원가입일 경우를 생각해서 GetMapping을 한 번에 적어준다
	@GetMapping("/main")
	public String home(Model model, HttpSession session) {
		//callback()에서 세션에 set한 loggedInUser 가져와서 다시 세팅
		KakaoUser loggedInUser = (KakaoUser)session.getAttribute("loggedInUser");
		model.addAttribute("loggedInUser", loggedInUser);
		return "main";
	}
}
