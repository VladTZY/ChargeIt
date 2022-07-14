import React from "react";

import { Box, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

const Review = ({ direction, userName, reviewContent }) => {
	console.log(direction);

	return (
		<>
			{direction % 2 == 0 ? (
				<Box width="100%" align="right">
					<Box
						align="left"
						backgroundColor="blue.400"
						width="30%"
						borderColor="whitesmoke"
						border="1px"
						borderRadius="10px"
						mt={4}
					>
						<ChatIcon pl={2} color="white" />
						<Text p={2} fontSize="xl" color="whiteAlpha.900">
							{userName} says:
						</Text>
						<Text pl={4} pb={2} color="white">
							{reviewContent}
						</Text>
					</Box>
				</Box>
			) : (
				<Box
					backgroundColor="gray.400"
					width="30%"
					borderColor="whitesmoke"
					border="1px"
					borderRadius="10px"
					mt={4}
				>
					<ChatIcon pl={2} color="white" />
					<Text p={2} fontSize="xl" color="whiteAlpha.900">
						{userName} says:
					</Text>
					<Text pl={4} pb={2} color="white">
						{reviewContent}
					</Text>
				</Box>
			)}
		</>
	);
};

export default Review;
