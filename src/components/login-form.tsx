'use client'
import { Box, Button, FormControl, FormLabel, Input, IconButton, InputGroup, InputRightElement, Flex, Spacer, Alert, AlertIcon } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { status } = useSession()
    const router = useRouter()
    const handleClick = () => setShow(!show);
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        const response = await signIn('credentials', {
            redirect: false,
            email,
            password
        })

        if (response?.error) {
            // Handle error
            setErrorMessage('Email or password is incorrect')
        } else {
            // Handle success
            router.push('/post-add')
        }
    }

    // redirect if user is loggedin
    if (status === 'authenticated') {
        router.push('/post-add')
    }

    return (
        <Flex justifyContent="center" width="100%" height="85vh" alignItems="center">
            <Box p={8} width="500px">
                <Box textAlign="center">
                    <Box as="h2" mt={4} fontSize="xx-large" fontWeight="bold">
                        Log in
                    </Box>
                </Box>
                {
                    errorMessage &&
                    <Alert status="error">
                        <AlertIcon />
                        {errorMessage}
                    </Alert>
                }
                <Box my={4} textAlign="left">
                    <form onSubmit={handleSubmit}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input defaultValue="email@example.com" type="email" name="email" placeholder="example@email.com" />
                        </FormControl>

                        <FormControl id="password" mt={6} isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup size="md">
                                <Input defaultValue="test" pr="4.5rem" name="password" type={show ? "text" : "password"} placeholder="*******" />
                                <InputRightElement width="4.5rem">
                                    <IconButton h="1.75rem" size="sm" onClick={handleClick} icon={show ? <ViewOffIcon /> : <ViewIcon />} />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <Button width="full" mt={4} type="submit" bg="blue.500" color="white" >
                            Log in
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
};

export default LoginForm;
