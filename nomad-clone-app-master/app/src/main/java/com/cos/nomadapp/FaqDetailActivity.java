package com.cos.nomadapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.Html;
import android.text.Spanned;
import android.text.method.ScrollingMovementMethod;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.faq.Faq;
import com.cos.nomadapp.model.faq.FaqItem;
import com.cos.nomadapp.service.NomadApi;
import com.cos.nomadapp.utils.GlideImageGetter;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FaqDetailActivity extends AppCompatActivity {

    private static final String TAG = "FaqDetailActivity";
    private ImageView ivBack;
    private TextView tvToolbarTitle, tvFaqDetailContent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_faq_detail);

        Intent intent = getIntent();

        long id = intent.getLongExtra("faqItem",0);
        Log.d(TAG, "onCreate: "+id);

        ivBack = findViewById(R.id.iv_back);

        tvToolbarTitle = findViewById(R.id.tv_toolbar_title);

        ivBack.setOnClickListener(v -> {
            finish();
        });

        tvFaqDetailContent = findViewById(R.id.tv_faq_detail_content);
        tvFaqDetailContent.setMovementMethod(new ScrollingMovementMethod());


        NomadApi nomadApi = NomadApi.retrofit.create(NomadApi.class);
        Call<CMRespDto<Faq>> call = nomadApi.faqFindById(id);
        call.enqueue(new Callback<CMRespDto<Faq>>() {
            @Override
            public void onResponse(Call<CMRespDto<Faq>> call, Response<CMRespDto<Faq>> response) {
                Log.d(TAG, "onResponse: "+response.body());
                Faq faq = response.body().getData();
                Log.d(TAG, "onResponse: "+faq);
                tvToolbarTitle.setText(faq.getTitle());
                GlideImageGetter getter = new GlideImageGetter(FaqDetailActivity.this,tvFaqDetailContent);
                Spanned htmlSpan = Html.fromHtml(faq.getContent(), getter, null);
                tvFaqDetailContent.setText(htmlSpan);
            }

            @Override
            public void onFailure(Call<CMRespDto<Faq>> call, Throwable t) {
                Log.d(TAG, "onFailure: ");
            }
        });

    }
}