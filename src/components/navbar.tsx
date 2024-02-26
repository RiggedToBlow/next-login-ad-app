'use client'
import { Box, Button, Flex } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  
  const {data, status} = useSession()
  const isLoggedin = status === "authenticated"
  return (
    <Flex as="nav" bg="blue.500" height="80px" p={4} color="white" justifyContent="flex-end">
    <Box>
      {isLoggedin && <Button onClick={()=>signOut()} >Logout</Button>}
      
    </Box>
    </Flex>
  );
}
