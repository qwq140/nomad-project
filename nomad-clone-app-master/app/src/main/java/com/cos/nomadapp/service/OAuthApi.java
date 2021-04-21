package com.cos.nomadapp.service;

import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.user.LoginDto;

import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface OAuthApi {

    @POST("android/oauth/jwt/google")
    Call<CMRespDto<LoginDto>> postOauth(@Body String idToken);

    public static final Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("http://192.168.43.74:8080/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();

}
