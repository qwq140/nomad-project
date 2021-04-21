package com.cos.nomadapp.adapter;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.R;
import com.cos.nomadapp.model.courses.CourseSimple;
import com.cos.nomadapp.ui.courses.CourseDetailActivity;
import com.makeramen.roundedimageview.RoundedImageView;

import java.util.ArrayList;
import java.util.List;

public class CourseSimpleAdapter extends RecyclerView.Adapter<CourseSimpleAdapter.CourseSimpleViewHolder> {
    private static final String TAG = "UserAdapter";
    // 4번 컬렉션 생성
    private final List<CourseSimple> simples;
    private Context mContext;

    public CourseSimpleAdapter(List<CourseSimple> simples, Context mContext) {
        this.simples = simples;
        this.mContext = mContext;
    }


    @NonNull
    @Override
    public CourseSimpleViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        return new CourseSimpleViewHolder(
                LayoutInflater.from(parent.getContext()).inflate(
                        R.layout.course_detail_simpleinfo,
                        parent,
                        false
                )
        );
    }

    @Override
    public void onBindViewHolder(@NonNull CourseSimpleViewHolder holder, int position) {
        Log.d(TAG, "onBindViewHolder: ");
        holder.setItem(simples.get(position));
    }

    @Override
    public int getItemCount() {
        return simples.size();
    }

    public class CourseSimpleViewHolder extends RecyclerView.ViewHolder {

        private RoundedImageView ivThird;
        private TextView tvThirdTitle, tvThirdContent;

        public CourseSimpleViewHolder(@NonNull View itemView) {
            super(itemView);
            ivThird = itemView.findViewById(R.id.iv_third);
            tvThirdTitle = itemView.findViewById(R.id.tv_third_title);
            tvThirdContent = itemView.findViewById(R.id.tv_third_content);
        }

        public void setItem(CourseSimple courseSimple) {
            //ivThird.setImageResource(courseSection3.getSimpleImage());
            Glide
                    .with(mContext)
                    .load(courseSimple.getSimpleImage()) // 임시 테스트로 넘어오는 이미지는 localhost라서 적용이 안됨
                    .fitCenter()
                    .placeholder(R.drawable.test)
                    .into(ivThird);
            tvThirdTitle.setText(courseSimple.getTitle());
            tvThirdContent.setText(courseSimple.getContent());
        }
    }


}
