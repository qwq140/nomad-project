package com.cos.nomadapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.AppCompatButton;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.community.CReply;
import com.cos.nomadapp.model.community.CReplySaveReqDto;
import com.cos.nomadapp.model.video.VideoContent;
import com.cos.nomadapp.model.video.VideoReply;
import com.cos.nomadapp.model.video.dto.VideoReplySaveReqDto;
import com.cos.nomadapp.service.NomadApi;

import java.util.HashMap;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class VideoDetailFragment extends Fragment{

    private static final String TAG = "VideoDetailFragment";

    private WebView videoView;
    private RecyclerView rvVideoReply;
    private Context context;
    private AppCompatButton btnVreply;

    private ImageView ivSendReply;
    private RelativeLayout replyBar;
    private boolean isReady=false;  //edittext열고 닫기 댓글쓰면 사라짐
    private EditText etReply;
    private TextView tvVideoTitle;

    private SharedPreferences pref;
    private String token;

    private VideoContent videoContent;
    private String reply;

    private LinearLayout videoLayout;

    private String replyContent;

    private AppCompatButton btnShow;
    private long videoId;


    public VideoDetailFragment(long videoId,VideoContent videoContent) {
        this.videoContent = videoContent;
        this.videoId = videoId;
    }

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

        //videoView.loadUrl("https://player.vimeo.com/video/532360991");


        // 댓글
//        rvVideoReply = view.findViewById(R.id.rv_video_reply);
//        LinearLayoutManager manager = new LinearLayoutManager(context, RecyclerView.VERTICAL, false);
//        rvVideoReply.setLayoutManager(manager);
//
//        btnShow = ((VideoActivity)context).findViewById(R.id.btn_show);

//        btnVreply = view.findViewById(R.id.btn_vrepley);
//        btnVreply.setOnClickListener(v -> {
//            //showReplyInput();
//            openReply();
//        });
//        btnShow.setCompoundDrawablesWithIntrinsicBounds(R.drawable.ic_baseline_info_24,0,0,0);
//        btnShow.setText("   Show Sidebar");

//        ((VideoActivity)context).isShow = false;

        return view;
    }


//    private void openReply(){
//        ReplyDialog replyDialog = new ReplyDialog(context);
//        replyDialog.show(getActivity().getSupportFragmentManager(),"reply");
//        replyDialog.setReplyDialogListener(new ReplyDialog.ReplyDialogListener() {
//            @Override
//            public void replyText(String message) {
//                sendReply(message);
//            }
//        });
//    }

    private void sendReply(String message){
//        Log.d(TAG, "sendReply: "+message);
//        pref = context.getSharedPreferences("pref",Context.MODE_PRIVATE);
//        token = pref.getString("token","");
//
//        VideoReplySaveReqDto videoReplySaveReqDto =new VideoReplySaveReqDto();
//        videoReplySaveReqDto.setContent(etReply.getText().toString());
//
//
//        NomadApi nomadApi = NomadApi.retrofit.create(NomadApi.class);
//        Call<CMRespDto<VideoReply>> call = nomadApi.videoReplySave("Bearer "+token,videoReplySaveReqDto);
//        call.enqueue(new Callback<CMRespDto<VideoReply>>() {
//            @Override
//            public void onResponse(Call<CMRespDto<VideoReply>> call, Response<CMRespDto<VideoReply>> response) {
//                Log.d(TAG, "onResponse: test123 : "+response.body());
//            }
//
//            @Override
//            public void onFailure(Call<CMRespDto<VideoReply>> call, Throwable t) {
//                Log.d(TAG, "onFailure: ");
//            }
//        });
    }

}
