package com.cos.nomadapp;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

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

import com.cos.nomadapp.model.user.LoginDto;
import com.google.gson.Gson;
import com.makeramen.roundedimageview.RoundedImageView;

import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.user.User;
import com.cos.nomadapp.service.OAuthApi;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;


import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private ImageView ivBack;
    private TextView tvToolbarTitle;

    private SignInButton btnGoogleLogin;
    private final int RC_SIGN_IN = 123;
    private FirebaseAuth mAuth;
    private GoogleSignInClient mGoogleSignInClient;
    private static final String TAG = "LoginActivity";

    private SharedPreferences pref;
    private SharedPreferences.Editor editor;


    private RoundedImageView rivUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        ivBack = findViewById(R.id.iv_back);

        tvToolbarTitle = findViewById(R.id.tv_toolbar_title);
        tvToolbarTitle.setText("Login");

        ivBack.setOnClickListener(v -> {
            finish();
        });


        //mAuth = FirebaseAuth.getInstance();

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();

        mGoogleSignInClient = GoogleSignIn.getClient(this, gso);

        SignInButton signInButton = findViewById(R.id.sign_in_button);
        signInButton.setOnClickListener((view)->{
            onClick(view);
        });

    }

    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.sign_in_button:
                signIn();
                break;
            // ...
        }
    }

    private void signIn() {
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);


            OAuthApi oauthApi = OAuthApi.retrofit.create(OAuthApi.class);
            Call<CMRespDto<LoginDto>> call = oauthApi.postOauth(account.getIdToken());
            call.enqueue(new Callback<CMRespDto<LoginDto>>() {
                @Override
                public void onResponse(Call<CMRespDto<LoginDto>> call, Response<CMRespDto<LoginDto>> response) {
                    Log.d(TAG, "onResponse: 응답 : "+response.body());
                    if (response.body().getStatusCode()==200){
                        Log.d(TAG, "onResponse: 200 성공");
                        LoginDto loginDto = response.body().getData();
                        Gson gson = new Gson();
                        String basicUserInfo = gson.toJson(loginDto);

                        Log.d(TAG, "onResponse: data : 구글로그인 " + loginDto);
                        pref = getSharedPreferences("pref", MODE_PRIVATE);
                        editor = pref.edit();
                        editor.putString("token",loginDto.getToken());
                        editor.putString("user",basicUserInfo);
                        editor.commit();

                        finish();

                    } else {
                        Log.d(TAG, "onResponse: 로그인 실패");
                    }

                }

                @Override
                public void onFailure(Call<CMRespDto<LoginDto>> call, Throwable t) {
                    Log.d(TAG, "onFailure: onFailure");
                }
            });
        } catch (ApiException e) {
            Log.w(TAG, "signInResult:failed code=" + e.getStatusCode());}

        //roundedImageView 이벤트
        rivUser = (RoundedImageView) findViewById(R.id.riv_user);
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
                        }
                        return false;
                    }
                });
                p.show();
            }
        });
        //roundedImageView End

    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);

        }

    }

}