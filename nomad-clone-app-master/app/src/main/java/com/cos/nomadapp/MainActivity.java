package com.cos.nomadapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.widget.Button;

import android.view.MenuItem;
import android.view.View;

import android.widget.ImageView;
import android.widget.PopupMenu;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.adapter.MainAdapter;
import com.cos.nomadapp.model.CMRespDto;

import com.cos.nomadapp.model.courses.CoursesPreview;
import com.cos.nomadapp.model.pay.Pay;
import com.cos.nomadapp.model.user.LoginDto;
import com.cos.nomadapp.model.user.User;
import com.cos.nomadapp.service.NomadApi;
import com.google.android.material.navigation.NavigationView;
import com.google.firebase.auth.FirebaseAuth;

import com.google.gson.Gson;
import com.makeramen.roundedimageview.RoundedImageView;
import com.zoyi.channel.plugin.android.ChannelIO;
import com.zoyi.channel.plugin.android.open.config.BootConfig;


import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    private Context mContext = MainActivity.this;

    private Toolbar toolbarNomad;
    private ImageView ivMenu;
    private DrawerLayout drawer;
    private NavigationView nv;
    private RecyclerView rvMainList;

    private Button btnLogout;
    private FirebaseAuth mAuth;

    private SharedPreferences pref;
    private String token;

    private LoginDto loginDto;
    private long userId;

    private RoundedImageView rivUser;
    private NomadApi nomadApi;
    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //채팅봇
        BootConfig bootConfig = BootConfig.create("2f146489-45bb-46cc-a6d6-74aa3b8b77be");
        ChannelIO.boot(bootConfig);
        ChannelIO.showChannelButton();

        nomadApi = NomadApi.retrofit.create(NomadApi.class);

        toolbarNomad = findViewById(R.id.toolbar_nomad);
        setSupportActionBar(toolbarNomad);

        ivMenu = findViewById(R.id.iv_back);
        drawer = findViewById(R.id.drawer);
        rivUser = (RoundedImageView) findViewById(R.id.riv_user);

        ivMenu.setOnClickListener(v -> {
            drawer.openDrawer(Gravity.LEFT);
        });

        LayoutInflater mInflater = (LayoutInflater) getSystemService(LAYOUT_INFLATER_SERVICE);
        mInflater.inflate(R.layout.navigation, drawer, true);
        nv = findViewById(R.id.nv);


        NavigationViewHelper.enable(MainActivity.this, nv);


        //roundedImageView 이벤트



    }

    @Override
    protected void onResume() {
        super.onResume();
        ChannelIO.showChannelButton();
        pref = getSharedPreferences("pref", MODE_PRIVATE);
        token = pref.getString("token", "");
        Log.d(TAG, "onResume: " + token);

        if (token.equals("")) {
            nv.getMenu().findItem(R.id.login).setVisible(true);
            nv.getMenu().findItem(R.id.dashboard).setVisible(false);
        } else {
            nv.getMenu().findItem(R.id.login).setVisible(false);
            nv.getMenu().findItem(R.id.dashboard).setVisible(true);
        }

        appbarRight();

        //mAuth = FirebaseAuth.getInstance();

        LinearLayoutManager manager = new LinearLayoutManager(this, RecyclerView.VERTICAL, false);

        rvMainList = findViewById(R.id.rv_main_list);
        rvMainList.setLayoutManager(manager);


        Call<CMRespDto<List<CoursesPreview>>> call = nomadApi.getHomeCourses();
        call.enqueue(new Callback<CMRespDto<List<CoursesPreview>>>() {
            @Override
            public void onResponse(Call<CMRespDto<List<CoursesPreview>>> call, Response<CMRespDto<List<CoursesPreview>>> response) {
                Log.d(TAG, "onResponse: " + response.body());
                List<CoursesPreview> coursesPreviews = response.body().getData();
                //Log.d(TAG, "onResponse: "+coursesPreviews.get(0).getId());
                rvMainList.setAdapter(new MainAdapter(getApplicationContext(), coursesPreviews, token));
            }

            @Override
            public void onFailure(Call<CMRespDto<List<CoursesPreview>>> call, Throwable t) {
                Log.d(TAG, "onFailure: ");
            }
        });

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

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        return super.onOptionsItemSelected(item);
    }


}