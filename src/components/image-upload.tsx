'use client'
import { Box, Card, CardBody, Flex, Image, List, ListItem, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
    handleImageUpload: (data: any[]) => void
    inputImages?: any[],
    width:string
}


const ImageUpload = ({ handleImageUpload, inputImages, width }: ImageUploadProps) => {
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        if (!!inputImages && inputImages.length > 0) {
            setImages(inputImages)
        }
    }, [])

    const onDrop = useCallback((acceptedFiles:any[]) => {
        if (acceptedFiles.length > 5) {
            alert('You can only upload up to 5 images.');
            return;
        }

        for (let file of acceptedFiles) {
            if (file.size > 2000000) {
                alert('Each image must be 2MB or less.');
                return;
            }
        }

        const imagesWithPreviewLink = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setImages(imagesWithPreviewLink);

        handleImageUpload(imagesWithPreviewLink);

    }, [])


    const acceptedFileMap = { 
        'image/png': ['.png'],
        'image/bmp': ['.bmp'],
        'image/jpeg': ['.jpg','.jpeg'],

};
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: acceptedFileMap, maxFiles: 5 })

    return (
        <Card>
            <CardBody width={width}>
                <Flex {...getRootProps()} gap={10} flexWrap="wrap" alignItems="center" justifyContent="center" >
                    <input {...getInputProps()} />
                    <Box bg="gray.100" border="2px" borderColor="gray.400" borderStyle="dashed" borderRadius="10px" width={{base:'250px',sm:'100%',md:'600px', lg:'800px'}} pt="75px" pb="75px">
                        <Flex justifyContent="space-around" width="100%" flexDirection="column" alignItems="center">
                            <Image width="50px" src="upload-icon.svg"></Image>
                            <br />
                            <Text color="gray.600" fontWeight="bold" >Drag files to upload</Text>
                        </Flex>
                    </Box>
                    {
                        images.length > 0 &&
                        <aside>
                            <List px={3} spacing={5}>
                                {images.map(file => (
                                    <ListItem key={file.name} bg="gray.100" borderRadius="10px">
                                        <Flex>
                                            <Image src={file.preview} style={{ width: '50px' }} alt="preview" p={1} />
                                            <Text whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" width="50%">{file.name}</Text>
                                        </Flex>
                                    </ListItem>
                                ))}
                            </List>
                        </aside>
                    }

                </Flex>
            </CardBody>

        </Card>

    )
}

export default ImageUpload;
