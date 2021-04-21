package com.cos.nomadapp.adapter;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.cos.nomadapp.PaymentActivity;
import com.cos.nomadapp.R;
import com.cos.nomadapp.VideoActivity;
import com.cos.nomadapp.model.common.Item;
import com.cos.nomadapp.model.video.VideoContent;
import com.cos.nomadapp.ui.courses.CourseDetailActivity;

import java.util.List;

public class CurriculumSpaceAdapter extends  RecyclerView.Adapter<RecyclerView.ViewHolder>{

    private static final String TAG = "CurriculumSpaceAdapter";
    private List<Item> items;
    private Context context;
    private long videoId;
    private String status;

    public CurriculumSpaceAdapter(List<Item> items, Context context, long videoId, String status) {
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
            String chapter = (String) items.get(position).getObject();
            ((ChapterViewHolder) holder).setItem(chapter);
        }else if(getItemViewType(position)==1){
            if (position%2!=0){
                ((ContentViewHolder)holder).layoutCurriculumContent.setBackgroundColor(Color.parseColor("#f9fafb"));
            }
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
        private LinearLayout layoutCurriculumContent;


        public ContentViewHolder(@NonNull View itemView) {
            super(itemView);
            tvCurriculumContent = itemView.findViewById(R.id.tv_curriculum_content);
            layoutCurriculumContent = itemView.findViewById(R.id.layout_curriculum_content);
        }

        void setItem(VideoContent videoContent){
            tvCurriculumContent.setText(videoContent.getTitle());
            Log.d(TAG, "setItem: "+videoContent.isFree());
            if (status.equals("paid")){
                tvCurriculumContent.setOnClickListener(v -> {
                    Log.d(TAG, "setItem: 커리큘럼 클릭");
                    Log.d(TAG, "setItem: "+videoContent.isFree());
                    Intent intent = new Intent(context, VideoActivity.class);
                    intent.putExtra("videoContent",videoContent);
                    intent.putExtra("videoId", videoId);
                    intent.putExtra("status",status);
                    intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                    context.startActivity(intent);
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
                        Intent intent = new Intent(context, VideoActivity.class);
                        intent.putExtra("videoContent",videoContent);
                        intent.putExtra("videoId", videoId);
                        intent.putExtra("status",status);
                        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        context.startActivity(intent);
                    });
                }
            }

        }
    }

}