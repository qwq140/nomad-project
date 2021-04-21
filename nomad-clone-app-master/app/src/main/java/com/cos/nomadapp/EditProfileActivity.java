package com.cos.nomadapp;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;

import android.content.ContentUris;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.util.Base64;
import android.util.Log;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.internal.http.multipart.MultipartEntity;
import com.bumptech.glide.Glide;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.user.LoginDto;
import com.cos.nomadapp.model.user.User;
import com.cos.nomadapp.model.user.UserUpdateReqDto;
import com.cos.nomadapp.service.NomadApi;
import com.cos.nomadapp.service.OAuthApi;
import com.cos.nomadapp.utils.JwtUtils;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.Gson;
import com.makeramen.roundedimageview.RoundedImageView;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import lombok.SneakyThrows;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.Request;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EditProfileActivity extends AppCompatActivity {

    private static final String TAG = "EditProfileActivity";

    private RoundedImageView ivProfileImg;
    private ImageView ivBack;
    private TextView tvToolbarTitle;
    private SharedPreferences pref;
    private TextInputEditText tfEditName;
    private Button btnEditProfileSave, btnAccountDelete, btnImageSave;
    private AppCompatButton btnChoosePhoto;
    private CheckBox checkDelete;

    private NomadApi nomadApi = NomadApi.retrofit.create(NomadApi.class);

    private User principal;
    private String token;
    private JSONObject payloadObj;

    private File file;
    private Bitmap bitmap;
    private Uri path;

    private LoginDto loginDto;
    private Context mContext;
    private long id;

    @SneakyThrows
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_profile);

        mContext = getApplicationContext();

        loadPref();

        init();


        btnEditProfileSave.setOnClickListener(v -> {

            UserUpdateReqDto userUpdateReqDto = new UserUpdateReqDto();
            userUpdateReqDto.setName(tfEditName.getText().toString());

            Call<CMRespDto> call = nomadApi.profileUpdate("Bearer " + token, id, userUpdateReqDto);
            call.enqueue(new Callback<CMRespDto>() {
                @Override
                public void onResponse(Call<CMRespDto> call, Response<CMRespDto> response) {
                    Log.d(TAG, "onResponse: 수정 성공 : " + response.body());
                }

                @Override
                public void onFailure(Call<CMRespDto> call, Throwable t) {
                    Log.d(TAG, "onFailure: 수정 실패");
                }
            });

        });

        checkDelete = findViewById(R.id.check_delete);
        btnAccountDelete = findViewById(R.id.btn_account_delete);
        checkDelete.setOnClickListener(v -> {
            if (checkDelete.isChecked()){
                btnAccountDelete.setEnabled(true);
                btnAccountDelete.setBackgroundColor(Color.parseColor("#f04f4f"));
            } else {
                btnAccountDelete.setEnabled(false);
                btnAccountDelete.setBackgroundColor(Color.parseColor("#f7b8b3"));
            }
        });


        btnAccountDelete.setOnClickListener(v -> {
            Call<CMRespDto> call = nomadApi.userDelete("Bearer " + token, id);
            call.enqueue(new Callback<CMRespDto>() {
                @Override
                public void onResponse(Call<CMRespDto> call, Response<CMRespDto> response) {
                    Log.d(TAG, "onResponse: 삭제 성공 : " + response.body());
                    SharedPreferences.Editor editor = pref.edit();
                    editor.putString("token", "");
                    editor.commit();
                    Intent intent = new Intent(mContext, LoginActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                    startActivity(intent);
                }

                @Override
                public void onFailure(Call<CMRespDto> call, Throwable t) {
                    Log.d(TAG, "onFailure: 삭제 실패");
                }
            });
        });


        btnChoosePhoto.setOnClickListener(v -> {
            Intent intent = new Intent();
            intent.setType("image/*");
            intent.setAction(Intent.ACTION_GET_CONTENT);
            startActivityForResult(intent, 1);
        });

        // 이미지 업로드 (잘모르겠음)
        btnImageSave.setOnClickListener(v -> {
            Log.d(TAG, "onActivityResult: 세이브버튼");
            RequestBody requestFile =
                    RequestBody.create(MediaType.parse(getContentResolver().getType(path)), file);
            MultipartBody.Part uploadFile =
                    MultipartBody.Part.createFormData("uploadFile", file.getName(), requestFile);
            Log.i("test", "insertPromote: "+ file.getName());
            Log.i("test", "insertPromote: "+ requestFile.contentType());
            Log.i("test", "insertPromote: "+ uploadFile.body());


            Call<CMRespDto> call = nomadApi.postImage("Bearer " + token, uploadFile);
            call.enqueue(new Callback<CMRespDto>() {
                @Override
                public void onResponse(Call<CMRespDto> call, Response<CMRespDto> response) {
                    Log.d(TAG, "onResponse: 성공" + response.body());
                }

                @Override
                public void onFailure(Call<CMRespDto> call, Throwable t) {
                    Log.d(TAG, "onFailure: 실패");
                }
            });
        });

    }

    // sharedPreference에 저장된 토큰, principal 불러오기
    private void loadPref() throws Exception {
        pref = getSharedPreferences("pref", MODE_PRIVATE);
        token = pref.getString("token", "");
        String loginDtoJson = pref.getString("user","");
        Gson gson = new Gson();
        loginDto = gson.fromJson(loginDtoJson, LoginDto.class);
        id = loginDto.getId();
    }

    private void init(){
        ivBack = findViewById(R.id.iv_back);
        tvToolbarTitle = findViewById(R.id.tv_toolbar_title);
        tfEditName = findViewById(R.id.tf_edit_name);
        btnEditProfileSave = findViewById(R.id.btn_edit_profile_save);
        ivProfileImg = findViewById(R.id.iv_profile_img);
        btnChoosePhoto = findViewById(R.id.btn_choose_photo);
        btnImageSave = findViewById(R.id.btn_image_save);

        // 툴바 title text 설정
        tvToolbarTitle.setText("Edit Profile");

        // 뒤로가기 버튼
        ivBack.setOnClickListener(v -> {
            finish();
        });

        Intent intent = getIntent();
        principal = (User)intent.getSerializableExtra("principal");

        tfEditName.setText(principal.getName());

        Glide
                .with(mContext)
                .load(principal.getImageUrl())
                .centerCrop()
                .placeholder(R.drawable.test)
                .into(ivProfileImg);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 1) {
            if (resultCode == RESULT_OK) {
                try {
                    //선택한 이미지에서 비트맵 생성
                    Log.d(TAG, "onActivityResult: data : "+data.getData());
                    path = data.getData();

                    bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(),path);
                    ivProfileImg.setImageBitmap(bitmap);
                    Log.d(TAG, "onActivityResult: Uri"+path);
                    file = new File(getFilePathFromURI(mContext,path));


                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static String getFilePathFromURI(Context context, Uri contentUri) {
        String fileName = getFileName(contentUri);
        if (!TextUtils.isEmpty(fileName)) {
            File copyFile = new File(context.getFilesDir()+ File.separator + fileName);
            copy(context, contentUri, copyFile);
            return copyFile.getAbsolutePath();
        }
        return null;
    }

    public static String getFileName(Uri uri) {
        if (uri == null) return null;
        String fileName = null;
        String path = uri.getPath();
        int cut = path.lastIndexOf('/');
        if (cut != -1) {
            fileName = path.substring(cut + 1);
        }
        return fileName;
    }

    public static void copy(Context context, Uri srcUri, File dstFile) {
        try {
            InputStream inputStream = context.getContentResolver().openInputStream(srcUri);
            if (inputStream == null) return;
            OutputStream outputStream = new FileOutputStream(dstFile);
            IOUtils.copy(inputStream, outputStream);
            inputStream.close();
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}