package com.cos.nomadapp.model.faq;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FaqCategory {
    private Long id;
    private String title;
    private List<Faq> faq;
}


