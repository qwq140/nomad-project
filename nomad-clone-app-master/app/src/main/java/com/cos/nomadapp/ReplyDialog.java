package com.cos.nomadapp;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatDialogFragment;

import com.google.android.material.bottomsheet.BottomSheetDialogFragment;


public class ReplyDialog extends BottomSheetDialogFragment {

    private EditText etReply;
    private ImageView ivReplySend;

    private Context context;
    private ReplyDialogListener replyDialogListener;

    public ReplyDialog(Context context) {
        this.context = context;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.reply_item, container, false);

        etReply = view.findViewById(R.id.et_reply);
        ivReplySend = view.findViewById(R.id.iv_reply_send);

        InputMethodManager imm = (InputMethodManager) context.getSystemService(context.INPUT_METHOD_SERVICE);
        imm.showSoftInput(etReply, InputMethodManager.SHOW_IMPLICIT);


        ivReplySend.setOnClickListener(v -> {
            String message = etReply.getText().toString();
            replyDialogListener.replyText(message);
            dismiss();

        });
        return view;
    }

    public interface ReplyDialogListener{
        void replyText(String message);
    }

    public void setReplyDialogListener(ReplyDialogListener result){
        replyDialogListener = result;
    }


}
