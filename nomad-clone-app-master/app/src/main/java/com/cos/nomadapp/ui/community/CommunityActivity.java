package com.cos.nomadapp.ui.community;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

import com.cos.nomadapp.R;
import com.cos.nomadapp.adapter.CommunityPagerAdapter;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.community.Category;
import com.cos.nomadapp.service.NomadApi;
import com.google.android.material.tabs.TabLayout;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommunityActivity extends AppCompatActivity {

    private static final String TAG = "CommunityActivity";

    private ImageView ivBack, ivWrite, ivSearch;
    private TextView tvToolbarTitle;
    private ViewPager vpContainer;
    private TabLayout tabs;
    private CommunityPagerAdapter communityPagerAdapter;
    private List<Category> comCategoryList;
    private String token;
    private SharedPreferences pref;
    private NomadApi nomadApi;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_community);
    }

    @Override
    protected void onResume() {
        super.onResume();
        ivBack = findViewById(R.id.iv_back);

        tvToolbarTitle = findViewById(R.id.tv_toolbar_title);
        tvToolbarTitle.setText("Community");

        ivBack.setOnClickListener(v -> {
            finish();
        });

        ivWrite = findViewById(R.id.iv_write);

        ivWrite.setOnClickListener(v -> {
            Intent intent = new Intent(this, CommunityWriteActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            startActivity(intent);
        });

        ivSearch = findViewById(R.id.iv_search);

        ivSearch.setOnClickListener(v -> {
            Intent intent = new Intent(this, CommunitySearchActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            startActivity(intent);
        });

        ivWrite = findViewById(R.id.iv_write);

        ivWrite.setOnClickListener(v -> {
            Intent intent = new Intent(this, CommunityWriteActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            startActivity(intent);
        });

        ivSearch = findViewById(R.id.iv_search);

        ivSearch.setOnClickListener(v -> {
            Intent intent = new Intent(this, CommunitySearchActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            startActivity(intent);
        });
        pref = getSharedPreferences("pref", MODE_PRIVATE);
        token = pref.getString("token","");

        //전체 카테고리 불러오기
        //ViewPager
        vpContainer = findViewById(R.id.vp_container);
        tabs = findViewById(R.id.tabs);
        communityPagerAdapter = new CommunityPagerAdapter(getSupportFragmentManager(), 1);
        comCategoryList = new ArrayList<>();

        nomadApi = NomadApi.retrofit.create(NomadApi.class);
        Call<CMRespDto<List<Category>>> call = nomadApi.comCategoryFindAll();
        call.enqueue(new Callback<CMRespDto<List<Category>>>() {

            @Override
            public void onResponse(Call<CMRespDto<List<Category>>> call, Response<CMRespDto<List<Category>>> response) {
                comCategoryList = (List<Category>) response.body().getData();
                communityPagerAdapter.addFragment(new CommunityFragAll("new",token,0L));
                for(int i=0;i<comCategoryList.size();i++){
                    communityPagerAdapter.addFragment(new CommunityFragAll("new",token,comCategoryList.get(i).getId()));    //카테고리의 id
                }
                vpContainer.setAdapter(communityPagerAdapter);
                tabs.setupWithViewPager(vpContainer);
                tabs.getTabAt(0).setText("# ALL");
                for(int i=0;i<comCategoryList.size();i++){
                    tabs.getTabAt(i+1).setText(comCategoryList.get(i).getTitle());
                }
            }
            @Override
            public void onFailure(Call<CMRespDto<List<Category>>> call, Throwable t) {
                Log.d(TAG, "onFailure: "+t.getMessage());
            }
        });
        communityPagerAdapter.notifyDataSetChanged();
    }
}