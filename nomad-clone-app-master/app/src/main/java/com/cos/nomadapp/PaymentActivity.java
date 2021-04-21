package com.cos.nomadapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.courses.Course;
import com.cos.nomadapp.model.pay.PaySaveReqDto;
import com.cos.nomadapp.model.user.LoginDto;
import com.cos.nomadapp.service.NomadApi;
import com.cos.nomadapp.ui.courses.CourseDetailActivity;
import com.google.gson.Gson;
import com.iamport.sdk.data.sdk.IamPortRequest;
import com.iamport.sdk.data.sdk.IamPortResponse;
import com.iamport.sdk.data.sdk.PG;
import com.iamport.sdk.data.sdk.PayMethod;
import com.iamport.sdk.domain.core.Iamport;
import com.makeramen.roundedimageview.RoundedImageView;

import java.util.Date;
import java.util.Map;

import kotlin.Unit;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PaymentActivity extends AppCompatActivity {

    private static final String TAG = "PaymentActivity";

    private Course course;
    private SharedPreferences pref;
    private String token;

    private String payMethod;

    //디자인
    private TextView tvToolbarTitle, tvCourseTitle, tvCourseSubTitle, tvCourseLevel, tvAmountPayment;
    private ImageView ivBack;
    private RoundedImageView ivCourse;

    private Button btnPayNow;
    private RadioGroup rgPaymentMethod;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_payment);

        init();

        setItem();
    }

    private void init(){
        Intent intent = getIntent();
        course = (Course) intent.getSerializableExtra("course");

        // 토큰 가져오기
        pref=getSharedPreferences("pref", MODE_PRIVATE);
        token = pref.getString("token","");

        // 뒤로가기 버튼
        ivBack = findViewById(R.id.iv_back);
        ivBack.setOnClickListener(v -> {
            finish();
        });

        // 앱바 디자인
        tvToolbarTitle = findViewById(R.id.tv_toolbar_title);
        tvToolbarTitle.setText("Payment");

        ivCourse = findViewById(R.id.iv_course);
        tvCourseTitle = findViewById(R.id.tv_course_title);
        tvCourseSubTitle = findViewById(R.id.tv_course_subtitle);
        tvCourseLevel = findViewById(R.id.tv_courses_level);
        tvAmountPayment = findViewById(R.id.tv_amount_payment);
        
        rgPaymentMethod = findViewById(R.id.rg_payment_method);
        btnPayNow = findViewById(R.id.btn_pay_now);

    }

    private void setItem(){
        tvCourseLevel.setVisibility(View.INVISIBLE);
        tvCourseTitle.setText(course.getTitle());
        tvCourseSubTitle.setText(course.getSubTitle());

        Map<String,Object> previewImage = course.getPreviewImage();

        Glide
                .with(this)
                .load(previewImage.get("url")) // 임시 테스트로 넘어오는 이미지는 localhost라서 적용이 안됨
                .centerCrop()
                .placeholder(R.drawable.course_youtube)
                .into(ivCourse);

        tvAmountPayment.setText("￦ "+course.getPrice());
        
        rgPaymentMethod.setOnCheckedChangeListener((group, checkedId) -> {
            if (group==rgPaymentMethod){
                if (checkedId == R.id.rb_domestic_card){
                    Log.d(TAG, "setItem: 국내카드");
                    btnPayNow.setOnClickListener(v -> {
                        payMethod = "domestic_card";
                        Intent intent = new Intent(this, IamportActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        intent.putExtra("course",course);
                        intent.putExtra("payMethod",payMethod);
                        startActivity(intent);

                    });
                } else if(checkedId == R.id.rb_kakao_pay){
                    Log.d(TAG, "setItem: 카카오페이");
                    btnPayNow.setOnClickListener(v -> {
                        payMethod = "kakao_pay";
                        Intent intent = new Intent(this, IamportActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        intent.putExtra("course",course);
                        intent.putExtra("payMethod",payMethod);
                        startActivity(intent);

                    });
                } else if(checkedId == R.id.rb_overseas_card){
                    Log.d(TAG, "setItem: 해외카드");
                    btnPayNow.setOnClickListener(v -> {
                        payMethod = "overseas_card";
                        Intent intent = new Intent(this, IamportActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        intent.putExtra("course",course);
                        intent.putExtra("payMethod",payMethod);
                        startActivity(intent);

                    });
                } else{
                    Log.d(TAG, "setItem: 선택안함");
                    Toast.makeText(this.getApplicationContext(),"결제방법을 체크해주세요",Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

}