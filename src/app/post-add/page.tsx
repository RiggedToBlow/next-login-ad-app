"use client";
import ImageUpload from "@/components/image-upload";
import withAuth from "@/components/with-auth";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Text,
    useSteps,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const steps = [
    { title: "Basic information" },
    { title: "Images Upload" },
    { title: "Review information" },
];

const postAddForm = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    const [images, setImages] = useState<any[]>([]);
    const [basicInformationForm, setBasicInformationForm] = useState({ make: '', model: '', year: currentYear.toString() })
    const [alertMessage, setAlertMessage] = useState('')
    const handleBasicInformationStepForm = (e: any) => {
        e.preventDefault()
        const make = e.target[0].value
        const model = e.target[1].value
        const year = e.target[2].value
        const formValid = make && model && year;
        if (formValid){
            setBasicInformationForm({ make, model, year })
            setActiveStep(1);
            setAlertMessage('')
        }else{
            setAlertMessage('Please fill in all the required fields')
        }
    }

    const handlePostAdd = (e: any) => {
        e.preventDefault()
        const make = e.target[0].value
        const model = e.target[1].value
        const year = e.target[2].value
        setBasicInformationForm({ make, model, year })

        //TODO Validates And Axios Post Request to add the post on Backend
    }
    const handleImagesUploadForm = (e: any) => {
        e.preventDefault()
        if (images.length > 0) {
            setAlertMessage('')
            setActiveStep(2)
        }else{
            setAlertMessage('You have to upload at least one image')
        }
    }

    const handleImageUpload = (data: any[]) => {
        setImages(data)
    }


    return (
        <Flex
            width="100%"
            mt={{base:'100px', sm:'200px'}}
            mb="100px"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            <Stepper width={{base:"300px", sm:"500px", md:"700px" }} index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <Flex flexDirection="column" alignItems="center">
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box textAlign="center" flexShrink="0" pt="1">
                                <StepTitle >{step.title}</StepTitle>
                            </Box>
                        </Flex>
                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
            <br />
            {
                alertMessage &&
                <Alert width="500px" status="warning">
                    <AlertIcon/>
                    {alertMessage}
                </Alert>
            }
            {
                activeStep === 0 &&
                <form onSubmit={handleBasicInformationStepForm}>
                    <BasicInformationForm {...basicInformationForm} />
                    <Flex pt="10" justifyContent="center">
                        <Button bg="blue.500" color="white" width="200px" type="submit">Next</Button>
                    </Flex>
                </form>
            }
            {
                activeStep === 1 &&
                <form onSubmit={handleImagesUploadForm}>

                    <ImageUpload width="100%" handleImageUpload={handleImageUpload} ></ImageUpload>

                    <Flex pt="10" justifyContent="center" gap="20px">
                        <Button onClick={() => setActiveStep(0)} width={{base:"100", sm:"200px"}}>Previous</Button>
                        <Button bg="blue.500" color="white" width={{base:"100", sm:"200px"}} type="submit">Next</Button>
                    </Flex>
                </form>
            }
            {
                activeStep === 2 &&
                <form onSubmit={handlePostAdd}>
                    <Flex flexDirection="column" alignItems="center">

                        <BasicInformationForm {...basicInformationForm} />
                        <ImageUpload width="100%" handleImageUpload={handleImageUpload} inputImages={images} ></ImageUpload>

                        <Flex pt="10" justifyContent="center" gap="20px">
                            <Button onClick={() => setActiveStep(0)} width={{base:"100", sm:"200px"}}>Cancel</Button>
                            <Button bg="blue.500" color="white" width={{base:"100", sm:"200px"}} type="submit">Post</Button>
                        </Flex>
                    </Flex>
                </form>

            }
        </Flex>
    );
};

export default withAuth(postAddForm);

function BasicInformationForm({ make, model, year }: { make?: string, model?: string, year?: string }) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    return <Card>
        <CardBody width={{base:"300px", sm:"500px", md:"700px" }}>
            <Flex flexWrap="wrap" gap="10">
                <FormControl width="300px" isRequired>
                    <FormLabel>Select a Make</FormLabel>
                    <Select defaultValue={make} name="make" placeholder="Click here to see Makes">
                        <option value="make1">Make your dream come true</option>
                        <option value="make2">Make stuff happen</option>
                        <option value="make3">Make the C compiler</option>
                    </Select>
                </FormControl>
                <FormControl width="300px" isRequired>
                    <FormLabel>Select a Model</FormLabel>
                    <Select defaultValue={model} name="model" placeholder="Click here to see Models">
                        <option value="model1">Data Modeling is important</option>
                        <option value="model2">Be a role Model</option>
                        <option value="model3">Model In 3d</option>
                    </Select>
                </FormControl>
                <FormControl width="300px" isRequired>
                    <FormLabel>Select a Year</FormLabel>
                    <Select defaultValue={year} name="Year">
                        {years.map(year => <option key={year} value={year}>{year}</option>)}
                    </Select>
                </FormControl>
            </Flex>
        </CardBody>
    </Card>;
}

