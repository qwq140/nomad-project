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

public class CourseSkillAdapter extends RecyclerView.Adapter<CourseSkillAdapter.MyViewHolder>{

    private final List<String> contents;
    private Context mContext;

    public CourseSkillAdapter(List<String> contents, Context mContext) {

        this.contents = contents;
        this.mContext = mContext;
    }


    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        LayoutInflater inflater = (LayoutInflater) parent.getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = inflater.inflate(R.layout.course_skill_packges,parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        holder.setItem(contents.get(position));

    }


    @Override
    public int getItemCount() {
        return contents.size();
    }


    public class MyViewHolder extends RecyclerView.ViewHolder {

        private TextView tvPackage;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            tvPackage = itemView.findViewById(R.id.tv_packages_content);
        }

        public void setItem(String content){
            tvPackage.setText(content);

        }
    }
}