package com.cos.nomadapp.adapter;

import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.R;
import com.cos.nomadapp.VideoLobbyActivity;
import com.cos.nomadapp.model.courses.Course;
import com.cos.nomadapp.model.courses.PreviewImage;
import com.cos.nomadapp.model.tech.Tech;
import com.cos.nomadapp.model.video.Video;
import com.cos.nomadapp.ui.courses.CourseDetailActivity;
import com.makeramen.roundedimageview.RoundedImageView;

import java.util.List;
import java.util.Map;

import lombok.NonNull;

public class MyCoursesAdapter extends RecyclerView.Adapter<MyCoursesAdapter.MyViewHolder>{

    private static final String TAG = "UserAdapter";

    private List<Course> courses;
    private Context mContext;
    private List<String> payStatus;

    public MyCoursesAdapter(List<Course> courses,List<String> payStatus, Context mContext) {
        this.courses = courses;
        this.mContext = mContext;
        this.payStatus = payStatus;
    }


    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        Log.d(TAG, "onCreateViewHolder: ");
        LayoutInflater inflater = (LayoutInflater) parent.getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = inflater.inflate(R.layout.course_item,parent, false);
        return new MyViewHolder(view); // view가 리스트뷰에 하나 그려짐
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        Log.d(TAG, "onBindViewHolder: ");
        holder.setItem(courses.get(position),payStatus.get(position));
    }

    @Override
    public int getItemCount() {
        return courses.size();
    }


    public class MyViewHolder extends RecyclerView.ViewHolder {

        private RoundedImageView ivCourse;
        private TextView tvTitle, tvSubTitle, tvLevel;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            ivCourse = itemView.findViewById(R.id.iv_course);
            tvTitle = itemView.findViewById(R.id.tv_course_title);
            tvSubTitle = itemView.findViewById(R.id.tv_course_subtitle);
            tvLevel = itemView.findViewById(R.id.tv_courses_level);

        }

        public void setItem(Course course, String status){
            Map<String, Object> previewImage = course.getPreviewImage();

            tvTitle.setText(course.getTitle());
            tvSubTitle.setText(course.getSubTitle());
            tvLevel.setText(course.getLevel());

            // localhost로 들어오는건 안됨 ..... 나중에 배포할때는 가능할듯
            Glide
                    .with(mContext)
                    .load(previewImage.get("url"))
                    .centerCrop()
                    .placeholder(R.drawable.course_youtube)
                    .into(ivCourse);

            long videoId = course.getVideo().getId();

            itemView.setOnClickListener(v -> {
                Context context = v.getContext();
                Intent intent = new Intent(context, VideoLobbyActivity.class);
                intent.putExtra("videoId", videoId);
                intent.putExtra("status",status);
                intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                context.startActivity(intent);
            });

        }
    }
}