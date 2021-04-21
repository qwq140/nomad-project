package com.cos.nomadapp.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.cos.nomadapp.R;
import com.cos.nomadapp.model.common.Item;
import com.cos.nomadapp.model.courses.Curriculum;
import com.cos.nomadapp.model.video.VideoContent;

import java.util.ArrayList;
import java.util.List;

public class VideoListAdapter extends RecyclerView.Adapter<VideoListAdapter.MyViewHolder>{

    private final List<Curriculum> curriculumList;
    private Context context;
    private long videoId;
    private String status;

    public VideoListAdapter(List<Curriculum> curriculumList, Context context, long videoId, String status) {

        this.curriculumList = curriculumList;
        this.context = context;
        this.videoId = videoId;
        this.status = status;
    }


    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        LayoutInflater inflater = (LayoutInflater) parent.getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = inflater.inflate(R.layout.curriculum_space_item,parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        List<Item> items = new ArrayList<>();
        items.add(new Item(0,curriculumList.get(position).getChapter()));
        for (int i=0; i<curriculumList.get(position).getContents().size() ; i++){
            VideoContent videoContent = curriculumList.get(position).getContents().get(i);
            items.add(new Item(1,videoContent));
        }

        LinearLayoutManager manager = new LinearLayoutManager(context, RecyclerView.VERTICAL, false);
        holder.rvCurriculumSpace.setLayoutManager(manager);
        holder.rvCurriculumSpace.setAdapter(new VideoListSpaceAdapter(items,context,videoId,status));

    }


    @Override
    public int getItemCount() {
        return curriculumList.size();
    }


    public static class MyViewHolder extends RecyclerView.ViewHolder {

        private RecyclerView rvCurriculumSpace;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            rvCurriculumSpace = itemView.findViewById(R.id.rv_curriculum_space);
        }

    }
}