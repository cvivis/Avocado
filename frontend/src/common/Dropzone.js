import React from "react";
import { Input } from "@chakra-ui/react"

function Dropzone({ onChange }) {

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // 여기서 reader.result는 선택된 이미지의 base64 데이터입니다.
                onChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <Input
            w={'700px'}
            type="file"
            multiple
            onChange={handleFileChange}
            sx={{
                "::file-selector-button": {
                    height: 10,
                    padding: 0,
                    mr: 4,
                    background: "none",
                    border: "none",
                    fontWeight: "bold",
                },
            }}
        />
    )
}

export default Dropzone;