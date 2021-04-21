package com.cos.nomadapp;

import android.content.Intent;
import android.net.Uri;
import android.view.View;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.cos.nomadapp.ui.challenges.ChallengesActivity;
import com.cos.nomadapp.ui.community.CommunityActivity;
import com.cos.nomadapp.ui.courses.CoursesActivity;
import com.cos.nomadapp.ui.faq.FaqActivity;

import info.androidhive.fontawesome.FontTextView;

public class FooterViewHolder extends RecyclerView.ViewHolder {
    //footer
    private TextView tvRoadMap,tvCourses,tvCommunity,tvFaq,tvChallenges,tvServiceTerm,tvPrivacyPolicy,tvCancleOrRefundPolicy;
    private FontTextView ftvYoutube, ftvGithub, ftvFacebook, ftvInsta;
    public FooterViewHolder(@NonNull View itemView) {
        super(itemView);
        //footer
        tvCourses=itemView.findViewById(R.id.tv_courses);
        tvChallenges=itemView.findViewById(R.id.tv_challenges);
        tvFaq=itemView.findViewById(R.id.tv_faq);
        tvRoadMap=itemView.findViewById(R.id.tv_roadmap);
        tvCommunity=itemView.findViewById(R.id.tv_community);
        tvServiceTerm=itemView.findViewById(R.id.tv_service_term);
        tvPrivacyPolicy=itemView.findViewById(R.id.tv_privacy_policy);
        tvCancleOrRefundPolicy=itemView.findViewById(R.id.tv_cancle_or_refund_policy);
        ftvInsta=itemView.findViewById(R.id.ftv_insta);
        ftvYoutube=itemView.findViewById(R.id.ftv_youtube);
        ftvFacebook=itemView.findViewById(R.id.ftv_facebook);
        ftvGithub=itemView.findViewById(R.id.ftv_github);

        tvCommunity.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), CommunityActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvCourses.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), CoursesActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvChallenges.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), ChallengesActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvRoadMap.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvFaq.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), FaqActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvServiceTerm.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), ServiceTermActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvPrivacyPolicy.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), PrivacyPolicyActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        tvCancleOrRefundPolicy.setOnClickListener(v->{
            Intent intent = new Intent(v.getContext(), CancleOrRefundPolicyActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        ftvInsta.setOnClickListener(v->{
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/nomad_coders/"));
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        ftvYoutube.setOnClickListener(v->{
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://www.youtube.com/channel/UCUpJs89fSBXNolQGOYKn0YQ"));
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        ftvFacebook.setOnClickListener(v->{
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://www.facebook.com/nomadcoders"));
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });
        ftvGithub.setOnClickListener(v->{
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/serranoarevalo"));
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            v.getContext().startActivity(intent);
        });

    }

}
