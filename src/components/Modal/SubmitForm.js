import React, { useState } from 'react';
import { Segmented, Button, Drawer, Form, Input, Row, Space, message, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const handleChange = (value) => {
    console.log(`선택된 값: ${value}`);
};

const options = [
    { value: true, label: '공개' },
    { value: false, label: '비공개' },
];

export default function SubmitForm({ isOpen, onClose }) {
    const [selectedOption, setSelectedOption] = useState('URL');
    const [fileList, setFileList] = useState([]);

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    const handleSubmit = async (values) => {
        console.log("*******************")
        console.log(values);
        let formData = null;
        const config = {
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk',
                'Content-Type': 'application/json',
            },
        }

        if (selectedOption === 'URL') {
            formData = {
                type: 'string',
                title: values.title,
                url: values.url,
                is_public: values.is_public
            };
        } else if (selectedOption === 'HTML') {
            formData = new FormData();
            formData.append('file', fileList[0]);
        }

        try {
            const response = await axios.post('http://kt-aivle.iptime.org:40170/api/bookmark/', formData, config);

            if (String(response.status)[0] === '2') {
                console.log('전송 성공', response.data);
            } else {
                console.log('전송 실패', response.status);
            }
        } catch (error) {
            console.error('전송 실패', error);
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        const newFileList = Array.from(files);
        setFileList(newFileList);
        console.log(newFileList);
    };

    const props = {
        name: 'file',
        action: 'http://localhost:3000/',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} 파일이 성공적으로 업로드되었습니다.`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 파일 업로드에 실패했습니다.`);
            }
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    return (
        <>
            <Drawer
                title="북마크 입력"
                width={500}
                onClose={onClose}
                open={isOpen}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>취소</Button>
                        <Button form="submitForm" key="submit" htmlType="submit" type="primary">
                            제출
                        </Button>
                    </Space>
                }
            >
                <div style={{ marginBottom: 30 }}>
                    <Segmented
                        options={[{ label: 'URL', value: 'URL' }, { label: 'HTML', value: 'HTML' }]}
                        onChange={handleOptionChange}
                    />
                </div>
                <Form layout="vertical" onFinish={handleSubmit} id="submitForm">
                    {selectedOption === 'URL' && (
                        <>
                            <Row gutter={16}>
                                <Form.Item
                                    name="title"
                                    label="북마크 이름"
                                    rules={[{ required: true, message: '북마크 이름을 입력하세요.' }]}
                                >
                                    <Input placeholder="북마크 이름을 입력하세요." />
                                </Form.Item>
                            </Row>
                            <Row gutter={16}>
                                <Form.Item
                                    name="url"
                                    label="URL"
                                    rules={[{ required: true, message: 'URL을 입력하세요.' }]}
                                >
                                    <Input placeholder="URL을 입력하세요." />
                                </Form.Item>
                            </Row>
                            <Row gutter={16}>
                                <Form.Item
                                    name="is_public"
                                    label="공개 여부"
                                    rules={[{ required: true, message: '공개 여부를 선택하세요.' }]}
                                >
                                    <Select placeholder="선택" options={options} onChange={handleChange} />
                                </Form.Item>
                            </Row>
                        </>
                    )}

                    {/* <Form layout="vertical" onFinish={(values) => handleSubmit(values)} id="submitForm">
                    {selectedOption === 'URL' && (
                        <>
                            <Row gutter={16}>
                                <Input
                                    name="title"
                                    placeholder="북마크 이름을 입력하세요."
                                    style={{ width: '100%' }}
                                    required
                                />
                            </Row>
                            <Row gutter={16}>
                                <Input
                                    name="url"
                                    placeholder="URL을 입력하세요."
                                    style={{ width: '100%' }}
                                    required
                                />
                            </Row>
                            <Row gutter={16}>
                                <Select
                                    name="is_public"
                                    defaultValue="선택"
                                    style={{ width: '100%' }}
                                    onChange={handleChange}
                                    options={options}
                                    required
                                />
                            </Row>
                        </> */}
                    {/* )} */}

                    {selectedOption === 'HTML' && (
                        <>
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />} onChange={handleFileChange}>
                                    파일 업로드
                                </Button>
                            </Upload>
                        </>
                    )}

                </Form>
            </Drawer>
        </>
    );
}
