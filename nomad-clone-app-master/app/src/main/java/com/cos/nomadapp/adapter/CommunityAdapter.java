package com.cos.nomadapp.adapter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.widget.AppCompatButton;
import androidx.recyclerview.widget.RecyclerView;

import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.community.CommunityListRespDto;
import com.cos.nomadapp.model.likes.LikeClickRespDto;
import com.cos.nomadapp.service.NomadApi;
import com.cos.nomadapp.ui.community.CommunityDetailActivity;
import com.cos.nomadapp.R;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommunityAdapter extends RecyclerView.Adapter<CommunityAdapter.CommunityViewHolder>{
    private List<CommunityListRespDto> communities;
    private Context mContext;
    private String token;
    private int i=0;
    private static final String TAG = "CommunityAdapter";
    public CommunityAdapter(List<CommunityListRespDto> communities, Context mContext, String token) {
        this.communities = communities;
        this.mContext = mContext;
        this.token = token;
    }

    @NonNull
    @Override
    public CommunityViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.community_item, parent, false);
        return new CommunityViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CommunityViewHolder holder, int position) {
        holder.setCommunityItem(communities.get(position));
    }

    @Override
    public int getItemCount() {
        return communities.size();
    }

    public class CommunityViewHolder extends RecyclerView.ViewHolder{

        private TextView tvCommunityTitle,tvCommunityCategory,tvRegTime, tvUsername,tvReplyCount;
        private AppCompatButton btnLike;

        public CommunityViewHolder(@NonNull View itemView) {
            super(itemView);
            tvCommunityTitle = itemView.findViewById(R.id.tv_community_title);
            tvCommunityCategory = itemView.findViewById(R.id.tv_community_category);
            tvRegTime = itemView.findViewById(R.id.tv_reg_time);
            tvUsername = itemView.findViewById(R.id.tv_username);
            tvReplyCount = itemView.findViewById(R.id.tv_reply_count);
            btnLike = itemView.findViewById(R.id.btn_like);
            btnLike.setOnClickListener(v -> {           //좋아요
                int pos = getAdapterPosition();
                NomadApi nomadApi = NomadApi.retrofit.create(NomadApi.class);
                Call<CMRespDto<LikeClickRespDto>> call = nomadApi.likeUp("Bearer "+token,communities.get(pos).getId().longValue());
                call.enqueue(new Callback<CMRespDto<LikeClickRespDto>>() {
                    @Override
                    public void onResponse(Call<CMRespDto<LikeClickRespDto>> call, Response<CMRespDto<LikeClickRespDto>> response) {
                        btnLike.setText(communities.get(pos).getLikeCount()+"");
                        Log.d(TAG, "onResponse: 좋아요 "+btnLike.getText());
                    }
                    @Override
                    public void onFailure(Call<CMRespDto<LikeClickRespDto>> call, Throwable t) {
                        Log.d(TAG, "onFailure: 실패");
                    }
                });
            });
            //상세
            itemView.setOnClickListener(v->{
                int pos = getAdapterPosition();
                Intent intent = new Intent(mContext, CommunityDetailActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                intent.putExtra("community",communities.get(pos));
                mContext.startActivity(intent);
            });
        }

        public void setCommunityItem(CommunityListRespDto community){
            tvCommunityTitle.setText(community.getTitle());
            tvCommunityCategory.setText(community.getCategoryTitle());
            tvRegTime.setText(community.getCreateDate().toString());
            tvUsername.setText(community.getName());
            tvReplyCount.setText(community.getReplyCount()+"");
            btnLike.setText(community.getLikeCount()+"");
        }
    }

    public void filterList(List<CommunityListRespDto> filterItems) {
        this.communities = filterItems;
        notifyDataSetChanged();
    }
}