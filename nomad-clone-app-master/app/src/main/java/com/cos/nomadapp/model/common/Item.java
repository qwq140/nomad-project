package com.cos.nomadapp.model.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    private int type;
    private Object object;

    public Item(int type) {
        this.type=type;
    }
}
