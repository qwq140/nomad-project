package com.cos.nomadapp.adapter;


import android.content.Context;
import android.content.Intent;
import android.util.Log;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;


import com.cos.nomadapp.FaqDetailActivity;
import com.cos.nomadapp.model.faq.FaqGubun;
import com.cos.nomadapp.model.faq.FaqItem;

import com.cos.nomadapp.R;
import com.thoughtbot.expandablerecyclerview.ExpandableRecyclerViewAdapter;
import com.thoughtbot.expandablerecyclerview.models.ExpandableGroup;
import com.thoughtbot.expandablerecyclerview.viewholders.ChildViewHolder;
import com.thoughtbot.expandablerecyclerview.viewholders.GroupViewHolder;

import java.util.List;


public class FaqAdapter extends ExpandableRecyclerViewAdapter<FaqAdapter.FaqGubunViewHolder, FaqAdapter.FaqItemViewHolder> {

    private static final String TAG = "FaqAdapter";
    private Context mContext;

    public FaqAdapter(List<? extends ExpandableGroup> groups, Context mContext) {
        super(groups);
        this.mContext=mContext;
    }


    @Override
    public FaqGubunViewHolder onCreateGroupViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.faq_item,parent,false);
        return new FaqGubunViewHolder(view);
    }

    @Override
    public FaqItemViewHolder onCreateChildViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.faq_expand_item,parent,false);
        return new FaqItemViewHolder(view);
    }

    @Override
    public void onBindChildViewHolder(FaqItemViewHolder holder, int flatPosition, ExpandableGroup group, int childIndex) {
        final FaqItem faqItem = (FaqItem) group.getItems().get(childIndex);
        holder.setItem(faqItem);
        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(mContext, FaqDetailActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            Log.d(TAG, "onBindChildViewHolder: "+faqItem);
            intent.putExtra("faqItem",faqItem.getId());
            mContext.startActivity(intent);
        });

    }

    @Override
    public void onBindGroupViewHolder(FaqGubunViewHolder holder, int flatPosition, ExpandableGroup group) {
        final FaqGubun faqGubun = (FaqGubun) group;
        holder.setItem(faqGubun);
    }

    public class FaqGubunViewHolder extends GroupViewHolder {

        private static final String TAG = "FaqGubunViewHolder";
        private TextView tvFaqTitle;

        public FaqGubunViewHolder(View itemView) {
            super(itemView);

            tvFaqTitle = itemView.findViewById(R.id.tv_faq_title);
        }

        public void setItem(FaqGubun faqGubun){

            tvFaqTitle.setText(faqGubun.getTitle());
            Log.d(TAG, "bind: "+ faqGubun.getTitle());

        }
    }

    public class FaqItemViewHolder extends ChildViewHolder {

        private TextView tvFaqItem;

        public FaqItemViewHolder(View itemView) {
            super(itemView);
            tvFaqItem = itemView.findViewById(R.id.tv_faq_expand_item);

        }

        public void setItem(FaqItem faqItem){
            tvFaqItem.setText(faqItem.getName());
            Log.d(TAG, "bind: "+faqItem);
        }
    }
}
