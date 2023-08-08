import React from "react";
import { Input } from "@chakra-ui/react"

function Dropzone() {

    return (
        <Input
            w={'700px'}
            type="file"
            multiple
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