package com.cos.nomadapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.courses.Course;
import com.cos.nomadapp.model.pay.PaySaveReqDto;
import com.cos.nomadapp.model.user.LoginDto;
import com.cos.nomadapp.service.NomadApi;
import com.google.gson.Gson;
import com.iamport.sdk.data.sdk.IamPortApprove;
import com.iamport.sdk.data.sdk.IamPortRequest;
import com.iamport.sdk.data.sdk.IamPortResponse;
import com.iamport.sdk.data.sdk.PG;
import com.iamport.sdk.data.sdk.PayMethod;
import com.iamport.sdk.domain.core.Iamport;

import java.util.Date;

import kotlin.Unit;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class IamportActivity extends AppCompatActivity {

    private static final String TAG = "IamportActivity";
    private SharedPreferences pref;
    private String merchant_uid;
    private Course course;
    private LoginDto loginDto;
    private String token;
    private String payMethod;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_iamport);

        Intent intent = getIntent();
        course = (Course) intent.getSerializableExtra("course");
        payMethod = intent.getStringExtra("payMethod");

        pref = getSharedPreferences("pref",MODE_PRIVATE);
        String user = pref.getString("user","");
        token = pref.getString("token", "");

        Gson gson = new Gson();
        loginDto = gson.fromJson(user,LoginDto.class);

        Iamport.INSTANCE.init(this);

        merchant_uid = "mid_" + (new Date()).getTime();

        IamPortRequest request = IamPortRequest.builder()
                .pg(PG.html5_inicis.makePgRawName(""))
                .pay_method(PayMethod.card)
                .buyer_email(loginDto.getEmail())
                .name(course.getTitle())
                .merchant_uid(merchant_uid)
                .amount(course.getPrice())
                .buyer_name(loginDto.getName()).build();

        Iamport.INSTANCE.payment("imp39401762", request,
                iamPortApprove -> {
                    // (Optional) CHAI 최종 결제전 콜백 함수.
                    return Unit.INSTANCE;
                }, iamPortResponse -> {
                    // 최종 결제결과 콜백 함수.
                    String responseText = iamPortResponse.toString();
                    Log.d("IAMPORT_SAMPLE", responseText);
                    Toast.makeText(this, responseText, Toast.LENGTH_LONG).show();
                    paySave(iamPortResponse);
                    return Unit.INSTANCE;
                });

    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy: ");
        Iamport.INSTANCE.close();
    }

    private void paySave(IamPortResponse iamPortResponse){
        Log.d(TAG, "paySave: "+iamPortResponse.toString());
        PaySaveReqDto paySaveReqDto = PaySaveReqDto.builder()
                .pay_method(PayMethod.card.toString())
                .imp_uid(iamPortResponse.getImp_uid())
                .merchant_uid(merchant_uid)
                .paid_amount(Integer.parseInt(course.getPrice())) // 임시로 100원함 course에서 가격을 불러와야함
                .name(course.getTitle())
                .buyer_name(loginDto.getName())
                .buyer_email(loginDto.getEmail())
                .status("paid")
                .courseId(course.getId())
                .userId(loginDto.getId())
                .build();
        NomadApi nomadApi = NomadApi.retrofit.create(NomadApi.class);
        Call<CMRespDto> call = nomadApi.paySave("Bearer "+token,paySaveReqDto);
        call.enqueue(new Callback<CMRespDto>() {
            @Override
            public void onResponse(Call<CMRespDto> call, Response<CMRespDto> response) {
                Log.d(TAG, "onResponse: "+response.body());
                if (response.body()!=null){
                    finish();
                }
            }

            @Override
            public void onFailure(Call<CMRespDto> call, Throwable t) {
                Log.d(TAG, "onFailure: 실패");
            }
        });
    }
}