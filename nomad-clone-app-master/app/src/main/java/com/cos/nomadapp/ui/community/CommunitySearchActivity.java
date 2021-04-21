package com.cos.nomadapp.ui.community;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import com.cos.nomadapp.R;
import com.cos.nomadapp.adapter.CommunityAdapter;
import com.cos.nomadapp.model.community.Community;
import com.cos.nomadapp.model.community.CommunityListRespDto;
import com.google.android.material.textfield.TextInputEditText;

import java.util.ArrayList;
import java.util.List;

public class CommunitySearchActivity extends AppCompatActivity {

    private ImageView ivBack;
    private TextView tvToolbarTitle;
    private TextInputEditText etSearch;
    private RecyclerView rvSearchList;
    private CommunityAdapter communityAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_community_search);

        ivBack = findViewById(R.id.iv_back);

        tvToolbarTitle = findViewById(R.id.tv_toolbar_title);
        tvToolbarTitle.setText("검색");

        ivBack.setOnClickListener(v -> {
            finish();
        });

        rvSearchList = findViewById(R.id.rv_search_list);
        LinearLayoutManager manager = new LinearLayoutManager(this, RecyclerView.VERTICAL, false);
        List<CommunityListRespDto> communities = new ArrayList<>();

        rvSearchList.setLayoutManager(manager);
        communityAdapter = new CommunityAdapter(communities,this,null);
        rvSearchList.setAdapter(communityAdapter);

    }

}