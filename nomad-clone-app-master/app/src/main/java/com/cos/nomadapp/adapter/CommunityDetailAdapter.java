package com.cos.nomadapp.adapter;

import android.content.Intent;
import android.content.SharedPreferences;
import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.widget.AppCompatButton;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.LoginActivity;
import com.cos.nomadapp.UserDashboardActivity;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.community.CReply;
import com.cos.nomadapp.model.community.CommunityItemRespDto;
import com.cos.nomadapp.model.community.CommunityListRespDto;
import com.cos.nomadapp.model.likes.LikeClickRespDto;
import com.cos.nomadapp.model.likes.Likes;
import com.cos.nomadapp.model.user.User;
import com.cos.nomadapp.service.NomadApi;
import com.cos.nomadapp.ui.community.CommunityDetailActivity;
import com.cos.nomadapp.R;
import com.cos.nomadapp.model.common.Item;
import com.cos.nomadapp.model.community.Community;
import com.cos.nomadapp.utils.JwtUtils;
import com.google.gson.JsonObject;
import com.makeramen.roundedimageview.RoundedImageView;

import org.json.JSONObject;

import java.util.List;
import java.util.Map;

import lombok.SneakyThrows;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommunityDetailAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<Item> items;
    private CommunityDetailActivity communityDetailActivity;
    private String token;
    private long id;
    private static final String TAG = "CommunityDetailAdapter:";
    private NomadApi nomadApi;

    public CommunityDetailAdapter(List<Item> items, CommunityDetailActivity communityDetailActivity, String token) {
        this.items = items;
        this.communityDetailActivity = communityDetailActivity;
        this.token = token;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (viewType == 0) {
            return new DetailContentViewHolder(
                    LayoutInflater.from(parent.getContext()).inflate(
                            R.layout.community_detail_content,
                            parent,
                            false
                    )
            );
        } else {
            return new ReplyViewHolder(
                    LayoutInflater.from(parent.getContext()).inflate(
                            R.layout.community_detail_reply,
                            parent,
                            false
                    )
            );
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        Log.d(TAG, "onBindViewHolder: " + position);
        if (getItemViewType(position) == 0) {
            CommunityItemRespDto community = (CommunityItemRespDto) items.get(position).getObject();
            ((DetailContentViewHolder) holder).setItem(community);
        } else if (getItemViewType(position) == 1) {
            CReply creply = (CReply) items.get(position).getObject();
            ((ReplyViewHolder) holder).setItem(creply);
        }
    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    @Override
    public int getItemViewType(int position) {
        return items.get(position).getType();
    }

    public class DetailContentViewHolder extends RecyclerView.ViewHolder {

        private AppCompatButton btnCommunityLike, btnReply, btnsendReply;
        private TextView tvDetailTitle, tvDetailUsername, tvDetailTime, tvReplyCount, tvDetailCategory;
        private WebView wvDetailContent;
        private WebSettings webSettings;

        public DetailContentViewHolder(@NonNull View itemView) {
            super(itemView);
            tvDetailTitle = itemView.findViewById(R.id.tv_detail_title);
            wvDetailContent = (WebView) itemView.findViewById(R.id.tv_detail_content);
            webSettings=wvDetailContent.getSettings();
            webSettings.setJavaScriptEnabled(true);
            webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
            webSettings.setAllowFileAccess(true);
            webSettings.setAllowFileAccessFromFileURLs(true);
            webSettings.setAllowUniversalAccessFromFileURLs(true);
            tvDetailUsername = itemView.findViewById(R.id.tv_detail_username);
            tvDetailCategory = itemView.findViewById(R.id.tv_detail_category);
            tvDetailTime = itemView.findViewById(R.id.tv_detail_time);
            tvReplyCount = itemView.findViewById(R.id.tv_reply_count);
            btnCommunityLike = itemView.findViewById(R.id.btn_community_like);
            btnReply = itemView.findViewById(R.id.btn_reply);
            btnReply.setOnClickListener(v -> {
                communityDetailActivity.showReplyInput();
            });
            btnsendReply = itemView.findViewById(R.id.iv_reply_send);
        }

        public void setItem(CommunityItemRespDto community) {
            tvDetailTitle.setText(community.getCommunity().getTitle());
            wvDetailContent.loadData(community.getCommunity().getContent(),"text/html; charset=UTF-8",null);
            tvDetailUsername.setText(community.getCommunity().getUser().getName());
            tvDetailCategory.setText(community.getCommunity().getCategory().getTitle());
            tvDetailTime.setText(community.getCommunity().getCreateDate().toString());
            tvReplyCount.setText(community.getCommunity().getReplys().size() + "");

            //좋아요
            btnCommunityLike.setOnClickListener(v -> {
                nomadApi = NomadApi.retrofit.create(NomadApi.class);
                Call<CMRespDto<LikeClickRespDto>> call = nomadApi.likeUp("Bearer " + token, community.getId().longValue());
                call.enqueue(new Callback<CMRespDto<LikeClickRespDto>>() {
                    @Override
                    public void onResponse(Call<CMRespDto<LikeClickRespDto>> call, Response<CMRespDto<LikeClickRespDto>> response) {
                        communityDetailActivity.refresh();
                    }

                    @Override
                    public void onFailure(Call<CMRespDto<LikeClickRespDto>> call, Throwable t) {
                        Log.d(TAG, "onFailure: 실패");
                    }
                });
            });
            btnCommunityLike.setText(community.getLikeCount() + "");
        }
    }

    public class ReplyViewHolder extends RecyclerView.ViewHolder {

        private TextView tvReplyContent, tvReplyUsername, tvReplyTime, tvReplyCount;
        private RoundedImageView ivReplyUser;
        private ImageButton btnReplyDelete;

        public ReplyViewHolder(@NonNull View itemView) {
            super(itemView);
            tvReplyUsername = itemView.findViewById(R.id.tv_reply_username);
            tvReplyContent = itemView.findViewById(R.id.tv_reply_content);
            tvReplyTime = itemView.findViewById(R.id.tv_reply_time);
            btnReplyDelete = itemView.findViewById(R.id.btn_reply_delete);
            ivReplyUser = itemView.findViewById(R.id.iv_reply_user);
        }

        @SneakyThrows
        public void setItem(CReply cReply) {
            tvReplyUsername.setText(cReply.getUser().getName());
            tvReplyContent.setText(cReply.getContent());
            tvReplyTime.setText(cReply.getCreateDate().toString());
            //프로필 이미지 받아오기

            //댓글삭제하기 + 권한 처리
            if (token != "") {
                String payload = JwtUtils.payloadDecoded(token);
                JSONObject payloadObj = new JSONObject(payload);
                id = payloadObj.getLong("id");
            }
            //프로필 이미지 얻어오기
            nomadApi = NomadApi.retrofit.create(NomadApi.class);
            Call<CMRespDto> call = nomadApi.getProfile("Bearer " + token, cReply.getUser().getId());
            call.enqueue(new Callback<CMRespDto>() {
                @Override
                public void onResponse(Call<CMRespDto> call, Response<CMRespDto> response) {
                    Log.d(TAG, "onResponse: " + response.body());
                    if (response.body()!=null){
                        Log.d(TAG, "onResponse: " + response.body().getData());
                        Map<String, Object> data = (Map<String, Object>) response.body().getData();
                        Log.d(TAG, "onResponse: data : " + data);

                        User user = User.builder()
                                .imageUrl(data.get("imageUrl").toString())
                                .build();

                        Glide
                                .with(communityDetailActivity)
                                .load(user.getImageUrl())
                                .centerCrop()
                                .placeholder(R.drawable.ic_user)
                                .into(ivReplyUser);
                    } else {
                        Log.d(TAG, "onResponse: 실패");
                    }
                }

                @Override
                public void onFailure(Call<CMRespDto> call, Throwable t) {
                    Log.d(TAG, "onFailure: ");
                }
            });

            btnReplyDelete.setOnClickListener(v -> {
                nomadApi = NomadApi.retrofit.create(NomadApi.class);
                if (id == cReply.getUser().getId()) {
                    Log.d(TAG, "setItem: " + id + "getId" + cReply.getUser().getId());
                    Call<CMRespDto> call2 = nomadApi.cReplyDelete("Bearer " + token, cReply.getId());
                    call2.enqueue(new Callback<CMRespDto>() {
                        @Override
                        public void onResponse(Call<CMRespDto> call, Response<CMRespDto> response) {
                            communityDetailActivity.refresh();
                        }

                        @Override
                        public void onFailure(Call<CMRespDto> call, Throwable t) {
                            Log.d(TAG, "onFailure: 댓글 삭제 실패");
                        }
                    });
                }
            });

        }
    }
}