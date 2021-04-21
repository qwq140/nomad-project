package com.cos.nomadapp.ui.community;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.cos.nomadapp.R;
import com.cos.nomadapp.adapter.CommunityAdapter;
import com.cos.nomadapp.model.CMRespDto;
import com.cos.nomadapp.model.community.CommunityListRespDto;
import com.cos.nomadapp.service.NomadApi;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.button.MaterialButtonToggleGroup;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommunityFragAll extends Fragment {

    private RecyclerView rvCommunityNew;
    private Context mContext;
    private static final String TAG = "CommunityFragAll";
    private List<CommunityListRespDto> communities = new ArrayList<>();
    private CommunityAdapter communityAdapter;
    private String token,sort;
    private Long categoryId;
    private MaterialButtonToggleGroup materialButtonToggleGroup;
    private int page;
    private LinearLayoutManager manager;
    private NomadApi nomadApi;
    private ProgressBar progressBar;
    public CommunityFragAll(String sort,String token,long categoryId){
        this.sort=sort;
        this.token=token;
        this.categoryId=categoryId;
    }
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.community_frag_all, container, false);

        mContext = container.getContext();
        //토글 그룹
        materialButtonToggleGroup = view.findViewById(R.id.btg_order_community);
        int buttonId = materialButtonToggleGroup.getCheckedButtonId();
        MaterialButton button = materialButtonToggleGroup.findViewById(buttonId);

        progressBar = view.findViewById(R.id.progressbar);
        progressBar.setVisibility(View.INVISIBLE);

        manager = new LinearLayoutManager(getActivity(), RecyclerView.VERTICAL, false);
        rvCommunityNew = view.findViewById(R.id.rv_community_all);

        addFrag();
        buttonListener();
        initScrollListener();
        return view;
    }
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
}