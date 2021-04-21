package com.cos.nomadapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager.widget.ViewPager;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.adapter.DashboardFragmentAdapter;
import com.cos.nomadapp.adapter.TechDashAdapter;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.common.Item;
import com.cos.nomadapp.model.tech.Tech;
import com.cos.nomadapp.model.user.LoginDto;
import com.cos.nomadapp.model.user.User;
import com.cos.nomadapp.model.user.UserDashboardSecondSection;
import com.cos.nomadapp.service.NomadApi;
import com.cos.nomadapp.utils.JwtUtils;
import com.google.android.material.tabs.TabLayout;
import com.google.gson.Gson;
import com.makeramen.roundedimageview.RoundedImageView;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.SneakyThrows;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserDashboardActivity extends AppCompatActivity {
    private static final String TAG = "UserDashboardActivity";

    private Context mContext = UserDashboardActivity.this;
    private ImageView ivBack;
    private TextView tvToolbarTitle, tvDashName, tvDashUsername;
    private RoundedImageView rivUser, rivDashboardUser;
    private RecyclerView rvDashTech;
    private SharedPreferences pref;
    private AppCompatButton btnEditProfile;
    private NomadApi nomadApi = NomadApi.retrofit.create(NomadApi.class);
    private User user;

    private long id;
    private String token;

    private DashboardFragmentAdapter dashboardFragmentAdapter;
    private ViewPager vpContainer;
    private TabLayout tabsDashboard;

    private LoginDto loginDto;
    private long userId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_dashboard);

        ivBack = findViewById(R.id.iv_back);
        pref = getSharedPreferences("pref",MODE_PRIVATE);

        tvToolbarTitle = findViewById(R.id.tv_toolbar_title);
        tvToolbarTitle.setText("DashBoard");

        ivBack.setOnClickListener(v -> {
            finish();
        });

        rivDashboardUser = findViewById(R.id.riv_dashboard_user);

        //roundedImageView 이벤트
        rivUser = (RoundedImageView) findViewById(R.id.riv_user);
        rivUserClick();

        // TabLayout
        vpContainer = findViewById(R.id.vp_container);
        tabsDashboard = findViewById(R.id.tabs_dashboard);

        dashboardFragmentAdapter = new DashboardFragmentAdapter(getSupportFragmentManager(),1);

        dashboardFragmentAdapter.addFragment(new DashboardFragment1(rivUser));
        dashboardFragmentAdapter.addFragment(new DashboardFragment2());
        dashboardFragmentAdapter.addFragment(new DashboardFragment3());

        vpContainer.setAdapter(dashboardFragmentAdapter);

        tabsDashboard.setupWithViewPager(vpContainer);

        tabsDashboard.getTabAt(0).setText("My Profile");
        tabsDashboard.getTabAt(1).setText("My Courses");
        tabsDashboard.getTabAt(2).setText("My Payment History");

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
                            finish();

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