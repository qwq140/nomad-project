package com.cos.nomadapp.adapter;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.cos.nomadapp.FooterViewHolder;
import com.cos.nomadapp.R;
import com.cos.nomadapp.model.common.CommonTitle;
import com.cos.nomadapp.model.common.Item;
import com.cos.nomadapp.model.challenge.Challenge;

import java.util.List;

public class ChallengesAdapter extends  RecyclerView.Adapter<RecyclerView.ViewHolder>{

    private List<Item> items;

    public ChallengesAdapter(List<Item> items) {
        this.items = items;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        //0 : CourseTitle 1 : Challenge 2: footer
        if(viewType == 0){
            return new TitleViewHolder(
                    LayoutInflater.from(parent.getContext()).inflate(
                            R.layout.title_item,
                            parent,
                            false
                    )
            );
        }else if(viewType == 1){
            return new ChallengeViewHolder(
                    LayoutInflater.from(parent.getContext()).inflate(
                            R.layout.challenge_item,
                            parent,
                            false
                    )
            );
        }else{
            return new FooterViewHolder(
                    LayoutInflater.from(parent.getContext()).inflate(
                            R.layout.footer,
                            parent,
                            false
                    )
            );
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if(getItemViewType(position)==0){
            CommonTitle commonTitle = (CommonTitle) items.get(position).getObject();
            ((TitleViewHolder) holder).setTitleItem(commonTitle);
        }else if(getItemViewType(position)==1){
            Challenge challenge = (Challenge) items.get(position).getObject();
            ((ChallengeViewHolder) holder).setChallengeItem(challenge);
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

    public static class ChallengeViewHolder extends RecyclerView.ViewHolder{

        private TextView tvChallengeTitle, tvTerm, tvChallengers;

        public ChallengeViewHolder(@NonNull View itemView) {
            super(itemView);
            tvChallengeTitle = itemView.findViewById(R.id.tv_challenge_title);
            tvTerm = itemView.findViewById(R.id.tv_term);
            tvChallengers = itemView.findViewById(R.id.tv_challengers);
        }

        void setChallengeItem(Challenge challenge){
            tvChallengeTitle.setText(challenge.getTitle());
            tvChallengers.setText(challenge.getChallengers()+"");
            tvTerm.setText(challenge.getTerm()+"");
        }
    }

    public static class TitleViewHolder extends RecyclerView.ViewHolder{

        private TextView tvChallengesTitle, tvChallengesSubTitle;

        public TitleViewHolder(@NonNull View itemView) {
            super(itemView);
            tvChallengesTitle = itemView.findViewById(R.id.tv_title);
            tvChallengesSubTitle = itemView.findViewById(R.id.tv_subtitle);
        }

        void setTitleItem(CommonTitle commonTitle){
            tvChallengesTitle.setText(commonTitle.getTitle());
            tvChallengesSubTitle.setText(commonTitle.getSubTitle());
        }
    }

}