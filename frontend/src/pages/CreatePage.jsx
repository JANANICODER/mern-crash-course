import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useBlogStore } from "../store/product";

const CreatePage = () => {
	const [newBlog, setNewBlog] = useState({
		name: "",
		about: "",
		image: "",
	});
	const toast = useToast();

	const { createBlog } = useBlogStore();

	const handleAddBlog = async () => {
		const { success, message } = await createBlog(newBlog);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewBlog({ name: "", about: "", image: "" });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Blog
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Blog Name'
							name='name'
							value={newBlog.name}
							onChange={(e) => setNewBlog({ ...newBlog, name: e.target.value })}
						/>
						<Input
							placeholder='about'
							name='about'
							type='String'
							value={newBlog.about}
							onChange={(e) => setNewBlog({ ...newBlog, about: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newBlog.image}
							onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddBlog} w='full'>
							Add Blog
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;
