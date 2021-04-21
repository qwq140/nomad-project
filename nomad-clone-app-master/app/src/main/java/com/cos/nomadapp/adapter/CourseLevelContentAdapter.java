package com.cos.nomadapp.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.cos.nomadapp.R;

import java.util.List;

public class CourseLevelContentAdapter extends RecyclerView.Adapter<CourseLevelContentAdapter.MyViewHolder>{

    private final List<String> levelContent;

    public CourseLevelContentAdapter(List<String> levelContent ) {

        this.levelContent = levelContent;
    }


    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        LayoutInflater inflater = (LayoutInflater) parent.getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = inflater.inflate(R.layout.detail_level_content,parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        holder.setItem(levelContent.get(position));

    }


    @Override
    public int getItemCount() {
        return levelContent.size();
    }


    public class MyViewHolder extends RecyclerView.ViewHolder {

        private TextView tvLevelContent;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            tvLevelContent = itemView.findViewById(R.id.tv_level_content);
        }

        public void setItem(String levelContent){
            tvLevelContent.setText(levelContent);

        }
    }
}