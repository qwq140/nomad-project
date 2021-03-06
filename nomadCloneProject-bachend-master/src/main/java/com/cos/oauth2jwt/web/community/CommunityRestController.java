package com.cos.oauth2jwt.web.community;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cos.oauth2jwt.Query.CommunityQuery;
import com.cos.oauth2jwt.config.auth.PrincipalDetails;
import com.cos.oauth2jwt.domain.community.Community;
import com.cos.oauth2jwt.domain.likes.Likes;
import com.cos.oauth2jwt.handler.exception.NoLoginException;
import com.cos.oauth2jwt.service.CommunityService;
import com.cos.oauth2jwt.service.LikeService;
import com.cos.oauth2jwt.web.community.dto.CommunityItemRespDto;
import com.cos.oauth2jwt.web.community.dto.CommunityListRespDto;
import com.cos.oauth2jwt.web.community.dto.CommunitySaveReqDto;
import com.cos.oauth2jwt.web.community.dto.CommunityUpdateReqDto;
import com.cos.oauth2jwt.web.dto.CMRespDto;
import com.cos.oauth2jwt.web.likes.dto.LikeClickRespDto;
import com.cos.oauth2jwt.web.likes.dto.LikeSaveReqDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class CommunityRestController {

	private final CommunityService communityService;
	private final CommunityQuery communityQuery;
	
	@GetMapping("/community")
	public CMRespDto<?> findAll(String sort, Long categoryId,
								@PageableDefault(size = 10)Pageable pageable, @AuthenticationPrincipal PrincipalDetails principalDetails) {
		long principalId = 0;
		if (principalDetails != null) {
			principalId = principalDetails.getUser().getId();
		} 
		
		List<CommunityListRespDto> communityEntity = communityService.????????????(sort, categoryId, principalId, pageable);
		return new CMRespDto<>(HttpStatus.OK.value(), "??????", communityEntity);
	}

	@PostMapping("/community")
	public CMRespDto<?> save(@RequestBody CommunitySaveReqDto communitySaveReqDto,
			@AuthenticationPrincipal PrincipalDetails principalDetails) {
		if(principalDetails == null) {
			throw new NoLoginException("???????????? ????????? ??????????????????.");
		}
		Community community = communitySaveReqDto.toEntity();
		community.setUser(principalDetails.getUser());
		Community communityEntity = communityService.?????????(community);
		return new CMRespDto<>(HttpStatus.OK.value(), "??????", communityEntity);
	}

	@GetMapping("/community/{id}")
	public CMRespDto<?> findById(@PathVariable long id,@AuthenticationPrincipal PrincipalDetails principalDetails) {
		Community communityEntity = communityService.????????????(id);
		long principalId = 0;
		if (principalDetails != null) {
			principalId = principalDetails.getUser().getId();
		} 
		LikeClickRespDto respdto = communityQuery.LikeClick(principalId, id);
		
		CommunityItemRespDto communityRespDto = new CommunityItemRespDto();
		communityRespDto.setCommunity(communityEntity);
		communityRespDto.setId(respdto.getId());
		communityRespDto.setLikeCount(respdto.getLikeCount());
		communityRespDto.setLikeCheck(respdto.getLikeCheck());		
		return new CMRespDto<>(HttpStatus.OK.value(), "??????", communityRespDto);
	}

	@PutMapping("/community/{id}")
	public CMRespDto<?> update(@PathVariable long id, @RequestBody CommunityUpdateReqDto communityUpdateReqDto) {
		Community communityEntity = communityService.????????????(id, communityUpdateReqDto);
		return new CMRespDto<>(HttpStatus.OK.value(), "??????", communityEntity);
	}

	@DeleteMapping("/community/{id}")
	public CMRespDto<?> delete(@PathVariable long id) {
		System.out.println("???????????????? : "+id);
		communityService.????????????(id);
		return new CMRespDto<>(HttpStatus.OK.value(), "??????", null);
	}
//	@GetMapping("/community")
//	public CMRespDto<?> findAll(@AuthenticationPrincipal PrincipalDetails principalDetails) {
//		long principalId = 0;
//		if (principalDetails != null) {
//			principalId = principalDetails.getUser().getId();
//		} 
//		List<Community> communityEntity = communityService.????????????();
//		return new CMRespDto<>(HttpStatus.OK.value(), "??????", communityEntity);
//	}

//	@GetMapping("/community/popular/{id}")
//	public CMRespDto<?> findAllByCount(@PathVariable long id) {
//		List<Community> communityEntity = communityService.????????????????????????????????????(id);
//		return new CMRespDto<>(HttpStatus.OK.value(), "??????", communityEntity);
//	}
//
//	@GetMapping("/community/new/{id}")
//	public CMRespDto<?> findAllByCreateDate(@PathVariable long id) {
//		List<Community> communityEntity = communityService.????????????????????????????????????(id);
//		return new CMRespDto<>(HttpStatus.OK.value(), "??????", communityEntity);
//	}

//	@GetMapping("/community/category/{id}")
//	public CMRespDto<?> findByCategoryId(@PathVariable long id) {
//		System.out.println("?????????????????????????" + id);
//		List<Community> communityEntity = communityService.?????????????????????(id);
//		return new CMRespDto<>(HttpStatus.OK.value(), "??????", communityEntity);
//	}

}
