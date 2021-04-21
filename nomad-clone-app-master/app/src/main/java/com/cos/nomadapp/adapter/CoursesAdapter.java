package com.cos.nomadapp.adapter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.R;
import com.cos.nomadapp.VideoLobbyActivity;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.courses.CoursesPreview;
import com.cos.nomadapp.model.courses.PreviewImage;
import com.cos.nomadapp.model.pay.Pay;
import com.cos.nomadapp.model.pay.PayCheckReqDto;
import com.cos.nomadapp.model.tech.Tech;
import com.cos.nomadapp.service.NomadApi;
import com.cos.nomadapp.ui.courses.CourseDetailActivity;
import com.cos.nomadapp.ui.courses.CoursesActivity;
import com.makeramen.roundedimageview.RoundedImageView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CoursesAdapter extends RecyclerView.Adapter<CoursesAdapter.CourseViewHolder>{

    private static final String TAG = "TechAdapter";
    private List<CoursesPreview> coursesPreviews;
    private Context context;
    private NomadApi nomadApi = NomadApi.retrofit.create(NomadApi.class);
    private String token;


    public CoursesAdapter(List<CoursesPreview> coursesPreviews, Context context, String token) {

        this.coursesPreviews = coursesPreviews;
        this.context = context;
        this.token = token;
    }


    @NonNull
    @Override
    public CourseViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        LayoutInflater inflater = (LayoutInflater) parent.getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = inflater.inflate(R.layout.course_item,parent, false);
        return new CourseViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CourseViewHolder holder, int position) {
        holder.setItem(coursesPreviews.get(position));


    }


    @Override
    public int getItemCount() {
        return coursesPreviews.size();
    }


    public class CourseViewHolder extends RecyclerView.ViewHolder{

        private RoundedImageView ivCourse;
        private TextView tvTitle, tvSubTitle, tvLevel;

        public CourseViewHolder(@NonNull View itemView) {
            super(itemView);
            ivCourse = itemView.findViewById(R.id.iv_course);
            tvTitle = itemView.findViewById(R.id.tv_course_title);
            tvSubTitle = itemView.findViewById(R.id.tv_course_subtitle);
            tvLevel = itemView.findViewById(R.id.tv_courses_level);
        }

        public void setItem(CoursesPreview coursesPreview){
            //ivCourse.setImageResource(coursesPreview.get());
            tvLevel.setText(coursesPreview.getLevel());
            tvTitle.setText(coursesPreview.getTitle());
            tvSubTitle.setText(coursesPreview.getSubTitle());

            PreviewImage previewImage =  coursesPreview.getPreviewImage();
            Log.d(TAG, "setCourseItem: "+previewImage.getUrl());
            // localhost로 들어오는건 안됨 ..... 나중에 배포할때는 가능할듯
            Glide
                    .with(context)
                    .load(previewImage.getUrl())
                    .centerCrop()
                    .placeholder(R.drawable.course_youtube)
                    .into(ivCourse);

            long id = coursesPreview.getId();

            Log.d(TAG, "setCourseItem: id : " +id);
            itemView.setOnClickListener(v -> {
                PayCheckReqDto payCheckReqDto = new PayCheckReqDto();
//                Log.d(TAG, "setItem: 코스 아이디확인"+id);
                payCheckReqDto.setCourseId(id);
                Call<CMRespDto<Pay>> call = nomadApi.payCheck("Bearer "+token, payCheckReqDto);
                call.enqueue(new Callback<CMRespDto<Pay>>() {
                    @Override
                    public void onResponse(Call<CMRespDto<Pay>> call, Response<CMRespDto<Pay>> response) {
                        Log.d(TAG, "onResponse: 페이체크"+response.body());
                        if (response.body()!=null){ // 로그인 o
                            if (response.body().getData()==null){ // 결제 x
                                Log.d(TAG, "onResponse: 결제안함 "+response.body().getData());
                                Context context = v.getContext();
                                Intent intent = new Intent(context, CourseDetailActivity.class);
                                intent.putExtra("id", id);
                                intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                                context.startActivity(intent);
                            } else { // 결제 o
                                Log.d(TAG, "onResponse: 결제함 "+response.body().getData());
                                Context context = v.getContext();
                                Intent intent = new Intent(context, VideoLobbyActivity.class);
                                Log.d(TAG, "onResponse: 비디오아이디"+coursesPreview.getVideoId());
                                Log.d(TAG, "onResponse: 결제상태 "+response.body().getData().getStatus());
                                intent.putExtra("videoId", coursesPreview.getVideoId());
                                intent.putExtra("status",response.body().getData().getStatus());
                                intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                                context.startActivity(intent);
                            }
                        } else { // 로그인 x
                            Context context = v.getContext();
                            Intent intent = new Intent(context, CourseDetailActivity.class);
                            intent.putExtra("id", id);
                            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                            context.startActivity(intent);
                        }
                    }

                    @Override
                    public void onFailure(Call<CMRespDto<Pay>> call, Throwable t) {

                    }
                });
            });
        }
    }
}