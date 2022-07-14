package com.summercamp.chargerIt.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @Getter @Setter

public class ReviewDto {
    private String userName;
    private String reviewContent;
    private Long stationId;

    public ReviewDto(String userName, String reviewContent, Long stationId) {
        this.userName = userName;
        this.reviewContent = reviewContent;
        this.stationId = stationId;
    }
}
