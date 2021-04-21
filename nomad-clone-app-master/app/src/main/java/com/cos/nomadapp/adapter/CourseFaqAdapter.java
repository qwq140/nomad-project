package com.cos.nomadapp.adapter;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.cos.nomadapp.R;
import com.cos.nomadapp.model.courses.CourseFaqContent;
import com.cos.nomadapp.model.courses.CourseFaqTitle;
import com.thoughtbot.expandablerecyclerview.ExpandableRecyclerViewAdapter;
import com.thoughtbot.expandablerecyclerview.models.ExpandableGroup;
import com.thoughtbot.expandablerecyclerview.viewholders.ChildViewHolder;
import com.thoughtbot.expandablerecyclerview.viewholders.GroupViewHolder;

import java.util.List;

public class CourseFaqAdapter extends ExpandableRecyclerViewAdapter<CourseFaqAdapter.FaqTitleViewHolder, CourseFaqAdapter.FaqContentViewHolder> {

    private static final String TAG = "CourseFaqAdapter";
    
    
    public CourseFaqAdapter(List<? extends ExpandableGroup> groups) {
        super(groups);
    }

    @Override
    public FaqTitleViewHolder onCreateGroupViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.course_parent_faq,parent,false);
        return new FaqTitleViewHolder(v);
    }

    @Override
    public FaqContentViewHolder onCreateChildViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.course_child_faq,parent,false);
        return new FaqContentViewHolder(v);
    }

    @Override
    public void onBindChildViewHolder(FaqContentViewHolder holder, int flatPosition, ExpandableGroup group, int childIndex) {
        final CourseFaqContent courseFaqContent = (CourseFaqContent) group.getItems().get(childIndex);
        holder.setItem(courseFaqContent);
    }

    @Override
    public void onBindGroupViewHolder(FaqTitleViewHolder holder, int flatPosition, ExpandableGroup group) {
        final CourseFaqTitle courseFaqTitle = (CourseFaqTitle) group;
        holder.setItem(courseFaqTitle);


    }

    public static class FaqTitleViewHolder extends GroupViewHolder {

        private TextView tvTitle;

        public FaqTitleViewHolder(View itemView) {
            super(itemView);
            tvTitle = itemView.findViewById(R.id.tv_course_parent_faq);
        }

        public void setItem(CourseFaqTitle courseFaqTitle){
            tvTitle.setText(courseFaqTitle.getTitle());
            Log.d(TAG, "setItem: "+courseFaqTitle.getTitle());
        }
    }

    public class FaqContentViewHolder extends ChildViewHolder {
        private TextView tvContent;

        public FaqContentViewHolder(View itemView) {
            super(itemView);
            tvContent = itemView.findViewById(R.id.tv_course_child_faq);
        }

        public void setItem(CourseFaqContent courseFaqContent){
            tvContent.setText(courseFaqContent.content);
            Log.d(TAG, "setItem: "+courseFaqContent.content);
        }
    }

}


