package com.cos.nomadapp.adapter;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.widget.AppCompatButton;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.R;
import com.cos.nomadapp.model.tech.Tech;
import com.cos.nomadapp.ui.courses.CoursesActivity;
import com.makeramen.roundedimageview.RoundedImageView;

import java.util.List;

public class TechAdapter extends RecyclerView.Adapter<TechAdapter.MyViewHolder>{

    private static final String TAG = "TechAdapter";
    private final List<Tech> teches;
    private Context context;

    private AppCompatButton btnTechCancel;


    public TechAdapter(List<Tech> teches, Context context, AppCompatButton btnTechCancel) {

        this.teches = teches;
        this.context = context;
        this.btnTechCancel = btnTechCancel;

    }


    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        LayoutInflater inflater = (LayoutInflater) parent.getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = inflater.inflate(R.layout.course_detail_logo_item,parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        holder.setItem(teches.get(position));


    }


    @Override
    public int getItemCount() {
        return teches.size();
    }


    public class MyViewHolder extends RecyclerView.ViewHolder {

        private RoundedImageView ivTech;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            ivTech = itemView.findViewById(R.id.iv_session1_logo);

            CoursesActivity test = (CoursesActivity)context;

            btnTechCancel.setOnClickListener(v -> {
                test.getCoursesSort().setTechId(0);
                btnTechCancel.setVisibility(View.INVISIBLE);
                test.downloadCourses();
            });
        }

        public void setItem(Tech tech){
            Glide
                    .with(context)
                    .load(tech.getFile().getFileUrl()) // 임시 테스트로 넘어오는 이미지는 localhost라서 적용이 안됨
                    .centerCrop()
                    .placeholder(R.drawable.ic_js)
                    .into(ivTech);

            CoursesActivity test = (CoursesActivity)context;
            ivTech.setOnClickListener(v -> {
                btnTechCancel.setText(tech.getTitle());
                test.getCoursesSort().setTechId(tech.getId());
                btnTechCancel.setVisibility(View.VISIBLE);
                test.downloadCourses();
            });
        }

    }
}