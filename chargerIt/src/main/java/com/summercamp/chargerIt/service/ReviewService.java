package com.summercamp.chargerIt.service;

import com.summercamp.chargerIt.dto.ReviewDto;
import com.summercamp.chargerIt.models.Review;
import com.summercamp.chargerIt.models.Station;
import com.summercamp.chargerIt.repo.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private StationService stationService;

    public Review getReviewFromDto(ReviewDto reviewDto) {
        Review review = new Review(reviewDto.getUserName(), reviewDto.getReviewContent());
        Station station = stationService.getStationById(reviewDto.getStationId());

        review.setStation(station);

        return review;
    }

    public ReviewDto getDtoFromReview(Review review) {
        ReviewDto reviewDto = new ReviewDto(review.getUserName(), review.getReviewContent(), review.getStation().getId());

        return reviewDto;
    }

    public List<ReviewDto> getReviews() {
        List<Review> reviewList = reviewRepo.findAll();
        List<ReviewDto> reviewDtoList = new ArrayList<>();

        reviewList.forEach(review -> {
            reviewDtoList.add(getDtoFromReview(review));
        });

        return reviewDtoList;
    }

    public List<ReviewDto> getREviewsByStationId(Long stationId) {
        Station station = stationService.getStationById(stationId);

        List<Review> reviewList = reviewRepo.findByStation(station);
        List<ReviewDto> reviewDtoList = new ArrayList<>();

        reviewList.forEach(review -> {
            reviewDtoList.add(getDtoFromReview(review));
        });

        return reviewDtoList;
    }

    public Review addReview(ReviewDto reviewDto) {
        Review review = getReviewFromDto(reviewDto);

        reviewRepo.save(review);

        return review;
    }
}
