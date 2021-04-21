package com.cos.nomadapp.utils;

import android.util.Base64;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class JwtUtils {

    public static String payloadDecoded(String jwtEncoded) throws Exception {
        String[] split = jwtEncoded.split("\\.");
        return getJson(split[1]);
    }

    private static String getJson(String strEncoded) throws UnsupportedEncodingException {
        byte[] decodedBytes = Base64.decode(strEncoded, Base64.URL_SAFE);
        return new String(decodedBytes, "UTF-8");
    }

}
