import React, { FC, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



export const HtmlEditor: FC<{
    value: string,
    OnChange: (value: string) => void
}> = ({
    OnChange,
    value
}) => {
        return <ReactQuill theme="snow" value={value} onChange={(value) => OnChange(value)} />;
    }