package com.cos.nomadapp.model.courses;

import android.os.Parcel;
import android.os.Parcelable;

import com.thoughtbot.expandablerecyclerview.models.ExpandableGroup;

import java.util.List;

public class CourseFaqContent implements Parcelable {
    public final String content;

    public CourseFaqContent(String content) {
        this.content = content;
    }

    protected CourseFaqContent(Parcel in) {
        content = in.readString();
    }

    public static final Creator<CourseFaqContent> CREATOR = new Creator<CourseFaqContent>() {
        @Override
        public CourseFaqContent createFromParcel(Parcel in) {
            return new CourseFaqContent(in);
        }

        @Override
        public CourseFaqContent[] newArray(int size) {
            return new CourseFaqContent[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(content);

    }
}
