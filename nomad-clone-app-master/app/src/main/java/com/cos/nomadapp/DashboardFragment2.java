package com.cos.nomadapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.AppCompatButton;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.adapter.MyCoursesAdapter;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.courses.Course;
import com.cos.nomadapp.model.pay.Pay;
import com.cos.nomadapp.model.user.LoginDto;
import com.cos.nomadapp.model.user.User;
import com.cos.nomadapp.service.NomadApi;
import com.cos.nomadapp.ui.courses.CoursesActivity;
import com.cos.nomadapp.utils.JwtUtils;
import com.google.gson.Gson;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.SneakyThrows;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.content.Context.MODE_PRIVATE;

public class DashboardFragment2 extends Fragment {

    private static final String TAG = "DashboardFragment2";
    private SharedPreferences pref;
    private Context mContext;
    private String token;
    private LoginDto loginDto;
    private long userId;
    private AppCompatButton btnFindOne;
    private RelativeLayout layoutNoList;

    private RecyclerView rvMyCourses;

    @SneakyThrows
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate( R.layout.dashboard_frag_2, container, false );
        mContext = getContext();


        LinearLayoutManager manager = new LinearLayoutManager(mContext, RecyclerView.VERTICAL, false);
        rvMyCourses = view.findViewById(R.id.rv_my_courses);
        rvMyCourses.setLayoutManager(manager);


        btnFindOne = view.findViewById(R.id.btn_find_one);
        btnFindOne.setOnClickListener(v -> {
            Intent intent = new Intent(getContext(), CoursesActivity.class);
            startActivity(intent);
            getActivity().finish();
        });

        layoutNoList = view.findViewById(R.id.layout_no_list);


        return view;
    }

    @Override
    public void onResume() {
        super.onResume();
        pref = mContext.getSharedPreferences("pref", MODE_PRIVATE);
        token = pref.getString("token", "");
        String user = pref.getString("user","");
        Gson gson = new Gson();
        loginDto = gson.fromJson(user,LoginDto.class);
        userId = loginDto.getId();

        if (token!=""){
            NomadApi nomadApi = NomadApi.retrofit.create(NomadApi.class);
            Call<CMRespDto<List<Pay>>> call = nomadApi.myPayList("Bearer " + token, userId);
            call.enqueue(new Callback<CMRespDto<List<Pay>>>() {
                @Override
                public void onResponse(Call<CMRespDto<List<Pay>>> call, Response<CMRespDto<List<Pay>>> response) {
                    Log.d(TAG, "onResponse: 결제내역 " + response.body());
                    if (response.body()!=null){
                        if (response.body().getData().toString()!="[]"){
                            layoutNoList.setVisibility(View.GONE);
                            List<Pay> payList = response.body().getData();
                            List<Course> courses = new ArrayList<>();
                            List<String> payStatus = new ArrayList<>();
                            for(int i = 0; i<payList.size() ; i++){
                                courses.add(payList.get(i).getCourse());
                                payStatus.add(payList.get(i).getStatus());
                            }
                            rvMyCourses.setAdapter(new MyCoursesAdapter(courses,payStatus,mContext));
                        } else {
                            layoutNoList.setVisibility(View.VISIBLE);
                        }
                    } else {
                        Intent intent = new Intent(mContext, LoginActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        startActivity(intent);
                    }

                }

                @Override
                public void onFailure(Call<CMRespDto<List<Pay>>> call, Throwable t) {
                    Log.d(TAG, "onFailure: ");
                }
            });
        }
    }
}
