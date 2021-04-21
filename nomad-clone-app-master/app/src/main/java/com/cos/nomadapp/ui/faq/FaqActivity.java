package com.cos.nomadapp.ui.faq;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.CancleOrRefundPolicyActivity;
import com.cos.nomadapp.LoginActivity;
import com.cos.nomadapp.MainActivity;
import com.cos.nomadapp.PrivacyPolicyActivity;
import com.cos.nomadapp.R;
import com.cos.nomadapp.ServiceTermActivity;
import com.cos.nomadapp.UserDashboardActivity;
import com.cos.nomadapp.adapter.FaqAdapter;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.faq.Faq;
import com.cos.nomadapp.model.faq.FaqCategory;
import com.cos.nomadapp.model.faq.FaqGubun;
import com.cos.nomadapp.model.faq.FaqItem;
import com.cos.nomadapp.model.user.LoginDto;
import com.cos.nomadapp.service.NomadApi;
import com.cos.nomadapp.ui.challenges.ChallengesActivity;
import com.cos.nomadapp.ui.community.CommunityActivity;
import com.cos.nomadapp.ui.courses.CoursesActivity;
import com.google.gson.Gson;
import com.makeramen.roundedimageview.RoundedImageView;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import info.androidhive.fontawesome.FontTextView;
import lombok.SneakyThrows;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FaqActivity extends AppCompatActivity {

    private static final String TAG = "FaqActivity";

    private Context mContext = FaqActivity.this;

    private ImageView ivBack;
    private TextView tvToolbarTitle;
    private RecyclerView rvFaqList;
    private List<FaqGubun> faqGubunList;
    private List<FaqCategory> faqCategoryList = new ArrayList<>();
    private List<Faq> faqList = new ArrayList<>();

    private SharedPreferences pref;
    private String token;

    private LoginDto loginDto;
    private long userId;

    private RoundedImageView rivUser;
    private NomadApi nomadApi;

    //footer
    private TextView tvRoadMap,tvCourses,tvCommunity,tvFaq,tvChallenges,tvServiceTerm,tvPrivacyPolicy,tvCancleOrRefundPolicy;
    private FontTextView ftvYoutube, ftvGithub, ftvFacebook, ftvInsta;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_faq);

        ivBack = findViewById(R.id.iv_back);

        tvToolbarTitle = findViewById(R.id.tv_toolbar_title);
        tvToolbarTitle.setText("FAQ");

        tvCourses=findViewById(R.id.tv_courses);
        tvChallenges=findViewById(R.id.tv_challenges);
        tvFaq=findViewById(R.id.tv_faq);
        tvRoadMap=findViewById(R.id.tv_roadmap);
        tvCommunity=findViewById(R.id.tv_community);
        tvServiceTerm=findViewById(R.id.tv_service_term);
        tvPrivacyPolicy=findViewById(R.id.tv_privacy_policy);
        tvCancleOrRefundPolicy=findViewById(R.id.tv_cancle_or_refund_policy);
        ftvInsta=findViewById(R.id.ftv_insta);
        ftvYoutube=findViewById(R.id.ftv_youtube);
        ftvFacebook=findViewById(R.id.ftv_facebook);
        ftvGithub=findViewById(R.id.ftv_github);

        tvCommunity.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), CommunityActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvCourses.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), CoursesActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvChallenges.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), ChallengesActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvRoadMap.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvFaq.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), FaqActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvServiceTerm.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), ServiceTermActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvPrivacyPolicy.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), PrivacyPolicyActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvCancleOrRefundPolicy.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), CancleOrRefundPolicyActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        ftvInsta.setOnClickListener(v->{
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/nomad_coders/?hl=ko"));
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        ftvYoutube.setOnClickListener(v->{
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://www.youtube.com/channel/UCUpJs89fSBXNolQGOYKn0YQ"));
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        ftvFacebook.setOnClickListener(v->{
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://ko-kr.facebook.com/nomadcoders/"));
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        ftvGithub.setOnClickListener(v->{
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/nomadcoders"));
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });

        ivBack.setOnClickListener(v -> {
            finish();
        });



        // 리사이클러뷰
        rvFaqList = findViewById(R.id.rv_faq_list);
        rvFaqList.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));

        faqGubunList = new ArrayList<>();

        //전체 카테고리 불러오기
        nomadApi = NomadApi.retrofit.create(NomadApi.class);
        Call<CMRespDto<List<FaqCategory>>> call = nomadApi.faqCategoryFindAll();
        call.enqueue(new Callback<CMRespDto<List<FaqCategory>>>() {
            @Override
            public void onResponse(Call<CMRespDto<List<FaqCategory>>> call, Response<CMRespDto<List<FaqCategory>>> response) {
                Log.d(TAG, "onResponse: "+response.body());
                faqCategoryList = (List<FaqCategory>) response.body().getData();
                Log.d(TAG, "onResponse: "+faqCategoryList);
                for (int i=0; i<faqCategoryList.size();i++){
                    List<FaqItem> faqItems = new ArrayList<>();
                    for (int j = 0; j < faqCategoryList.get(i).getFaq().size(); j++){
                        faqItems.add(new FaqItem(faqCategoryList.get(i).getFaq().get(j).getId(),faqCategoryList.get(i).getFaq().get(j).getTitle()));
                    }
                    faqGubunList.add(new FaqGubun(faqCategoryList.get(i).getTitle(),faqItems));
                }
                Log.d(TAG, "onResponse: faqGubunList : "+faqGubunList );
                rvFaqList.setAdapter(new FaqAdapter(faqGubunList,FaqActivity.this));


            }

            @Override
            public void onFailure(Call<CMRespDto<List<FaqCategory>>> call, Throwable t) {
                Log.d(TAG, "onFailure: ");
            }
        });

        //roundedImageView 이벤트
        rivUser = (RoundedImageView) findViewById(R.id.riv_user);

    }

    @Override
    protected void onResume() {
        super.onResume();
        pref = getSharedPreferences("pref", MODE_PRIVATE);
        token = pref.getString("token", "");
        appbarRight();
    }

    private void appbarRight(){
        if(token.equals("")){
            rivUser.setVisibility(View.INVISIBLE);
        } else {
            String loginDtoJson = pref.getString("user","");
            Gson gson = new Gson();
            loginDto = gson.fromJson(loginDtoJson, LoginDto.class);
            userId = loginDto.getId();

            rivUser.setVisibility(View.VISIBLE);
            Call<CMRespDto> call = nomadApi.getProfile("Bearer " + token, userId);
            call.enqueue(new Callback<CMRespDto>() {
                @Override
                public void onResponse(Call<CMRespDto> call, Response<CMRespDto> response) {
                    Log.d(TAG, "onResponse: " + response.body());
                    if (response.body()!=null){
                        Log.d(TAG, "onResponse: " + response.body().getData());
                        Map<String, Object> data = (Map<String, Object>) response.body().getData();
                        Log.d(TAG, "onResponse: data : " + data);

                        Glide
                                .with(mContext)
                                .load(data.get("imageUrl").toString())
                                .centerCrop()
                                .placeholder(R.drawable.ic_user)
                                .into(rivUser);

                        rivUserClick();

                    } else {
                        SharedPreferences.Editor editor = pref.edit();
                        editor.putString("token", "");
                        editor.commit();
                        Intent intent = new Intent(mContext, LoginActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        startActivity(intent);
                    }

                }

                @Override
                public void onFailure(Call<CMRespDto> call, Throwable t) {
                    Log.d(TAG, "onFailure: ");
                }
            });

        }
    }

    private void rivUserClick(){
        rivUser.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                PopupMenu p = new PopupMenu(
                        getApplicationContext(),//화면제어권자
                        v);             //팝업을 띄울 기준이될 위젯
                getMenuInflater().inflate(R.menu.user_menu, p.getMenu());
                //이벤트 처리
                p.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                    @Override
                    public boolean onMenuItemClick(MenuItem item) {
                        if (item.getTitle().equals("Dashboard")) {
                            Toast.makeText(getApplicationContext(), item.getTitle(), Toast.LENGTH_SHORT).show();
                            Intent intent = new Intent(v.getContext(), UserDashboardActivity.class);
                            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                            v.getContext().startActivity(intent);

                        } else {
                            Toast.makeText(getApplicationContext(), item.getTitle(), Toast.LENGTH_SHORT).show();
                            SharedPreferences.Editor editor = pref.edit();
                            editor.putString("token", "");
                            editor.commit();
                            Intent intent = new Intent(v.getContext(), MainActivity.class);
                            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                            v.getContext().startActivity(intent);

                        }
                        return false;
                    }
                });
                p.show();
            }
        });
        //roundedImageView End

        //navigationView
    }
}