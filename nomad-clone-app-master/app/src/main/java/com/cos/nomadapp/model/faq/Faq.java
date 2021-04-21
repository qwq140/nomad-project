package com.cos.nomadapp.model.faq;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Faq {
    private Long id;
    private String title;
    private FaqCategory faqCategory;
    private String content;
}
