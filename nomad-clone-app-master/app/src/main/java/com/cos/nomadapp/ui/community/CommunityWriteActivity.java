package com.cos.nomadapp.ui.community;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.ImageView;

import com.cos.nomadapp.R;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.community.Category;
import com.cos.nomadapp.model.community.Community;
import com.cos.nomadapp.model.community.CommunitySaveReqDto;
import com.cos.nomadapp.service.NomadApi;
import com.google.android.material.textfield.TextInputEditText;

import java.util.ArrayList;
import java.util.List;

import in.nashapp.androidsummernote.Summernote;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommunityWriteActivity extends AppCompatActivity {

    private ImageView ivBack;
    private AutoCompleteTextView autoCompleteTextView;
    private Summernote summernote;
    private List<Category> categories;
    private AppCompatButton btnSaveCommunity;
    public List<String> category;
    private TextInputEditText etTitle;
    private static final String TAG = "CommunityWriteActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_community_write);
    }

    @Override
    protected void onResume() {
        super.onResume();
        ivBack = findViewById(R.id.iv_back);

        ivBack.setOnClickListener(v -> {
            finish();
        });

        autoCompleteTextView = findViewById(R.id.autoCompleteText);
        btnSaveCommunity = findViewById(R.id.btn_save_community);
        etTitle = findViewById(R.id.et_title);
        category= new ArrayList<>();
        categories= new ArrayList<>();
        NomadApi nomadApi = NomadApi.retrofit.create(NomadApi.class);
        Call<CMRespDto<List<Category>>> call = nomadApi.comCategoryFindAll();
        call.enqueue(new Callback<CMRespDto<List<Category>>>() {
            @Override
            public void onResponse(Call<CMRespDto<List<Category>>> call, Response<CMRespDto<List<Category>>> response) {
                categories=response.body().getData();
                for(int i=0;i<categories.size();i++){   //All:0??? ??????
                    category.add(categories.get(i).getTitle());
                    Log.d(TAG, "onResponse: ???????????? ????????? ??????");
                }
            }
            @Override
            public void onFailure(Call<CMRespDto<List<Category>>> call, Throwable t) {
                Log.d(TAG, "onFailure: ???????????? ????????? ??????");
            }
        });


        ArrayAdapter arrayAdapter = new ArrayAdapter(this,R.layout.community_category_item,category);
        // ????????? ???
        autoCompleteTextView.setText("???????????? ??????",true);
        autoCompleteTextView.setAdapter(arrayAdapter);

        summernote = (Summernote) findViewById(R.id.summernote);
        summernote.setRequestCodeforFilepicker(5);//Any Number which is not being used by other OnResultActivity

        // ?????? ?????? ?????? ???
        btnSaveCommunity.setOnClickListener(v->{
            SharedPreferences pref = getSharedPreferences("pref", MODE_PRIVATE);
            String token = pref.getString("token","");

            CommunitySaveReqDto communitySaveReqDto=new CommunitySaveReqDto();
            communitySaveReqDto.setTitle(etTitle.getText().toString());
            communitySaveReqDto.setContent(summernote.getText());
            for(int i=0;i<categories.size();i++){

                if(autoCompleteTextView.getText().toString().equals(categories.get(i).getTitle())){
                    communitySaveReqDto.setCategoryId(categories.get(i).getId());
                    Log.d(TAG, "onCreate: ??????"+categories.get(i).getId());
                }else{
                    Log.d(TAG, "getText: "+autoCompleteTextView.getText()+"  getTitle()"+categories.get(i).getTitle());
                }
            }
            Log.d(TAG, "onCreate: "+communitySaveReqDto.toString());

            NomadApi nomadApi2 = NomadApi.retrofit.create(NomadApi.class);
            Call<CMRespDto<Community>> call2 = nomadApi2.comSave("Bearer "+token, communitySaveReqDto);
            call2.enqueue(new Callback<CMRespDto<Community>>() {
                @Override
                public void onResponse(Call<CMRespDto<Community>> call, Response<CMRespDto<Community>> response) {
                    Log.d(TAG, "onResponse: ???????????? ????????? ?????? "+response.body());
                }

                @Override
                public void onFailure(Call<CMRespDto<Community>> call, Throwable t) {
                    Log.d(TAG, "onFailure: ");
                }
            });
            finish();
        });
    }
}