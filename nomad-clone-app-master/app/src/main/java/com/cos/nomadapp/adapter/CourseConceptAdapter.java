package com.cos.nomadapp.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.cos.nomadapp.R;
import com.cos.nomadapp.model.courses.Concept;

import java.util.List;
import java.util.Map;

public class CourseConceptAdapter extends RecyclerView.Adapter<CourseConceptAdapter.MyViewHolder>{

    private final List<Map<String,Object>> concepts;
    private final Context context;

    public CourseConceptAdapter(List<Map<String,Object>> concepts, Context context) {

        this.concepts = concepts;
        this.context = context;
    }


    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        LayoutInflater inflater = (LayoutInflater) parent.getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = inflater.inflate(R.layout.course_detail_concept,parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        holder.setItem(concepts.get(position));

    }


    @Override
    public int getItemCount() {
        return concepts.size();
    }


    public static class MyViewHolder extends RecyclerView.ViewHolder {

        private TextView tvConceptContent;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            tvConceptContent = itemView.findViewById(R.id.tv_concept_content);
        }

        public void setItem(Map<String, Object> concept){
            tvConceptContent.setText(concept.get("content").toString());

        }
    }
}