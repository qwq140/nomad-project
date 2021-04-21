# nomad-clone-app

Original Nomadcoder site :  https://nomadcoders.co/


## Development Environment
- Android Studio 4.1.2
- Java JDK 1.8
- JWT Spring boot Server
- Mysql 8.0


## Application Version
- compileSdkVersion : 30
- minSdkVersion : 21
- targetSdkVersion : 30


## Git
- JWT Server : https://github.com/LEEJAECHEOL/nomadCloneProject-bachend
- Android : https://github.com/qwq140/nomad-clone-app/
- Web (React) : https://github.com/LEEJAECHEOL/nomad_clone_web


## APIs
- Google OAuth
- Vimeo
- Summernote
- Firebase
- Retrofit
- Glide
- 채널톡 Channel.io


## dependencies

```gradle
dependencies {

    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'com.google.android.material:material:1.3.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
    implementation 'androidx.navigation:navigation-fragment:2.2.2'
    implementation 'androidx.navigation:navigation-ui:2.2.2'
    implementation 'androidx.recyclerview:recyclerview:1.1.0'
    testImplementation 'junit:junit:4.+'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'
    
    //roundedimageview
    implementation 'com.makeramen:roundedimageview:2.3.0'
    
    //lombok
    compileOnly 'org.projectlombok:lombok:1.18.10'
    annotationProcessor 'org.projectlombok:lombok:1.18.10'

    //fontawesome
    implementation 'com.github.gmazzo:fontawesome:0.4'
    implementation 'info.androidhive:fontawesome:0.0.5'
    
    //recyclerview
    implementation 'com.thoughtbot:expandablerecyclerview:1.4'
    
    //summernote
    implementation 'in.nashapp.androidsummernote:androidsummernote:1.0.5'

    //retrofit2
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.3.0'
    
    //Firebase
    implementation platform('com.google.firebase:firebase-bom:26.7.0')
    implementation 'com.google.firebase:firebase-auth'
    implementation 'com.firebaseui:firebase-ui-auth:6.4.0'
    
    // gson library
    implementation 'com.google.code.gson:gson:2.8.6'
    implementation 'com.google.android.gms:play-services-auth:19.0.0'

    //glide
    implementation 'com.github.bumptech.glide:glide:4.9.0'
    implementation 'com.github.chinalwb:are:0.1.7'
    
    //iamport
    implementation 'com.github.iamport:iamport-android:v0.0.6-dev21'
    implementation "org.jetbrains.kotlin:kotlin-stdlib:1.4.30"
    implementation 'commons-io:commons-io:2.4'
    //channel.io
    implementation 'com.zoyi.channel:plugin-android:8.3.0'

}
```


## Mysql Setting

```sql
/* root */

create user 'nomad'@'%' identified by '1234';
GRANT ALL PRIVILEGES ON *.* TO 'nomad'@'%';
create database nomad;
use nomad;

```


## IP address Setting

