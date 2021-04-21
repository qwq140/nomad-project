package com.cos.nomadapp.model.courses;

import android.os.Parcel;
import android.os.Parcelable;

import com.thoughtbot.expandablerecyclerview.models.ExpandableGroup;

import java.util.List;

public class CourseFaqTitle extends ExpandableGroup<CourseFaqContent> {

    public CourseFaqTitle(String title, List<CourseFaqContent> items) {
        super(title, items);
    }
}
