import React, { useState } from "react";
import { Modal, Button, Upload, Space, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Table } from ".";

const { Option } = Select;
const { Dragger } = Upload;

const getRender = (fileList, setFileList) => {
  const handleOnChange = (e, index) => {
    const newState = [...fileList];
    const { name, value } = e.target;
    newState[index][name] = value;
    setFileList(newState);
  };

  const handleDeleteBtn = (uid) => {
    setFileList(fileList.filter((item) => item.uid !== uid));
  };

  const handleDraggerChange = ({ fileList: newFileList }) => {
    const getExtension = (file) => {
      const hasDot = /\./.test(file.name);
      if (!hasDot) {
        return "";
      }

      return file.name.substr(file.name.lastIndexOf("."));
    };

    const getBaseName = (file) => {
      const hasDot = /\./.test(file.name);
      if (!hasDot) {
        return "";
      }

      return file.name.substr(0, file.name.lastIndexOf("."));
    };

    newFileList.forEach((file, fileIndex) => {
      file["baseName"] = getBaseName(file);
      file["ext"] = getExtension(file);
    });

    setFileList(newFileList);
  };

  const render = {
    dragger: (setFileList) => {
      const props = {
        name: "file",
        multiple: true,
        showUploadList: false,

        customRequest: () => {},

        onChange: handleDraggerChange

        // onDrop(e) {
        //   console.log("Dropped files", e.dataTransfer.files);
        // },
      };

      if (fileList.length) {
        return null;
      }

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

    text: (text) => <span>{text}</span>,

    string: ({ name, value, index, inputSize = 100 }) => (
      <input
        name={name}
        type="text"
        onChange={(e) => handleOnChange(e, index)}
        value={value}
        style={{ width: inputSize, border: "0.2px solid silver" }}
      />
    ),

    button: (str, uid) => <button onClick={(e) => handleDeleteBtn(uid)}>{str}</button>,

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
      if (!fileList.length) {
        return null;
      }

      const columns = [
        {
          title: "Basename",
          dataIndex: "baseName",
          size: 8
        },
        {
          title: "Ext",
          dataIndex: "extension",
          size: 1
        },
        {
          title: "Path",
          dataIndex: "path",
          size: 3
        },
        {
          title: "Comment",
          dataIndex: "comment",
          size: 3
        },
        {
          title: "Remove",
          dataIndex: "remove",
          size: 2
        }
      ];

      const data = fileList.map((file, fileIndex) => {
        return {
          baseName: render.string({
            name: "baseName",
            value: file.baseName,
            index: fileIndex,
            inputSize: 300
          }),

          // ext: render.string({
          //   name: "ext",
          //   value: file.ext,
          //   index: fileIndex,
          //   inputSize: 10
          // }),

          extension: render.text(file.ext),

          path: render.string({
            name: "path",
            value: file.path || "",
            index: fileIndex,
            inputSize: 100
          }),

          comment: render.string({
            name: "comment",
            value: file.comment || "",
            index: fileIndex,
            inputSize: 100
          }),

          remove: render.button("remove", file.uid)
        };
      });
      // .map((file, index) => {
      //   handleOnChange({ target: { name: "baseName", value: file.ext } }, index);
      //   return file;
      // });

      return (
        <div style={{ width: 750 }}>
          <Table columns={columns} dataSource={data} size="middle" pagination={false} />
        </div>
      );
    },

    permissions: () => {
      if (!fileList.length) {
        return null;
      }

      const columns = [
        {
          title: "Permission",
          dataIndex: "permission",
          size: 1
        },
        {
          title: "Groups",
          dataIndex: "groups",
          size: 4
        }
      ];
      const data = [
        {
          key: "1",
          permission: "Read",
          groups: render.select([
            "Marketing Group",
            "Design Group",
            "Management Group",
            "Developer Group"
          ])
        },
        {
          key: "1",
          permission: "Write",
          groups: render.select([
            "Marketing Group",
            "Design Group",
            "Management Group",
            "Developer Group"
          ])
        },
        {
          key: "1",
          permission: "Delete",
          groups: render.select([
            "Marketing Group",
            "Design Group",
            "Management Group",
            "Developer Group"
          ])
        }
      ];

      return (
        <div style={{ width: 750 }}>
          <Table columns={columns} dataSource={data} size="small" pagination={false} />
        </div>
      );
    },

    state: (state) => {
      return (
        <pre style={{ textAlign: "left", fontSize: 10 }}>{JSON.stringify(state, null, 2)}</pre>
      );
    }
  };

  return render;
};

const getModal = (setIsModalVisible) => {
  return {
    show: () => {
      setIsModalVisible(true);
    },

    handleOk: () => {
      setIsModalVisible(false);
    },

    handleCancel: () => {
      setIsModalVisible(false);
    }
  };
};

export const UploadModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  const modal = getModal(setIsModalVisible);
  const render = getRender(fileList, setFileList);

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
            {render.state(fileList)}
          </Space>
        </div>
      </Modal>
    </>
  );
};
