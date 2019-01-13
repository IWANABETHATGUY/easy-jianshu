import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Row from 'antd/es/row';
import Modal from 'antd/es/modal';
import { connect } from 'react-redux';
import ReactCrop from 'react-image-crop';
import { dataURLtoBlob } from '../../../../libs/utils';
import axios from 'axios';
import { HOST } from '../../../../libs/config';
const styles = () => ({
  replayComment: {
    display: 'flex',
    margin: '10px 10px 0 10px',
    alignItems: 'flex-start',
    padding: '5px',
  },
  replayCommentAvatar: {
    width: '30px',
    height: '30px',
  },
  replayCommentBox: {
    width: '100%',
    marginLeft: '10px',
    fontSize: '16px',
  },
  replayCommentContainer: {
    padding: '0 10px',
    wordBreak: 'break-word',
  },
  replayCommentInfoContainer: {
    position: 'relative',
    display: 'flex',
    margin: '0 10px 0 10px',
    alignItems: 'center',
    padding: '5px',
  },
  comment: {
    background: '#f0f0f0',
  },
  row: {},
});

class Comment extends Component {
  state = {
    commentInfoList: [],
    listLoading: false,
    visible: false,
    src: null,
    blob: null,
    croppedImageUrl: null,
    crop: {
      aspect: 1,
      width: 50,
      x: 0,
      y: 0,
    },
  };

  componentDidMount() {
    this.setState({
      listLoading: true,
    });
  }
  handleOk = async () => {
    if (this.state.src) {
      let nameList = this.state.croppedImageUrl.split('/');
      let fileName = nameList[nameList.length - 1];
      const fileOfBlob = new File([this.state.blob], fileName);
      const formData = new FormData();

      // type
      // size
      formData.append('size', fileOfBlob.size);
      // name
      formData.append('name', fileName);
      // lastModifiedDate
      // append 文件
      formData.append('file', fileOfBlob);
      console.log(formData);
      axios.post(`${HOST}/user/avatar`, formData, {
        withCredentials: true,
        onUploadProgress(e) {
          console.log(e);
        },
      });
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleClickUploadNewAvatar = () => {
    this.setState({
      visible: true,
    });
  };
  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => this.setState({ src: reader.result }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };
  makeClientCrop = async (crop, pixelCrop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(this.imageRef, pixelCrop, 'newFile.jpeg');
      this.setState({ croppedImageUrl });
    }
  };
  getCroppedImg = (image, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        blob.name = fileName;
        this.setState({
          blob,
        });
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  };
  render() {
    const { avatarSrc } = this.props;
    const { crop, croppedImageUrl, src } = this.state;
    return (
      <div>
        <Modal title="上传头像" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div>
            <input type="file" onChange={this.onSelectFile} />
          </div>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          )}
          {croppedImageUrl && <img alt="Crop" style={{ width: '200px' }} src={croppedImageUrl} />}
        </Modal>
        <Row type="flex" justify="center" align="middle">
          <div style={{ position: 'relative' }}>
            <img src={avatarSrc} alt="avatar" style={{ height: '100px', width: '100px' }} />
            <div
              onClick={this.handleClickUploadNewAvatar}
              style={{
                height: '20px',
                fontSize: '16px',
                lineHeight: '20px',
                width: '100%',
                textAlign: 'center',
                border: '1px dotted #ccc',
                cursor: 'pointer',
              }}
            >
              上传新头像
            </div>
          </div>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    avatarSrc: state.login.userInfo.avatar,
  };
};
export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Comment));
