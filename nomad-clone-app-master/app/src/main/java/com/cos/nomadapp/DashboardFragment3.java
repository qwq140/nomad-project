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

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.cos.nomadapp.adapter.MyCoursesAdapter;
import com.cos.nomadapp.adapter.PaymentAdapter;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.courses.Course;
import com.cos.nomadapp.model.pay.Pay;
import com.cos.nomadapp.model.user.LoginDto;
import com.cos.nomadapp.service.NomadApi;
import com.cos.nomadapp.utils.JwtUtils;
import com.google.gson.Gson;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.content.Context.MODE_PRIVATE;

public class DashboardFragment3 extends Fragment {

    private static final String TAG = "DashboardFragment3";

    private SharedPreferences pref;
    private Context mContext;
    private String token;
    private LoginDto loginDto;
    private long userId;

    private LinearLayout layoutNoList,layoutPayTable;

    private RecyclerView rvPaymentHistory;
    private NomadApi nomadApi;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate( R.layout.dashboard_frag_3, container, false );
        mContext = getContext();


        nomadApi = NomadApi.retrofit.create(NomadApi.class);

        layoutNoList = view.findViewById(R.id.layout_no_list);
        layoutPayTable =view.findViewById(R.id.layout_pay_table);

        rvPaymentHistory = view.findViewById(R.id.rv_payment_history);
        rvPaymentHistory.setLayoutManager(new LinearLayoutManager(mContext));

        return view;
    }
    @Override
    public void onResume() {
        super.onResume();
        pref = mContext.getSharedPreferences("pref", MODE_PRIVATE);
        token = pref.getString("token", "");
        String user = pref.getString("user","");
        Gson gson = new Gson();
        loginDto = gson.fromJson(user, LoginDto.class);
        userId = loginDto.getId();


        if (token!=""){
            Call<CMRespDto<List<Pay>>> call = nomadApi.myPayList("Bearer " + token, userId);
            call.enqueue(new Callback<CMRespDto<List<Pay>>>() {
                @Override
                public void onResponse(Call<CMRespDto<List<Pay>>> call, Response<CMRespDto<List<Pay>>> response) {
                    // response.body가 null이 뜨면 토큰이 만료되었으므로 다시 로그인해야함
                    if (response.body()!=null){
                        Log.d(TAG, "onResponse: 결제내역 " + response.body().getData());
                        if (response.body().getData().toString()!="[]"){
                            layoutNoList.setVisibility(View.GONE);
                            layoutPayTable.setVisibility(View.VISIBLE);
                            List<Pay> payList = response.body().getData();
                            rvPaymentHistory.setAdapter(new PaymentAdapter(mContext,payList));
                        } else {
                            layoutNoList.setVisibility(View.VISIBLE);
                            layoutPayTable.setVisibility(View.GONE);
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
