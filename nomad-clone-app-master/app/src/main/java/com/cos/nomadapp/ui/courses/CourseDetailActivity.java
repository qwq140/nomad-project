package com.cos.nomadapp.ui.courses;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.LoginActivity;
import com.cos.nomadapp.PaymentActivity;
import com.cos.nomadapp.R;
import com.cos.nomadapp.UserDashboardActivity;
import com.cos.nomadapp.VideoLobbyActivity;
import com.cos.nomadapp.adapter.CourseConceptAdapter;
import com.cos.nomadapp.adapter.CourseCurriculumAdapter;
import com.cos.nomadapp.adapter.CourseFaqAdapter;
import com.cos.nomadapp.adapter.CourseLectureAfterAdapter;
import com.cos.nomadapp.adapter.CourseLevelContentAdapter;
import com.cos.nomadapp.adapter.CourseLogoAdapter;
import com.cos.nomadapp.adapter.CourseSimpleAdapter;
import com.cos.nomadapp.adapter.CourseSkillAdapter;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.courses.Concept;
import com.cos.nomadapp.model.courses.Course;
import com.cos.nomadapp.model.courses.CourseFaqContent;
import com.cos.nomadapp.model.courses.CourseFaqTitle;
import com.cos.nomadapp.model.courses.CourseSimple;
import com.cos.nomadapp.model.courses.Curriculum;
import com.cos.nomadapp.model.pay.FreeSaveReqDto;
import com.cos.nomadapp.model.user.LoginDto;
import com.cos.nomadapp.model.video.Video;
import com.cos.nomadapp.model.video.VideoContent;
import com.cos.nomadapp.service.NomadApi;
import com.makeramen.roundedimageview.RoundedImageView;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CourseDetailActivity extends AppCompatActivity {

    private static final String TAG = "CourseDetailActivity";
    
    private TextView tvToolbarTitle;
    private ImageView ivBack;
    private RoundedImageView rivUser;

    private Course course;

    private ImageView mainImage;
    private TextView tvMainTitle, tvMainSubTitle, tvMainLevel;
    private RecyclerView rvLangLogo;

    private ConstraintLayout layoutSection1;

    private TextView tvVideoCount, tvVideoMinute, tvVideoLevel;

    private RecyclerView rvCourseSimpleInfo;

    private RecyclerView rvConcept;
    private TextView tvConceptTitle;
    private LinearLayout layoutSection4;

    private Button btnPayment;

    private RecyclerView rvSkillPackages, rvLevelContent, rvLectureAfter, rvCourseCurriculum, rvCourseFaq;
    private TextView tvSkillName, tvSkillSection, tvLectureAfterTitle, tvPayTitle, tvPrice;
    private LinearLayout layoutSection5, layoutSection7, layoutTopSection9;

    private long id;

    private NomadApi nomadApi;
    // 토큰
    private SharedPreferences pref;
    private String token;

    private Video video;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_course_detail);

        init();

        nomadApi= NomadApi.retrofit.create(NomadApi.class);
        Call<CMRespDto<Course>> call = nomadApi.getDetailCourses(id);
        call.enqueue(new Callback<CMRespDto<Course>>() {
            @Override
            public void onResponse(Call<CMRespDto<Course>> call, Response<CMRespDto<Course>> response) {
                Log.d(TAG, "onResponse: 코스 디테일 : "+response.body());
                course = response.body().getData();
                itemSetting();

            }

            @Override
            public void onFailure(Call<CMRespDto<Course>> call, Throwable t) {
                Log.d(TAG, "onFailure: ");
            }
        });



        //roundedImageView 이벤트
        rivUser = (RoundedImageView) findViewById(R.id.riv_user);
        rivUser.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                PopupMenu p = new PopupMenu(
                        getApplicationContext(),//화면제어권자
                        v);             //팝업을 띄울 기준이될 위젯
                getMenuInflater().inflate(R.menu.user_menu, p.getMenu());
                //이벤트 처리
                p.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                    @Override
                    public boolean onMenuItemClick(MenuItem item) {
                        if (item.getTitle().equals("Dashboard")) {
                            Toast.makeText(getApplicationContext(), item.getTitle(), Toast.LENGTH_SHORT).show();
                            Intent intent = new Intent(v.getContext(), UserDashboardActivity.class);
                            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                            v.getContext().startActivity(intent);
                        } else {
                            Toast.makeText(getApplicationContext(), item.getTitle(), Toast.LENGTH_SHORT).show();
                        }
                        return false;
                    }
                });
                p.show();
            }
        });
        //roundedImageView End
    }

    private void init(){
        // 페이지 넘어올때 id 가져오기
        Intent intent = getIntent();
        id = intent.getLongExtra("id",0);
        Log.d(TAG, "onCreate: id"+id);

        // 토큰 가져오기
        pref=getSharedPreferences("pref", MODE_PRIVATE);
        token = pref.getString("token","");

        // 뒤로가기 버튼
        ivBack = findViewById(R.id.iv_back);
        ivBack.setOnClickListener(v -> {
            finish();
        });

        // 앱바 디자인
        tvToolbarTitle = findViewById(R.id.tv_toolbar_title);
        tvToolbarTitle.setText("Course");

        // section1
        mainImage = findViewById(R.id.pageImage);
        tvMainTitle = findViewById(R.id.tv_page_title);
        tvMainSubTitle = findViewById(R.id.tv_page_subtitle);
        tvMainLevel = findViewById(R.id.tv_section1_level);
        rvLangLogo = findViewById(R.id.rv_lang_logo);
        layoutSection1 = findViewById(R.id.layout_section1);

        // section2
        tvVideoCount = findViewById(R.id.tv_video_count);
        tvVideoMinute = findViewById(R.id.tv_video_minute);
        tvVideoLevel = findViewById(R.id.tv_video_level);

        // section3
        rvCourseSimpleInfo = findViewById(R.id.rv_course_simple_info);

        // section4
        rvConcept = findViewById(R.id.rv_concept);
        tvConceptTitle = findViewById(R.id.tv_section4_title);
        layoutSection4 = findViewById(R.id.layout_section4);

        // section5
        rvSkillPackages = findViewById(R.id.rv_skill_packages);
        tvSkillName = findViewById(R.id.tv_skill_name);
        tvSkillSection = findViewById(R.id.tv_skill_section);
        layoutSection5 = findViewById(R.id.layout_section5);

        // section6
        rvLevelContent= findViewById(R.id.rv_level_content);

        // section7
        rvLectureAfter = findViewById(R.id.rv_lecture_after);
        tvLectureAfterTitle = findViewById(R.id.tv_lecture_after_title);
        layoutSection7 = findViewById(R.id.layout_section7);

        // section8
        rvCourseCurriculum = findViewById(R.id.rv_course_curriculum);

        // section9
        layoutTopSection9 = findViewById(R.id.layout_top_section9);
        tvPayTitle = findViewById(R.id.tv_section9_title);
        tvPrice = findViewById(R.id.tv_price);
        btnPayment = findViewById(R.id.btn_payment);

        // section10
        rvCourseFaq = findViewById(R.id.rv_course_faq);
    }

    private void itemSetting(){
        section1();
        section2();
        section3();
        section4();
        section5();
        section6();
        section7();
        section8();
        section9();
        section10();

    }
    private void section1(){

        Map<String, Object> map = course.getMainImage();
        String mainUrl = map.get("url").toString();

        Glide
                .with(CourseDetailActivity.this)
                .load(mainUrl) // 임시 테스트로 넘어오는 이미지는 localhost라서 적용이 안됨
                .centerCrop()
                .placeholder(R.drawable.test)
                .into(mainImage);


        Log.d(TAG, "section1: "+course.getTextColor());

        tvMainTitle.setText(course.getTitle());
        tvMainTitle.setTextColor(Color.parseColor(course.getTextColor()));
        tvMainSubTitle.setText(course.getSubTitle());
        tvMainSubTitle.setTextColor(Color.parseColor(course.getTextColor()));
        tvMainLevel.setText(course.getLevel());
        tvMainLevel.setTextColor(Color.parseColor(course.getBackgroundColor()));
        layoutSection1.setBackgroundColor(Color.parseColor(course.getBackgroundColor()));

        LinearLayoutManager manager = new LinearLayoutManager(this, RecyclerView.HORIZONTAL, false);
        rvLangLogo.setLayoutManager(manager);

        List<Map<String,Object>> tech = course.getTech();
        List<String> logos = new ArrayList<>();
        for (Map<String,Object> i:tech) {
            String logoUrl = i.get("imageUrl").toString();
            logos.add(logoUrl);
        }
        rvLangLogo.setAdapter(new CourseLogoAdapter(logos,this));

    }

    private void section2(){

        tvVideoCount.setText(course.getVideoInfo().get("count").toString()+"개");
        tvVideoMinute.setText(course.getVideoInfo().get("totalMinute").toString()+"분");
        tvVideoLevel.setText(course.getLevel());

    }

    private void section3(){
        LinearLayoutManager manager = new LinearLayoutManager(this, RecyclerView.VERTICAL, false);
        rvCourseSimpleInfo.setLayoutManager(manager);
        List<Map<String,Object>> simpleInfo = course.getSimpleInfo();
        Log.d(TAG, "section3: 심플 인포"+simpleInfo);
        List<CourseSimple> simples = new ArrayList<>();
        for (Map<String,Object> i:simpleInfo) {
            Map<String,Object> image =(Map<String,Object>)i.get("image");
            Log.d(TAG, "section3: 심플인포 이미지"+image);
            CourseSimple courseSimple = CourseSimple.builder()
                    .simpleImage(image.get("url").toString())
                    .title(i.get("title").toString())
                    .content(i.get("content").toString())
                    .build();
            simples.add(courseSimple);
        }
        rvCourseSimpleInfo.setAdapter(new CourseSimpleAdapter(simples,this));

    }

    private void section4(){

        layoutSection4.setBackgroundColor(Color.parseColor(course.getBackgroundColor()));
        tvConceptTitle.setTextColor(Color.parseColor(course.getTextColor()));

        List<Map<String,Object>> concepts = course.getConcept();



//        // concept, 잠시 임시데이터로 (디자인 고민)
//        List<Concept> concepts = new ArrayList<>();
//        // First concept
//        Concept concept1 = new Concept();
//        concept1.setTitle("Users");
//        List<String> contents1 = new ArrayList<>();
//        for (int i = 0 ; i<5 ; i++){
//            contents1.add("content"+i);
//        }
//        concept1.setContents(contents1);
//        concepts.add(concept1);
//
//        Concept concept2 = new Concept();
//        concept2.setTitle("Videos");
//        List<String> contents2 = new ArrayList<>();
//        for (int i = 0 ; i<5 ; i++){
//            contents2.add("content"+i);
//        }
        //concept2.setContents(contents2);
        //concepts.add(concept2);
        LinearLayoutManager manager = new LinearLayoutManager(this, RecyclerView.VERTICAL, false);
        rvConcept.setLayoutManager(manager);
        rvConcept.setAdapter(new CourseConceptAdapter(concepts,this));


    }

    private void section5(){
        layoutSection5.setBackgroundColor(Color.parseColor(course.getBackgroundColor()));
        tvSkillName.setText(course.getSkill().get("name").toString());
        tvSkillSection.setText(course.getSkill().get("section").toString());
        List<Map<String, Object>> packages = (List<Map<String, Object>>) course.getSkill().get("package");
        List<String> constents = new ArrayList<>();
        for (Map<String, Object> packageContent:packages) {
            String content = packageContent.get("content").toString();
            constents.add(content);
        }
        LinearLayoutManager manager = new LinearLayoutManager(this, RecyclerView.VERTICAL, false);
        rvSkillPackages.setLayoutManager(manager);
        rvSkillPackages.setAdapter(new CourseSkillAdapter(constents,this));

    }

    private void section6(){
        List<Map<String,Object>> levelContents = course.getLevelContent();
        List<String> contents = new ArrayList<>();
        for (Map<String,Object> levelContent:levelContents) {
            String content = levelContent.get("content").toString();
            contents.add(content);
        }
        LinearLayoutManager manager = new LinearLayoutManager(this, RecyclerView.VERTICAL, false);
        rvLevelContent.setLayoutManager(manager);
        rvLevelContent.setAdapter(new CourseLevelContentAdapter(contents));
    }

    private void section7(){
        tvLectureAfterTitle.setTextColor(Color.parseColor(course.getTextColor()));
        layoutSection7.setBackgroundColor(Color.parseColor(course.getBackgroundColor()));
        List<Map<String,Object>> lectureAfters = course.getLectureAfter();
        List<String> contents = new ArrayList<>();
        for (Map<String,Object> lectureAfter:lectureAfters) {
            String content = lectureAfter.get("content").toString();
            contents.add(content);
        }
        LinearLayoutManager manager = new LinearLayoutManager(this, RecyclerView.VERTICAL, false);
        rvLectureAfter.setLayoutManager(manager);
        rvLectureAfter.setAdapter(new CourseLectureAfterAdapter(contents,course));
    }

    private void section8(){
        Log.d(TAG, "section8: video "+course.getVideo());

        video = (Video) course.getVideo();
        Log.d(TAG, "section8: "+video);

        List<Curriculum> curriculumList = new ArrayList<>();

        for(int i = 0 ; i < video.getContents().size() ; i++){
            Curriculum curriculum = new Curriculum();
            curriculum.setChapter("#"+(i+1)+" "+video.getContents().get(i).get("title").toString());
            List<VideoContent> curriculumContent = new ArrayList<>();
            Log.d(TAG, "section8: chapter : "+curriculum.getChapter());
            Log.d(TAG, "section8: "+video.getContents().get(i).get("list"));
            List<Map<String, Object>> content = (List<Map<String, Object>>)video.getContents().get(i).get("list");
            Log.d(TAG, "section8: "+content);
            for (int j=0; j<content.size();j++){
                Log.d(TAG, "section8: curriculumContent"+content.get(j));
                String number = "#"+(i+1)+"."+j+" ";
                VideoContent videoContent = VideoContent.builder()
                        .title(number+content.get(j).get("title").toString())
                        .isFree(Boolean.parseBoolean(content.get(j).get("isFree").toString()))
                        .vimeoId(content.get(j).get("vimeoId").toString())
                        .build();
                curriculumContent.add(videoContent);
            }
            curriculum.setContents(curriculumContent);
            curriculumList.add(curriculum);
        }

        LinearLayoutManager manager = new LinearLayoutManager(this, RecyclerView.VERTICAL, false);
        rvCourseCurriculum.setLayoutManager(manager);
        rvCourseCurriculum.setAdapter(new CourseCurriculumAdapter(curriculumList,this, video.getId(),""));

    }

    private void section9(){
        layoutTopSection9.setBackgroundColor(Color.parseColor(course.getBackgroundColor()));
        tvPayTitle.setTextColor(Color.parseColor(course.getTextColor()));
        if (course.getPrice().equals("0")){
            tvPrice.setText("Free");
            btnPayment.setText("Enroll now →");
        } else {
            tvPrice.setText(course.getPrice()+"원");
        }

        btnPayment.setOnClickListener(v -> {
            Call<CMRespDto<LoginDto>> call = nomadApi.loadUser("Bearer "+token);
            call.enqueue(new Callback<CMRespDto<LoginDto>>() {
                @Override
                public void onResponse(Call<CMRespDto<LoginDto>> call, Response<CMRespDto<LoginDto>> response) {
                    Log.d(TAG, "onResponse: section9 "+response.body());
                    if (response.body()!=null){
                        if(course.getPrice().equals("0")){
                            FreeSaveReqDto freeSaveReqDto = FreeSaveReqDto.builder()
                                    .name(response.body().getData().getName())
                                    .courseId(course.getId())
                                    .paid_amount(Integer.parseInt(course.getPrice()))
                                    .build();
                            Call<CMRespDto> call2 = nomadApi.freePay("Bearer "+token, freeSaveReqDto);
                            call2.enqueue(new Callback<CMRespDto>() {
                                @Override
                                public void onResponse(Call<CMRespDto> call, Response<CMRespDto> response) {
                                    Log.d(TAG, "onResponse: "+response.body());
                                    Intent intent = new Intent(CourseDetailActivity.this, VideoLobbyActivity.class);
                                    intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                                    intent.putExtra("videoId",video.getId());
                                    intent.putExtra("status","paid");
                                    startActivity(intent);
                                    finish();
                                }

                                @Override
                                public void onFailure(Call<CMRespDto> call, Throwable t) {
                                    Log.d(TAG, "onFailure: ");
                                }
                            });
                        } else {
                            Intent intent = new Intent(CourseDetailActivity.this, PaymentActivity.class);
                            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                            intent.putExtra("course",course);
                            startActivity(intent);
                        }
                    }else{
                        Intent intent = new Intent(CourseDetailActivity.this,LoginActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        startActivity(intent);
                    }

                }

                @Override
                public void onFailure(Call<CMRespDto<LoginDto>> call, Throwable t) {
                    Log.d(TAG, "onFailure: ");
                }
            });
        });
    }

    private void section10(){

        // 임시 데이터
        List<CourseFaqTitle> titles = new ArrayList<>();

        List<CourseFaqContent> courseFaqContents1 = new ArrayList<>();
        CourseFaqContent courseFaqContent1 = new CourseFaqContent("수강신청을 하신 후에 언제든이요! 이 수업은 본인이 원하시는 시간에, 본인에게 맞는 속도와 스피드로 페이스를 조정하여, 언제든지 다시 반복하여 들을 수 있는 온라인 수업입니다.");
        courseFaqContents1.add(courseFaqContent1);

        CourseFaqTitle courseFaqTitle1 = new CourseFaqTitle("수업은 언제 시작하고 종료되나요?",courseFaqContents1);
        titles.add(courseFaqTitle1);

        List<CourseFaqContent> courseFaqContents2 = new ArrayList<>();
        CourseFaqContent courseFaqContent2 = new CourseFaqContent("무제한이요! 강의 영상의 경우 무제한으로, 언제든지, 어디서든 로그인하셔서 반복 재생, 수강하실 수 있습니다.");
        courseFaqContents2.add(courseFaqContent2);

        CourseFaqTitle courseFaqTitle2 = new CourseFaqTitle("수업은 언제까지 들을 수 있나요?",courseFaqContents2);
        titles.add(courseFaqTitle2);


        LinearLayoutManager manager = new LinearLayoutManager(this, RecyclerView.VERTICAL, false);
        rvCourseFaq.setLayoutManager(manager);
        rvCourseFaq.setAdapter(new CourseFaqAdapter(titles));
    }

    @Override
    protected void onResume() {
        super.onResume();
        token = pref.getString("token","");
    }
}