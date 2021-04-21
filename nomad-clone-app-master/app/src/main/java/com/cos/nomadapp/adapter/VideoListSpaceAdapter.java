package com.cos.nomadapp.adapter;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.widget.AppCompatButton;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.cos.nomadapp.R;
import com.cos.nomadapp.VideoActivity;
import com.cos.nomadapp.VideoDetailFragment;
import com.cos.nomadapp.model.common.Item;
import com.cos.nomadapp.model.video.VideoContent;

import java.util.List;

public class VideoListSpaceAdapter extends  RecyclerView.Adapter<RecyclerView.ViewHolder>{

    private static final String TAG = "CurriculumSpaceAdapter";
    private List<Item> items;
    private Context context;
    private long videoId;
    private String status;

    public VideoListSpaceAdapter(List<Item> items, Context context, long videoId, String status) {
        this.items = items;
        this.context = context;
        this.videoId = videoId;
        this.status = status;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        if(viewType == 0){
            return new ChapterViewHolder(
                    LayoutInflater.from(parent.getContext()).inflate(
                            R.layout.curriculum_chapter_item,
                            parent,
                            false
                    )
            );
        }else{
            return new ContentViewHolder(
                    LayoutInflater.from(parent.getContext()).inflate(
                            R.layout.curriculum_content_item,
                            parent,
                            false
                    )
            );
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if(getItemViewType(position)==0){
            String chapter = (String)items.get(position).getObject();
            ((ChapterViewHolder) holder).setItem(chapter);
        }else if(getItemViewType(position)==1){
            VideoContent videoContent = (VideoContent) items.get(position).getObject();
            ((ContentViewHolder) holder).setItem(videoContent);
        }
    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    @Override
    public int getItemViewType(int position) {
        return items.get(position).getType();
    }

    public class ChapterViewHolder extends RecyclerView.ViewHolder{

        private TextView tvChapter;

        public ChapterViewHolder(@NonNull View itemView) {
            super(itemView);
            tvChapter = itemView.findViewById(R.id.tv_chapter);
        }

        void setItem(String chapter){
            tvChapter.setText(chapter);
        }
    }

    public class ContentViewHolder extends RecyclerView.ViewHolder{

        private TextView tvCurriculumContent;
//        private AppCompatButton btnShow;

        public ContentViewHolder(@NonNull View itemView) {
            super(itemView);
            tvCurriculumContent = itemView.findViewById(R.id.tv_curriculum_content);
//            btnShow = ((VideoActivity)context).findViewById(R.id.btn_show);
        }

        void setItem(VideoContent videoContent){
            tvCurriculumContent.setText(videoContent.getTitle());
            Log.d(TAG, "setItem: "+videoContent.isFree());
            if (status.equals("paid")){
                tvCurriculumContent.setOnClickListener(v -> {
                    Log.d(TAG, "setItem: 커리큘럼 클릭");
                    Log.d(TAG, "setItem: "+videoContent.isFree());
                    Fragment videoDetailFragment = new VideoDetailFragment(videoId,videoContent);
                    ((FragmentActivity)context).getSupportFragmentManager().beginTransaction().replace(R.id.video_container, videoDetailFragment).commit();

                });
            } else {
                if (videoContent.isFree()==false){
                    tvCurriculumContent.setTextColor(Color.parseColor("#cdd1d7"));
                    tvCurriculumContent.setClickable(false);
                    tvCurriculumContent.setCompoundDrawablesWithIntrinsicBounds(0,0,R.drawable.ic_lock,0);
                } else {
                    tvCurriculumContent.setOnClickListener(v -> {
                        Log.d(TAG, "setItem: 커리큘럼 클릭");
                        Log.d(TAG, "setItem: "+videoContent.isFree());
                        Fragment videoDetailFragment = new VideoDetailFragment(videoId,videoContent);
                        ((FragmentActivity)context).getSupportFragmentManager().beginTransaction().replace(R.id.video_container, videoDetailFragment).commit();

                    });
                }
            }


        }
    }

}