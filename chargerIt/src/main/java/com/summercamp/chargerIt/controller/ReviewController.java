package com.summercamp.chargerIt.controller;

import com.summercamp.chargerIt.dto.ReviewDto;
import com.summercamp.chargerIt.models.Review;
import com.summercamp.chargerIt.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping()
    public List<ReviewDto> getReviews() {
        return reviewService.getReviews();
    }

    @GetMapping("/station/{stationId}")
    public List<ReviewDto> getReviewByStationId(@PathVariable Long stationId) {
        return reviewService.getREviewsByStationId(stationId);
    }

    @PostMapping("/add")
    public Review addReview(@RequestBody ReviewDto newReviewDto) {
        return reviewService.addReview(newReviewDto);
    }
}
