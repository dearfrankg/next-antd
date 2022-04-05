import React, { useState } from "react";
import { Modal, Button, Upload, Space, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Table } from ".";

const { Option } = Select;
const { Dragger } = Upload;

const render = {
  dragger: (setFileList) => {
    const props = {
      name: "file",
      multiple: true,
      customRequest: () => {},
      showUploadList: false,

      onChange({ fileList: newFileList }) {
        setFileList(newFileList);
      },

      // onDrop(e) {
      //   console.log("Dropped files", e.dataTransfer.files);
      // },
    };

    return (
      <Dragger {...props}>
        <div style={{ padding: 20 }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </div>
      </Dragger>
    );
  },

  name: () => "magic.txt",

  string: () => <input type="text" style={{ width: 100, border: "0.2px solid silver" }} />,

  button: (str) => <button>{str}</button>,

  select: (options) => (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Please select"
      defaultValue={[]}
      onChange={() => {}}
    >
      {options.map((option) => (
        <Option key={option}>{option}</Option>
      ))}
    </Select>
  ),

  files: (fileList) => {
    const columns = [
      {
        title: "Filename",
        dataIndex: "name",
        size: 10,
      },
      {
        title: "Path",
        dataIndex: "path",
        size: 3,
      },
      {
        title: "Comment",
        dataIndex: "comment",
        size: 3,
      },
      {
        title: "Delete",
        dataIndex: "delete",
        size: 1,
      },
    ];
    const data = fileList;

    data.forEach((item) => {
      item.path = render.string();
      item.comment = render.string();
      item.delete = render.button("delete");
    });

    return (
      <div style={{ width: 750 }}>
        <Table columns={columns} dataSource={data} size="middle" pagination={false} />
      </div>
    );
  },

  permissions: () => {
    const columns = [
      {
        title: "Permission",
        dataIndex: "permission",
        size: 1,
      },
      {
        title: "Groups",
        dataIndex: "groups",
        size: 4,
      },
    ];
    const data = [
      {
        key: "1",
        permission: "Read",
        groups: render.select([
          "Marketing Group",
          "Design Group",
          "Management Group",
          "Developer Group",
        ]),
      },
      {
        key: "1",
        permission: "Write",
        groups: render.select([
          "Marketing Group",
          "Design Group",
          "Management Group",
          "Developer Group",
        ]),
      },
      {
        key: "1",
        permission: "Delete",
        groups: render.select([
          "Marketing Group",
          "Design Group",
          "Management Group",
          "Developer Group",
        ]),
      },
    ];

    return (
      <div style={{ width: 750 }}>
        <Table columns={columns} dataSource={data} size="small" pagination={false} />
      </div>
    );
  },

  state: (state) => {
    console.log(JSON.stringify(state, null, 2));
  },
};

export const UploadModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  const modal = {
    show: () => {
      setIsModalVisible(true);
    },

    handleOk: () => {
      setIsModalVisible(false);
    },

    handleCancel: () => {
      setIsModalVisible(false);
    },
  };

  return (
    <>
      <Button type="primary" onClick={modal.show}>
        Upload...
      </Button>
      <Modal
        title="Upload Files"
        width={1000}
        visible={isModalVisible}
        onOk={modal.handleOk}
        onCancel={modal.handleCancel}
        centered
      >
        <div style={{ textAlign: "center" }}>
          <Space direction="vertical" size="large" align="center">
            {render.dragger(setFileList)}
            {render.files(fileList)}
            {render.permissions()}
            {/* {render.state(fileList)} */}
          </Space>
        </div>
      </Modal>
    </>
  );
};
