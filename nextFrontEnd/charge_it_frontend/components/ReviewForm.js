import React, { useState } from "react";

import {
	FormControl,
	FormLabel,
	Input,
	Text,
	Container,
	Textarea,
	Button,
	Box,
	HStack,
	FormErrorMessage,
} from "@chakra-ui/react";

const ReviewForm = ({
	userName,
	setUserName,
	reviewContent,
	setReviewContent,
	addReview,
}) => {
	const [userNameError, setUserNameError] = useState(false);
	const [reviewContentError, setReviewContentError] = useState(false);

	const validateForm = () => {
		setUserNameError(userName == "" ? true : false);
		setReviewContentError(reviewContent == "" ? true : false);

		if (!(userName == "" || reviewContent == "")) addReview();
	};

	return (
		<Box p={1} mb={2} borderColor="gray.100" border="1px" borderRadius={10}>
			<Container maxW="100%">
				<FormControl pt={4} isInvalid={userNameError} isRequired="true">
					<FormLabel>Name</FormLabel>
					<Input
						width={250}
						placeholder="Type here..."
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
					<FormErrorMessage>Name is required</FormErrorMessage>
				</FormControl>

				<FormControl
					pt={4}
					isInvalid={reviewContentError}
					isRequired="true"
				>
					<Textarea
						placeholder="Type your review here..."
						value={reviewContent}
						onChange={(e) => setReviewContent(e.target.value)}
					/>
					<FormErrorMessage>A message is required</FormErrorMessage>
				</FormControl>

				<Box width="100%" align="right">
					<Button mt={2} colorScheme="blue" onClick={validateForm}>
						Add review
					</Button>
				</Box>
			</Container>
		</Box>
	);
};

export default ReviewForm;
