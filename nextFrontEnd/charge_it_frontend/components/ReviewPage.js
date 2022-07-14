import React, { useEffect, useState } from "react";
import axios from "axios";

import { Box, Text } from "@chakra-ui/react";
import ReviewForm from "./ReviewForm";
import Review from "./Review";

export const ReviewPage = ({ ssrReviews, stationId }) => {
	const [reviews, setReviews] = useState(ssrReviews);
	const [userName, setUserName] = useState("");
	const [reviewContent, setReviewContent] = useState("");

	useEffect(() => {
		axios
			.get(`http://localhost:8090/api/reviews/station/${stationId}`)
			.then((res) => setReviews(res.data));
	}, []);

	const addReview = () => {
		axios
			.post("http://localhost:8090/api/reviews/add", {
				userName,
				reviewContent,
				stationId,
			})
			.then((res) => {
				setReviews((reviews) => [...reviews, res.data]);
				setUserName("");
				setReviewContent("");
			});
	};

	return (
		<Box mb={4}>
			<Text pt={4} fontSize="5xl">
				Reviews
			</Text>
			<ReviewForm
				userName={userName}
				setUserName={setUserName}
				reviewContent={reviewContent}
				setReviewContent={setReviewContent}
				addReview={addReview}
			/>

			<Box width="100%" pl={6}>
				{reviews.map((review, index) => (
					<Review
						direction={index}
						userName={review.userName}
						reviewContent={review.reviewContent}
					/>
				))}
			</Box>
		</Box>
	);
};

export default ReviewPage;
