package com.cos.nomadapp.adapter;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.cos.nomadapp.R;
import com.cos.nomadapp.model.tech.Tech;
import com.makeramen.roundedimageview.RoundedImageView;

import java.util.List;

import lombok.NonNull;

public class TechDashAdapter extends RecyclerView.Adapter<TechDashAdapter.MyViewHolder>{

    private static final String TAG = "UserAdapter";

    private final List<Tech> teches;
    private final Context mContext;

    public TechDashAdapter(List<Tech> teches, Context mContext) {
        this.teches = teches;
        this.mContext = mContext;
    }


    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        Log.d(TAG, "onCreateViewHolder: ");
        LayoutInflater inflater = (LayoutInflater) parent.getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = inflater.inflate(R.layout.tech_item,parent, false);
        return new MyViewHolder(view); // view가 리스트뷰에 하나 그려짐
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        Log.d(TAG, "onBindViewHolder: ");
        holder.setItem(teches.get(position));
    }

    @Override
    public int getItemCount() {
        return teches.size();
    }


    public class MyViewHolder extends RecyclerView.ViewHolder {

        private RoundedImageView ivDashboardTech;
        private ImageView ivTechLock;
        private TextView tvTechName;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            ivDashboardTech = itemView.findViewById(R.id.iv_dashboard_tech);
            ivTechLock = itemView.findViewById(R.id.iv_tech_lock);
            tvTechName = itemView.findViewById(R.id.tv_tech_name);

        }

        public void setItem(Tech tech){
            Glide
                    .with(mContext)
                    .load(tech.getFile().getFileUrl())
                    .centerCrop()
                    .placeholder(R.drawable.ic_js)
                    .into(ivDashboardTech);

            Drawable alpha = ivDashboardTech.getDrawable();
            alpha.setAlpha(50);

            tvTechName.setText(tech.getTitle());

        }
    }
}