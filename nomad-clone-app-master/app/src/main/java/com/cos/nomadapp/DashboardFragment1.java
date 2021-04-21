package com.cos.nomadapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.AppCompatButton;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.adapter.TechDashAdapter;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.tech.Tech;
import com.cos.nomadapp.model.user.LoginDto;
import com.cos.nomadapp.model.user.User;
import com.cos.nomadapp.service.NomadApi;
import com.cos.nomadapp.utils.JwtUtils;
import com.google.gson.Gson;
import com.makeramen.roundedimageview.RoundedImageView;

import org.json.JSONObject;

import java.util.List;
import java.util.Map;

import lombok.SneakyThrows;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.content.Context.MODE_PRIVATE;

public class DashboardFragment1 extends Fragment {

    private static final String TAG = "DashboardFragment1";

    private Context mContext;

    private SharedPreferences pref;
    private String token;
    private long userId;
    private User user;
    private LoginDto loginDto;

    private TextView tvDashName, tvDashUsername;
    private RoundedImageView rivDashboardUser, rivUser;

    private AppCompatButton btnEditProfile;
    private RecyclerView rvDashTech;

    public DashboardFragment1(RoundedImageView rivUser) {
        this.rivUser = rivUser;
    }

    @SneakyThrows
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate( R.layout.dashboard_frag_1, container, false );
        mContext = getContext();


        rivDashboardUser = view.findViewById(R.id.riv_dashboard_user);
        tvDashName = view.findViewById(R.id.tv_dash_name);
        tvDashUsername = view.findViewById(R.id.tv_dash_username);
        rvDashTech = view.findViewById(R.id.rv_dash_tech);
        btnEditProfile = view.findViewById(R.id.btn_edit_profile);


        return view;
    }

    @SneakyThrows
    @Override
    public void onResume() {
        super.onResume();
        pref = mContext.getSharedPreferences("pref", MODE_PRIVATE);
        token = pref.getString("token", "");
        String loginDtoJson = pref.getString("user","");
        Gson gson = new Gson();
        loginDto = gson.fromJson(loginDtoJson, LoginDto.class);
        userId = loginDto.getId();

        if (token!=""){

            // 개인 정보 얻기
            NomadApi nomadApi = NomadApi.retrofit.create(NomadApi.class);
            Call<CMRespDto> call = nomadApi.getProfile("Bearer " + token, userId);
            call.enqueue(new Callback<CMRespDto>() {
                @Override
                public void onResponse(Call<CMRespDto> call, Response<CMRespDto> response) {
                    Log.d(TAG, "onResponse: " + response.body());
                    if (response.body()!=null){
                        Log.d(TAG, "onResponse: " + response.body().getData());
                        Map<String, Object> data = (Map<String, Object>) response.body().getData();
                        Log.d(TAG, "onResponse: data : " + data);

                        user = User.builder()
                                .username(data.get("username").toString())
                                .email(data.get("email").toString())
                                .name(data.get("name").toString())
                                .provider(data.get("provider").toString())
                                .roles(data.get("roles").toString())
                                .imageUrl(data.get("imageUrl").toString())
                                .build();

                        tvDashName.setText(user.getName());
                        tvDashUsername.setText(user.getUsername());

                        Glide
                                .with(mContext)
                                .load(user.getImageUrl())
                                .centerCrop()
                                .placeholder(R.drawable.ic_user)
                                .into(rivDashboardUser);

                        rivUser.setVisibility(View.VISIBLE);

                        Glide
                                .with(mContext)
                                .load(user.getImageUrl())
                                .centerCrop()
                                .placeholder(R.drawable.ic_user)
                                .into(rivUser);

                    } else {
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

            Call<CMRespDto<List<Tech>>> call2 = nomadApi.getTechList();
            call2.enqueue(new Callback<CMRespDto<List<Tech>>>() {
                @Override
                public void onResponse(Call<CMRespDto<List<Tech>>> call, Response<CMRespDto<List<Tech>>> response) {
                    Log.d(TAG, "onResponse: 테크"+response.body());
                    List<Tech> teches = response.body().getData();
                    LinearLayoutManager manager = new LinearLayoutManager(mContext, RecyclerView.HORIZONTAL, false);
                    rvDashTech.setLayoutManager(manager);
                    rvDashTech.setAdapter(new TechDashAdapter(teches, mContext));


                }

                @Override
                public void onFailure(Call<CMRespDto<List<Tech>>> call, Throwable t) {
                    Log.d(TAG, "onFailure: 실패");
                }
            });
        } else {
            Intent intent = new Intent(mContext, LoginActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            startActivity(intent);
        }



        btnEditProfile.setOnClickListener(v -> {
            Intent intent = new Intent(v.getContext(), EditProfileActivity.class);
            intent.putExtra("principal",user);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
    }
}
