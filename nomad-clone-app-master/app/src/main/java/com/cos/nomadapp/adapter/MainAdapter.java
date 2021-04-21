package com.cos.nomadapp.adapter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.VideoLobbyActivity;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.courses.CoursesPreview;
import com.cos.nomadapp.model.courses.PreviewImage;
import com.cos.nomadapp.model.pay.Pay;
import com.cos.nomadapp.model.pay.PayCheckReqDto;
import com.cos.nomadapp.service.NomadApi;
import com.cos.nomadapp.ui.courses.CourseDetailActivity;
import com.cos.nomadapp.ui.courses.CoursesActivity;
import com.cos.nomadapp.FooterViewHolder;
import com.cos.nomadapp.R;
import com.cos.nomadapp.model.common.Item;
import com.cos.nomadapp.model.courses.Course;
import com.cos.nomadapp.model.common.MainTitle;
import com.makeramen.roundedimageview.RoundedImageView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainAdapter extends  RecyclerView.Adapter<RecyclerView.ViewHolder>{

    private static final String TAG = "CoursesAdapter";

    private static final int TYPE_HEADER = 0;
    private static final int TYPE_ITEM = 1;
    private static final int TYPE_LINK = 2;
    private static final int TYPE_FOOTER = 3;

    private List<CoursesPreview> coursesPreviews;
    private Context context;
    private String token;

    public MainAdapter(Context context, List<CoursesPreview> coursesPreviews, String token) {
        this.context = context;
        this.coursesPreviews = coursesPreviews;
        this.token = token;
    }


    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        if(viewType == TYPE_HEADER){
            return new MainAdapter.TitleViewHolder(
                    LayoutInflater.from(parent.getContext()).inflate(
                            R.layout.main_title_item,
                            parent,
                            false
                    )
            );
        }else if(viewType == TYPE_LINK){
            return new MainAdapter.LinkViewHolder(
                    LayoutInflater.from(parent.getContext()).inflate(
                            R.layout.main_link_item,
                            parent,
                            false
                    )
            );

        }else if(viewType == TYPE_ITEM){
            return new MainAdapter.CourseViewHolder(
                    LayoutInflater.from(parent.getContext()).inflate(
                            R.layout.course_item,
                            parent,
                            false
                    )
            );
        }else if (viewType == TYPE_FOOTER){
            return new FooterViewHolder(
                    LayoutInflater.from(parent.getContext()).inflate(
                            R.layout.footer,
                            parent,
                            false
                    )
            );
        }
        return null;
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if (holder instanceof TitleViewHolder){
            TitleViewHolder titleViewHolder = (TitleViewHolder) holder;
            titleViewHolder.setTitleItem();
        } else if (holder instanceof LinkViewHolder){
            LinkViewHolder linkViewHolder = (LinkViewHolder) holder;
        } else if (holder instanceof  FooterViewHolder){
            FooterViewHolder footerViewHolder = (FooterViewHolder) holder;
        } else {
            CourseViewHolder courseViewHolder = (CourseViewHolder) holder;
            courseViewHolder.setCourseItem(coursesPreviews.get(position-1));
        }
    }

    @Override
    public int getItemCount() {
        return coursesPreviews.size()+3;
    }

    @Override
    public int getItemViewType(int position) {
        if (position == 0){
            return TYPE_HEADER;
        } else if (position == coursesPreviews.size()+1){
            return TYPE_LINK;
        }else if (position == coursesPreviews.size()+2){
            return TYPE_FOOTER;
        } else {
            return TYPE_ITEM;
        }
    }

    public class CourseViewHolder extends RecyclerView.ViewHolder{

        private RoundedImageView ivCourse;
        private TextView tvTitle, tvSubTitle, tvLevel;
        private NomadApi nomadApi = NomadApi.retrofit.create(NomadApi.class);

        public CourseViewHolder(@NonNull View itemView) {
            super(itemView);
            ivCourse = itemView.findViewById(R.id.iv_course);
            tvTitle = itemView.findViewById(R.id.tv_course_title);
            tvSubTitle = itemView.findViewById(R.id.tv_course_subtitle);
            tvLevel = itemView.findViewById(R.id.tv_courses_level);
        }

        void setCourseItem(CoursesPreview coursesPreview){
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
                payCheckReqDto.setCourseId(id);
                Call<CMRespDto<Pay>> call = nomadApi.payCheck("Bearer "+token, payCheckReqDto);
                call.enqueue(new Callback<CMRespDto<Pay>>() {
                    @Override
                    public void onResponse(Call<CMRespDto<Pay>> call, Response<CMRespDto<Pay>> response) {
                        Log.d(TAG, "onResponse: 페이체크"+response.body());
                        if (response.body()!=null){ // 로그인 o
                            if (response.body().getData()==null){ // 결제 x
                                Context context = v.getContext();
                                Intent intent = new Intent(context, CourseDetailActivity.class);
                                intent.putExtra("id", id);
                                intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                                context.startActivity(intent);
                            } else { // 결제 o
                                Context context = v.getContext();
                                Intent intent = new Intent(context, VideoLobbyActivity.class);
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

    public class TitleViewHolder extends RecyclerView.ViewHolder{

        private TextView tvTitle, tvSubTitle;

        public TitleViewHolder(@NonNull View itemView) {
            super(itemView);
            tvTitle = itemView.findViewById(R.id.tv_main_title);
            tvSubTitle = itemView.findViewById(R.id.tv_main_subtitle);
        }

        void setTitleItem(){
            tvTitle.setText("Clone Startups.\nLearn to code.");
            tvSubTitle.setText("코딩은 진짜를 만들어보는거야!\n실제 구현되어 있는 서비스를 한땀 한땀\n따라 만들면서 코딩을 배우세요.");
        }
    }

    public class LinkViewHolder extends RecyclerView.ViewHolder{

        private TextView tvLink;

        public LinkViewHolder(@NonNull View itemView) {
            super(itemView);
            tvLink = itemView.findViewById(R.id.tv_link);

            tvLink.setOnClickListener(v -> {
                Intent intent = new Intent(v.getContext(), CoursesActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                v.getContext().startActivity(intent);
            });
        }

        void setMainLinkItem(String link){
            tvLink.setText(link);
        }
    }

}