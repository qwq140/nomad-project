package com.cos.nomadapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;
import androidx.fragment.app.Fragment;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageButton;

import com.cos.nomadapp.model.video.VideoContent;

public class VideoActivity extends AppCompatActivity {

    private AppCompatButton btnShow;
    private ImageButton btnBack;
    public boolean isShow = false;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video);

        Intent intent = getIntent();
        VideoContent videoContent = (VideoContent) intent.getSerializableExtra("videoContent");
        long videoId = intent.getLongExtra("videoId",0);
        String status = intent.getStringExtra("status");

        getSupportFragmentManager().beginTransaction().replace(R.id.video_container, new VideoDetailFragment(videoId,videoContent)).commit();
        btnShow = findViewById(R.id.btn_show);
        btnShow.setOnClickListener(v -> {
            isShow = !isShow;
            Fragment selectedFragment = null;
            if (isShow == true){
//                btnShow.setCompoundDrawablesWithIntrinsicBounds(R.drawable.ic_cancel,0,0,0);
//                btnShow.setText("   Hide Sidebar");
                selectedFragment = new VideoListFragment(videoId,status);
            } else {
//                btnShow.setCompoundDrawablesWithIntrinsicBounds(R.drawable.ic_baseline_info_24,0,0,0);
//                btnShow.setText("   Show Sidebar");
                selectedFragment = new VideoDetailFragment(videoId,videoContent);
            }
            getSupportFragmentManager().beginTransaction().replace(R.id.video_container, selectedFragment).commit();
        });

        btnBack = findViewById(R.id.btn_video_back);
        btnBack.setOnClickListener(v -> {
            finish();
        });

    }


}