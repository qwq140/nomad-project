package com.cos.nomadapp.model.pay;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FreeSaveReqDto {
    private String name;
    private Long courseId;
    private int paid_amount;
}
