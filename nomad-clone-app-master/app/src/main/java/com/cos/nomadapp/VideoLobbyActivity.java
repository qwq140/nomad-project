package com.cos.nomadapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

import com.cos.nomadapp.adapter.CourseCurriculumAdapter;
import com.cos.nomadapp.adapter.VideoListAdapter;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.courses.Course;
import com.cos.nomadapp.model.courses.CoursesPreview;
import com.cos.nomadapp.model.courses.Curriculum;
import com.cos.nomadapp.model.courses.PreviewImage;
import com.cos.nomadapp.model.user.LoginDto;
import com.cos.nomadapp.model.video.Video;
import com.cos.nomadapp.model.video.VideoContent;
import com.cos.nomadapp.service.NomadApi;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class VideoLobbyActivity extends AppCompatActivity {

    private static final String TAG = "VideoLobbyActivity";

    private ImageView ivBack;
    private TextView tvToolbarTitle, tvVideoTtile;
    private long videoId;
    private SharedPreferences pref;
    private String token, status;
//    private LoginDto loginDto;
    private RecyclerView rvVideoLobby;
    private Context mContext = VideoLobbyActivity.this;
    private NomadApi nomadApi;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_lobby);


        init();

        downloadVideo();

    }

    private void init(){
        // 프리뷰
        Intent intent = getIntent();
        videoId = intent.getLongExtra("videoId",0);
        status = intent.getStringExtra("status");

        //
        pref = getSharedPreferences("pref",MODE_PRIVATE);
        token = pref.getString("token", "");
//        String user = pref.getString("user","");
//        Gson gson = new Gson();
//        loginDto = gson.fromJson(user,LoginDto.class);

        // appbar
        ivBack = findViewById(R.id.iv_back);
        ivBack.setOnClickListener(v -> {
            finish();
        });
        tvToolbarTitle = findViewById(R.id.tv_toolbar_title);
        tvToolbarTitle.setText("Lobby");
        tvVideoTtile = findViewById(R.id.tv_video_title);
        rvVideoLobby = findViewById(R.id.rv_video_lobby);
        nomadApi = NomadApi.retrofit.create(NomadApi.class);
    }

    private void downloadVideo(){
        Call<CMRespDto<Video>> call = nomadApi.getVideoList("Bearer " + token, videoId);
        call.enqueue(new Callback<CMRespDto<Video>>() {
            @Override
            public void onResponse(Call<CMRespDto<Video>> call, Response<CMRespDto<Video>> response) {
                if (response.body()!=null){
                    Log.d(TAG, "onResponse: " + response.body());
                    Video video = response.body().getData();
                    tvVideoTtile.setText(video.getName());
                    List<Curriculum> curriculumList = new ArrayList<>();

                    for (int i = 0; i < video.getContents().size(); i++) {
                        Curriculum curriculum = new Curriculum();
                        curriculum.setChapter("#" + (i + 1) + " " + video.getContents().get(i).get("title").toString());
                        List<VideoContent> curriculumContent = new ArrayList<>();
                        Log.d(TAG, "section8: chapter : " + curriculum.getChapter());
                        Log.d(TAG, "section8: " + video.getContents().get(i).get("list"));
                        List<Map<String, Object>> content = (List<Map<String, Object>>) video.getContents().get(i).get("list");
                        Log.d(TAG, "section8: " + content);
                        for (int j = 0; j < content.size(); j++) {
                            Log.d(TAG, "section8: curriculumContent" + content.get(j));
                            String number = "#"+(i+1)+"."+j+" ";
                            VideoContent videoContent = VideoContent.builder()
                                    .title(number + content.get(j).get("title").toString())
                                    .isFree(Boolean.parseBoolean(content.get(j).get("isFree").toString()))
                                    .vimeoId(content.get(j).get("vimeoId").toString())
                                    .build();
                            curriculumContent.add(videoContent);
                        }
                        curriculum.setContents(curriculumContent);
                        curriculumList.add(curriculum);
                    }

                    LinearLayoutManager manager = new LinearLayoutManager(mContext, RecyclerView.VERTICAL, false);
                    rvVideoLobby.setLayoutManager(manager);
                    rvVideoLobby.setAdapter(new CourseCurriculumAdapter(curriculumList, mContext, video.getId(), status));
                }

            }


            @Override
            public void onFailure(Call<CMRespDto<Video>> call, Throwable t) {
                Log.d(TAG, "onFailure: ");
            }
        });
    }

//    private void downloadCourse(){
//        Call<CMRespDto<Course>> call = nomadApi.getDetailCourses(courseId);
//        call.enqueue(new Callback<CMRespDto<Course>>() {
//            @Override
//            public void onResponse(Call<CMRespDto<Course>> call, Response<CMRespDto<Course>> response) {
//                Course course = response.body().getData();
//                String previewImageUrl = course.getPreviewImage().get("url").toString();
//                PreviewImage previewImage = new PreviewImage();
//                previewImage.setUrl(previewImageUrl);
//                CoursesPreview coursesPreview = new CoursesPreview();
//                coursesPreview.setTitle(course.getTitle());
//                coursesPreview.setSubTitle(course.getSubTitle());
//                Video video = course.getVideo();
//            }
//
//            @Override
//            public void onFailure(Call<CMRespDto<Course>> call, Throwable t) {
//
//            }
//        });
//    }
}