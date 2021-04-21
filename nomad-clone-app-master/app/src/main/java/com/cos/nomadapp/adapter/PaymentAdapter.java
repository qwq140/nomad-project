package com.cos.nomadapp.adapter;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.cos.nomadapp.R;
import com.cos.nomadapp.model.pay.Pay;

import java.text.SimpleDateFormat;
import java.util.List;

public class PaymentAdapter extends RecyclerView.Adapter<PaymentAdapter.ViewHolder> {

    private Context mContext;
    private List<Pay> pays;

    public PaymentAdapter(Context mContext, List<Pay> pays) {
        this.mContext = mContext;
        this.pays = pays;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(mContext).inflate(R.layout.payment_history_item,parent,false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Pay pay = pays.get(position);
        if (position%2==0){
            holder.layoutHistoryItem.setBackgroundColor(Color.parseColor("#f9fafb"));
        }
        holder.setItem(pay);
    }

    @Override
    public int getItemCount() {
        return pays.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder{
        private TextView tvPaymentName, tvPaymentPrice, tvPaymentDate;
        private LinearLayout layoutHistoryItem;



        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvPaymentName = itemView.findViewById(R.id.tv_payment_name);
            tvPaymentPrice = itemView.findViewById(R.id.tv_payment_price);
            tvPaymentDate = itemView.findViewById(R.id.tv_payment_date);
            layoutHistoryItem = itemView.findViewById(R.id.layout_history_item);
        }

        public void setItem(Pay pay){
            tvPaymentName.setText(pay.getCourse().getTitle());
            tvPaymentPrice.setText(Integer.toString(pay.getPaid_amount())+"원");

            SimpleDateFormat dateFormat = new SimpleDateFormat("yy.MM.dd HH:mm");
            String paymentTime = dateFormat.format(pay.getCreateDate());
            tvPaymentDate.setText(paymentTime);
        }
    }
}