![image](https://user-images.githubusercontent.com/44068819/113742622-bf1bc700-973d-11eb-960d-17ca423b4802.png)
![image](https://user-images.githubusercontent.com/44068819/113743093-3a7d7880-973e-11eb-9551-b4fb3acc32a0.png)

![image](https://user-images.githubusercontent.com/44068819/113744051-4e75aa00-973f-11eb-8533-d5ac54cf3032.png)


## NomadAPI.java / OAuthApi.java

Replace with your IP address in the address place of the code before start!

```java
public static final Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("http://${Add your IP address!!}:8080/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();
```

### Confirm Server application.yml setting

```yml
server:
  port: 8080
  servlet:
    context-path: /
    encoding:
      charset: UTF-8
      enabled: true
      force: true
                                                                                                                     
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/nomad?serverTimezone=Asia/Seoul
    username: nomad
    password: 1234

  jpa:
    hibernate:
      ddl-auto: update  #create update none
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    show-sql: true
    properties:
      hibernate.format_sql: true

  jackson:
    serialization:
      fail-on-empty-beans: false
 
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB
      enabled: true
           
file:
  path: C:/Users/Dong/Desktop/NomadWork/nomadCloneProject-bachend/src/main/resources/uploads/


```




## Main source code


### Login

![image](https://user-images.githubusercontent.com/44068819/113749296-79aec800-9744-11eb-8fe4-f1e9eed431ba.png)
![image](https://user-images.githubusercontent.com/44068819/113752266-b8924d00-9747-11eb-97c8-f6c13d6f96d5.png)

```java
private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);


            OAuthApi oauthApi = OAuthApi.retrofit.create(OAuthApi.class);
            Call<CMRespDto<LoginDto>> call = oauthApi.postOauth(account.getIdToken());
            call.enqueue(new Callback<CMRespDto<LoginDto>>() {
                @Override
                public void onResponse(Call<CMRespDto<LoginDto>> call, Response<CMRespDto<LoginDto>> response) {
                    Log.d(TAG, "onResponse: 응답 : "+response.body());
                    if (response.body().getStatusCode()==200){
                        Log.d(TAG, "onResponse: 200 성공");
                        LoginDto loginDto = response.body().getData();
                        Gson gson = new Gson();
                        String basicUserInfo = gson.toJson(loginDto);

                        Log.d(TAG, "onResponse: data : 구글로그인 " + loginDto);
                        pref = getSharedPreferences("pref", MODE_PRIVATE);
                        editor = pref.edit();
                        editor.putString("token",loginDto.getToken());
                        editor.putString("user",basicUserInfo);
                        editor.commit();

                        finish();

                    } else {
                        Log.d(TAG, "onResponse: 로그인 실패");
                    }

                }

                @Override
                public void onFailure(Call<CMRespDto<LoginDto>> call, Throwable t) {
                    Log.d(TAG, "onFailure: onFailure");
                }
            });
        } catch (ApiException e) {
            Log.w(TAG, "signInResult:failed code=" + e.getStatusCode());
    }
            
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);

        }

    }
    
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.sign_in_button:
                signIn();
                break;
            // ...
        }
    }

    private void signIn() {
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }
```


### Course

![image](https://user-images.githubusercontent.com/44068819/113752486-ff804280-9747-11eb-82b5-4c9fb4e45037.png)
![image](https://user-images.githubusercontent.com/44068819/113752598-1b83e400-9748-11eb-8193-27ec28378784.png)


``` java
//init settings
private void init(){
        //get token
        pref = getSharedPreferences("pref",MODE_PRIVATE);
        token = pref.getString("token","");

        // appbar
        ivBack = findViewById(R.id.iv_back);
        tvToolbarTitle = findViewById(R.id.tv_toolbar_title);

        // level chips
        chipBeginner = findViewById(R.id.chip_beginner);
        chipIntermediate = findViewById(R.id.chip_intermediate);
        chipAdvanced = findViewById(R.id.chip_advanced);

        // pay chips
        chipFree = findViewById(R.id.chip_free);
        chipPaid = findViewById(R.id.chip_paid);

        // chipGroup
        chipGroup1 = findViewById(R.id.chipGroup);
        chipGroup2 = findViewById(R.id.chipGroup2);

        // select cancel buttons
        btnTechCancel = findViewById(R.id.btn_tech_cancel);
        btnLevelCancel = findViewById(R.id.btn_level_cancel);
        btnPriceCancel = findViewById(R.id.btn_price_cancel);

        // subtitle, title
        tvCoursesTitle = findViewById(R.id.tv_title);
        tvCoursesSubTitle = findViewById(R.id.tv_subtitle);

        // title, subtitle set text
        tvCoursesTitle.setText("All Courses");
        tvCoursesSubTitle.setText("초급부터 고급까지! 니꼬쌤과 함께 풀스택으로 성장하세요!");

        // appbar's title set text
        tvToolbarTitle.setText("Courses");

        // recyclerview
        rvCoursesList = findViewById(R.id.rv_courses_list);
        rvTech = findViewById(R.id.rv_tech);

        // back
        ivBack.setOnClickListener(v -> {
            finish();
        });

        rivUser = findViewById(R.id.riv_user);

        //초기세팅
        coursesSort.setIsFree("");
        coursesSort.setLevel("");
        coursesSort.setTechId(0);
    }

// download courses list
    public void downloadCourses(){
        LinearLayoutManager manager = new LinearLayoutManager(this, RecyclerView.VERTICAL, false);
        rvCoursesList.setLayoutManager(manager);
        Call<CMRespDto<List<CoursesPreview>>> call = nomadApi.getAllCourses(coursesSort.getLevel(),coursesSort.getIsFree(),coursesSort.getTechId());
        call.enqueue(new Callback<CMRespDto<List<CoursesPreview>>>() {
            @Override
            public void onResponse(Call<CMRespDto<List<CoursesPreview>>> call, Response<CMRespDto<List<CoursesPreview>>> response) {
                Log.d(TAG, "onResponse: "+response.body());
                List<CoursesPreview> coursesPreviews = response.body().getData();
                rvCoursesList.setAdapter(new CoursesAdapter(coursesPreviews,mContext, token));
            }

            @Override
            public void onFailure(Call<CMRespDto<List<CoursesPreview>>> call, Throwable t) {
                Log.d(TAG, "onFailure: ");
            }
        });

    }
    
    // download tech list
    private void downloadTech(){
        GridLayoutManager gridLayoutManager = new GridLayoutManager(mContext,4);
        rvTech.setLayoutManager(gridLayoutManager);

        NomadApi nomadApi = NomadApi.retrofit.create(NomadApi.class);
        Call<CMRespDto<List<Tech>>> call = nomadApi.getTechList();
        call.enqueue(new Callback<CMRespDto<List<Tech>>>() {
            @Override
            public void onResponse(Call<CMRespDto<List<Tech>>> call, Response<CMRespDto<List<Tech>>> response) {
                Log.d(TAG, "onResponse: 성공 " + response.body());
                List<Tech> teches = response.body().getData();
                Log.d(TAG, "onResponse: techs : "+teches);
                rvTech.setAdapter(new TechAdapter(teches,mContext,btnTechCancel));
            }

            @Override
            public void onFailure(Call<CMRespDto<List<Tech>>> call, Throwable t) {
                Log.d(TAG, "onFailure: 실패");
            }
        });
    }

```


### Community

![image](https://user-images.githubusercontent.com/44068819/113751344-d27f6000-9746-11eb-949e-1b8da07c74f3.png)

```java
    private void buttonListener(){
        materialButtonToggleGroup.addOnButtonCheckedListener(new MaterialButtonToggleGroup.OnButtonCheckedListener() {
            @Override
            public void onButtonChecked(MaterialButtonToggleGroup group, int checkedId, boolean isChecked) {
                if(isChecked){
                    if(checkedId == R.id.btn_sort_popular){
                        sort="popular";
                        addFrag();
                        initScrollListener();

                    }else if(checkedId == R.id.btn_sort_new){
                        sort="new";
                        addFrag();
                        initScrollListener();
                    }
                }
            }
        });
    }



    private void addFrag(){
        page=0;
        nomadApi = NomadApi.retrofit.create(NomadApi.class);
        Call<CMRespDto<List<CommunityListRespDto>>> call2= nomadApi.comFindAll("Bearer "+token,sort,categoryId,page);
        call2.enqueue(new Callback<CMRespDto<List<CommunityListRespDto>>>() {
            @Override
            public void onResponse(Call<CMRespDto<List<CommunityListRespDto>>> call, Response<CMRespDto<List<CommunityListRespDto>>> response) {
                communities= response.body().getData();
                communityAdapter = new CommunityAdapter(communities, mContext,token);
                rvCommunityNew.setAdapter(communityAdapter);
                rvCommunityNew.setLayoutManager(manager);
            }

            @Override
            public void onFailure(Call<CMRespDto<List<CommunityListRespDto>>> call, Throwable t) {
                Log.d(TAG, "onFailure: 실패");
            }
        });
    }
    private void initScrollListener(){
        rvCommunityNew.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrollStateChanged(@NonNull RecyclerView recyclerView, int newState) {
                super.onScrollStateChanged(recyclerView, newState);
                if(!rvCommunityNew.canScrollVertically(1)){
                    if(communities.size()%10>0){
                        progressBar.setVisibility(View.INVISIBLE);
                    }else{
                        progressBar.setVisibility(View.VISIBLE);
                    }
                    if(page<(communities.size()/10)){  //page무한 증가 방지
                        page++;
                        Call<CMRespDto<List<CommunityListRespDto>>> call2= nomadApi.comFindAll("Bearer "+token,sort,categoryId,page);
                        call2.enqueue(new Callback<CMRespDto<List<CommunityListRespDto>>>() {
                            @Override
                            public void onResponse(Call<CMRespDto<List<CommunityListRespDto>>> call, Response<CMRespDto<List<CommunityListRespDto>>> response) {
                                for(int i=0;i<response.body().getData().size();i++){
                                    communities.add(response.body().getData().get(i));
                                    communityAdapter.notifyDataSetChanged();
                                }
                            }
                            @Override
                            public void onFailure(Call<CMRespDto<List<CommunityListRespDto>>> call, Throwable t) {
                                Log.d(TAG, "onFailure: 실패");
                            }
                        });
                    }
                    Log.d(TAG, "onScrollStateChanged: Page: "+page+" communities.size()"+communities.size());

                }else{
                    progressBar.setVisibility(View.INVISIBLE);
                }
            }

            @Override
            public void onScrolled(@NonNull RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);
            }
        });
    }
```


### Video

![image](https://user-images.githubusercontent.com/44068819/113752706-3c4c3980-9748-11eb-8f02-fc219d872291.png)

```java
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate( R.layout.video_frag_detail, container, false );

        context = container.getContext();
        pref = context.getSharedPreferences("pref",Context.MODE_PRIVATE);
        String token = pref.getString("token","");

        tvVideoTitle = view.findViewById(R.id.tv_video_title);
        tvVideoTitle.setText(videoContent.getTitle());
        videoView = view.findViewById(R.id.video_view);

        videoView.getSettings().setJavaScriptEnabled(true);
        videoView.getSettings().setDomStorageEnabled(true);


        Log.d(TAG, "onCreateView: 비메오아이디"+videoContent.getVimeoId());
        String url = "http://192.168.43.74:3100/android/video/"+videoContent.getVimeoId();
        Map<String, String> additionalHttpHeader = new HashMap<>();
        additionalHttpHeader.put("Authorization","Bearer "+token);

        videoView.loadUrl(url, additionalHttpHeader);

        videoView.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                System.out.println("is run?");

            }
        });
```


### Payment

![image](https://user-images.githubusercontent.com/44068819/113752814-5be36200-9748-11eb-9a52-ece32065d561.png)
![image](https://user-images.githubusercontent.com/44068819/113752878-6ef63200-9748-11eb-874e-7d19f60c6f52.png)


``` java
  private void init(){
        Intent intent = getIntent();
        course = (Course) intent.getSerializableExtra("course");

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
        tvToolbarTitle.setText("Payment");

        ivCourse = findViewById(R.id.iv_course);
        tvCourseTitle = findViewById(R.id.tv_course_title);
        tvCourseSubTitle = findViewById(R.id.tv_course_subtitle);
        tvCourseLevel = findViewById(R.id.tv_courses_level);
        tvAmountPayment = findViewById(R.id.tv_amount_payment);
        
        rgPaymentMethod = findViewById(R.id.rg_payment_method);
        btnPayNow = findViewById(R.id.btn_pay_now);

    }

    private void setItem(){
        tvCourseLevel.setVisibility(View.INVISIBLE);
        tvCourseTitle.setText(course.getTitle());
        tvCourseSubTitle.setText(course.getSubTitle());

        Map<String,Object> previewImage = course.getPreviewImage();

        Glide
                .with(this)
                .load(previewImage.get("url")) // 임시 테스트로 넘어오는 이미지는 localhost라서 적용이 안됨
                .centerCrop()
                .placeholder(R.drawable.course_youtube)
                .into(ivCourse);

        tvAmountPayment.setText("￦ "+course.getPrice());
        
        rgPaymentMethod.setOnCheckedChangeListener((group, checkedId) -> {
            if (group==rgPaymentMethod){
                if (checkedId == R.id.rb_domestic_card){
                    Log.d(TAG, "setItem: 국내카드");
                    btnPayNow.setOnClickListener(v -> {
                        payMethod = "domestic_card";
                        Intent intent = new Intent(this, IamportActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        intent.putExtra("course",course);
                        intent.putExtra("payMethod",payMethod);
                        startActivity(intent);

                    });
                } else if(checkedId == R.id.rb_kakao_pay){
                    Log.d(TAG, "setItem: 카카오페이");
                    btnPayNow.setOnClickListener(v -> {
                        payMethod = "kakao_pay";
                        Intent intent = new Intent(this, IamportActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        intent.putExtra("course",course);
                        intent.putExtra("payMethod",payMethod);
                        startActivity(intent);

                    });
                } else if(checkedId == R.id.rb_overseas_card){
                    Log.d(TAG, "setItem: 해외카드");
                    btnPayNow.setOnClickListener(v -> {
                        payMethod = "overseas_card";
                        Intent intent = new Intent(this, IamportActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        intent.putExtra("course",course);
                        intent.putExtra("payMethod",payMethod);
                        startActivity(intent);

                    });
                } else{
                    Log.d(TAG, "setItem: 선택안함");
                    Toast.makeText(this.getApplicationContext(),"결제방법을 체크해주세요",Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
```


## 오류해결

![image](https://user-images.githubusercontent.com/44068819/113816321-a6e49000-97af-11eb-838c-846267e6dd4a.png)

위와같은 error가 발생한다면

nomad-clone-app/gradle/wrapper/gradle-wrapper.properties에서 
```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-6.5-bin.zip
```
의 버전을
```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-6.4.1-all.zip
```
로 낮추고 


```gradle
dependencies {
        classpath "com.android.tools.build:gradle:4.0.2"


        classpath 'com.google.gms:google-services:4.3.5'
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
```
gradle버전을 4.1.2에서 4.0.2로 낮추고 Sync Now를 눌러 적용해 준다


## 개발하면서 어려웠던 부분

###  이미지 업로드 

해결방법 : https://blog.naver.com/qwq140/222295526906
