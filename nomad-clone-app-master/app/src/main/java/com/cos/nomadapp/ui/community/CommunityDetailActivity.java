package com.cos.nomadapp.ui.community;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.cos.nomadapp.R;
import com.cos.nomadapp.adapter.CommunityDetailAdapter;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.common.Item;
import com.cos.nomadapp.model.community.CReply;
import com.cos.nomadapp.model.community.CReplySaveReqDto;

import com.cos.nomadapp.model.community.CommunityItemRespDto;
import com.cos.nomadapp.model.community.CommunityListRespDto;
import com.cos.nomadapp.service.NomadApi;
import com.zoyi.channel.plugin.android.ChannelIO;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommunityDetailActivity extends AppCompatActivity {
    private static final String TAG = "CommunityDetailActivity";
    private Context mContext = CommunityDetailActivity.this;
    private ImageView ivBack, ivSendReply;
    private TextView tvToolbarTitle;
    private RecyclerView rvCommunityDetail;
    private EditText etReply;
    private List<CReply> replies;
    private RelativeLayout replyBar;
    private EditText et_reply;
    private CommunityDetailAdapter communityDetailAdapter;
    private CommunityItemRespDto communityItem;
    private NomadApi nomadApi;
    private List<Item> items;
    private String token;
    private LinearLayoutManager manager;
    private CommunityListRespDto community;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_community_detail);
        Intent intent = getIntent();
        community = (CommunityListRespDto) intent.getSerializableExtra("community");

        //??????
        token = getSharedPreferences("pref", MODE_PRIVATE).getString("token", "");

        //?????? ??????
        replyBar = (RelativeLayout) findViewById(R.id.reply_bar);
        replyBar.setVisibility(View.INVISIBLE);
        ivSendReply = findViewById(R.id.iv_reply_send);
        et_reply = findViewById(R.id.et_reply);
        //??????
        ivBack = findViewById(R.id.iv_back);
        ivBack.setOnClickListener(v -> {
            finish();
        });

        tvToolbarTitle = findViewById(R.id.tv_toolbar_title);
        tvToolbarTitle.setText("Community");

        manager = new LinearLayoutManager(this, RecyclerView.VERTICAL, false);
        rvCommunityDetail = findViewById(R.id.rv_community_detail);
        //?????????????????? ?????????
        items = new ArrayList<>();
        //??????????????? ?????? ????????????
        replies = new ArrayList<>();

        nomadApi = NomadApi.retrofit.create(NomadApi.class);

        //????????? ?????? ????????????
        addCommunityItem();

        //?????? ??????
        ivSendReply.setOnClickListener(v -> {
            //long principalId = pref.getLong("principalId",0);
            Log.d(TAG, "token :" + token);

            CReplySaveReqDto cReplySaveReqDto = new CReplySaveReqDto();
            //????????????
            cReplySaveReqDto.setContent(et_reply.getText().toString());
            //???????????? ?????????
            cReplySaveReqDto.setComId(community.getId().longValue());
            //cReplySaveReqDto.setUserId(principalId);

            Call<CMRespDto<CReply>> call3 = nomadApi.cReplySave("Bearer " + token, cReplySaveReqDto);
            call3.enqueue(new Callback<CMRespDto<CReply>>() {
                @Override
                public void onResponse(Call<CMRespDto<CReply>> call, Response<CMRespDto<CReply>> response) {
                    items.add(new Item(1, response.body().getData()));
                    Log.d(TAG, "onResponse: 3 item : " + items);

                    shutdownReplyInput();       //?????? ?????? ???????????? ????????? ??????
                    //test();
                }

                @Override
                public void onFailure(Call<CMRespDto<CReply>> call, Throwable t) {
                    Log.d(TAG, "onFailure: ?????? ?????? ??????");
                }
            });
            refresh();
        });

    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    public void showReplyInput() {           //?????? ????????? ??????
        ChannelIO.hideChannelButton();
        RelativeLayout replyBar = (RelativeLayout) findViewById(R.id.reply_bar);
        replyBar.setVisibility(View.VISIBLE);

        InputMethodManager imm = (InputMethodManager) getSystemService(INPUT_METHOD_SERVICE);
        etReply = (EditText) findViewById(R.id.et_reply);
        etReply.requestFocus();
        imm.showSoftInput(etReply, InputMethodManager.SHOW_IMPLICIT);
    }

    public void shutdownReplyInput() {           //?????? ????????? ??????
        ChannelIO.showChannelButton();
        RelativeLayout replyBar = (RelativeLayout) findViewById(R.id.reply_bar);
        replyBar.setVisibility(View.INVISIBLE);

        InputMethodManager imm = (InputMethodManager) getSystemService(INPUT_METHOD_SERVICE);
        etReply = (EditText) findViewById(R.id.et_reply);
        etReply.requestFocus();
        View view = this.getCurrentFocus();
        imm.hideSoftInputFromWindow(view.getWindowToken(), InputMethodManager.HIDE_IMPLICIT_ONLY);
    }

    private void addCommunityItem(){
        Call<CMRespDto<CommunityItemRespDto>> call = nomadApi.comFindById("Bearer " + token, community.getId().longValue());
        call.enqueue(new Callback<CMRespDto<CommunityItemRespDto>>() {
            @Override
            public void onResponse(Call<CMRespDto<CommunityItemRespDto>> call, Response<CMRespDto<CommunityItemRespDto>> response) {
                communityItem = response.body().getData();
                items.add(new Item(0, communityItem));
                for (int i = 0; i < communityItem.getCommunity().getReplys().size(); i++) {
                    items.add(new Item(1, communityItem.getCommunity().getReplys().get(i)));
                }
                rvCommunityDetail.setLayoutManager(manager);
                communityDetailAdapter = new CommunityDetailAdapter(items, (CommunityDetailActivity)mContext, token);
                rvCommunityDetail.setAdapter(communityDetailAdapter);
                communityDetailAdapter.notifyDataSetChanged();
            }

            @Override
            public void onFailure(Call<CMRespDto<CommunityItemRespDto>> call, Throwable t) {
                Log.d(TAG, "onFailure: ??????");
            }
        });
    }
    public void refresh(){     //????????????
        Intent intent = getIntent();
        finish();
        startActivity(intent);
    }


}