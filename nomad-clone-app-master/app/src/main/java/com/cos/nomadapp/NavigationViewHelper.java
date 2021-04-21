package com.cos.nomadapp;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.Gravity;

import androidx.drawerlayout.widget.DrawerLayout;

import com.cos.nomadapp.ui.challenges.ChallengesActivity;
import com.cos.nomadapp.ui.community.CommunityActivity;
import com.cos.nomadapp.ui.courses.CoursesActivity;
import com.cos.nomadapp.ui.faq.FaqActivity;
import com.google.android.material.navigation.NavigationView;

public class NavigationViewHelper {

    private static final String TAG = "NavigationViewHelper";

    public static void enable(Context context, NavigationView view) {
        view.setNavigationItemSelectedListener(item -> {
            int id = item.getItemId();

            DrawerLayout drawer = (DrawerLayout)((Activity) context).findViewById(R.id.drawer);


            if (id == R.id.login) {
                Log.d(TAG, "enable: Login 클릭");
                Intent intent = new Intent(context, LoginActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                context.startActivity(intent);
            } else if(id == R.id.dashboard){
                Log.d(TAG, "enable: dashboard 클릭");
                Intent intent = new Intent(context, UserDashboardActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                context.startActivity(intent);
            }else if (id == R.id.courses) {
                Log.d(TAG, "enable: Courses 클릭");
                Intent intent = new Intent(context, CoursesActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                context.startActivity(intent);
            } else if (id == R.id.community) {
                Log.d(TAG, "enable: Community 클릭");
                Intent intent = new Intent(context, CommunityActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                context.startActivity(intent);
            } else if (id == R.id.faq) {
                Log.d(TAG, "enable: FAQ 클릭");
                Intent intent = new Intent(context, FaqActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                context.startActivity(intent);
            }
            drawer.closeDrawer(Gravity.LEFT);
            return false;
        });
    }

}
