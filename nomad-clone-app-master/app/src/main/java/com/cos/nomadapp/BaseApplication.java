package com.cos.nomadapp;

import android.app.Application;

import com.iamport.sdk.domain.core.Iamport;
import com.zoyi.channel.plugin.android.ChannelIO;

public class BaseApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Iamport.INSTANCE.create(this);
        ChannelIO.initialize(this);
    }
}
