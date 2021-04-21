package com.cos.nomadapp.model.challenge;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Challenge {
    private Long id;
    private String title;
    private Integer term;
    private Integer challengers;
}
