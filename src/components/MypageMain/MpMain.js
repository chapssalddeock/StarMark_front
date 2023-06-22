import { useState, useEffect, useRef } from 'react';
import { Menu, Modal } from 'antd';
import { Search, PlusCircle  } from 'react-bootstrap-icons';
import { Network } from 'vis-network/';
import { DataSet } from 'vis-data/';
import { Button, Form, Input } from 'antd';
import { useSpring, animated, config } from 'react-spring';
import MpFollowView from '../MyPageFollow/MpFollow';
import MpSideBar from '../MyPageSideBar/MpSideBar';
export default function MpMain({ selectedItem }) {
    
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const handleProfileImageUpload = () => {
        setIsConfirmOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
      };
    const handleConfirmUpload = () => {
        // 프로필 사진 업로드 실행
        setIsConfirmOpen(false);
    };
      
    const handleCancelUpload = () => {
        // 업로드 취소
        setIsConfirmOpen(false);
    };
    const handlePasswordChange = (values) => {
        const { currentPassword, newPassword, confirmPassword } = values;
      
        // 현재 비밀번호, 새로운 비밀번호, 비밀번호 확인을 확인하고 로직을 구현합니다.
        if (currentPassword === '현재 비밀번호' && newPassword === confirmPassword) {
          // 비밀번호 변경 로직을 여기에 구현합니다.
          // 현재 비밀번호와 새로운 비밀번호를 사용하여 비밀번호를 변경하는 API 호출이나
          // 기타 비밀번호 변경 관련 작업을 수행합니다.
      
          // 비밀번호 변경이 성공적으로 완료되었을 때 사용자에게 알림을 보여줄 수 있습니다.
          message.success('비밀번호가 성공적으로 변경되었습니다.');
        } else {
          // 현재 비밀번호가 일치하지 않거나 새로운 비밀번호와 확인 비밀번호가 일치하지 않을 때 에러 처리를 수행합니다.
          message.error('비밀번호 변경에 실패했습니다. 입력한 정보를 확인해주세요.');
        }
      };
      const [profileImage, setProfileImage] = useState(null);
      const networkRef = useRef();
      const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
    useEffect(() => {
        const container = document.getElementById('mynetwork');
            
        
        if (selectedItem === 'sub1') {
            const nodes = new DataSet([
                { id: 1, label: 'Node 1' },
                { id: 2, label: 'Node 2' },
                { id: 3, label: 'Node 3' },
                { id: 4, label: 'Node 4' },
                { id: 5, label: 'Node 5' },
            ]);
        
            const edges = new DataSet([
                { from: 1, to: 2 },
                { from: 1, to: 3 },
                { from: 2, to: 4 },
                { from: 2, to: 5 },
            ]);
        
            const data = { nodes, edges };
            const options = {};
        
            const network = new Network(container, data, options);
            networkRef.current = network;
            networkRef.current.on('click', (event) => {
                if (event.nodes.length > 0) {
                    const nodeId = event.nodes[0];
                    const selectedNode = nodes.get(nodeId);
                setSelectedNode(selectedNode);
                setIsModalOpen(true);
                }
            });
            
            } else {
            networkRef.current = null;
            }
            
    }, [selectedItem]);

    return(
        <>
            <div className="main-content" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
            
            {selectedItem === 'sub1' && (
              
                <div className='user_container' style = {{marginLeft:'-300px', marginTop: '-700px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <div className='image_container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  
                    <div className = 'user_image' style={{ position: 'relative', height: '250px', width: '250px'}}>
                      <div style={{ position: 'relative', width: '200px', height: '200px'}}>
                        <svg
                          className="bd-placeholder-img rounded-circle"
                          width="100%"
                          height="100%"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          aria-label="Placeholder"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                          style={{
                            borderRadius: '50%',
                            border: '2px solid var(--bs-primary-color)',
                          }}
                        >
                          
                          <title>Placeholder</title>
                          <rect width="100%" height="100%" fill="skyblue"></rect>
                          <image
                            href="/img/User.jpg"
                            width="99%"
                            height="95%"
                            preserveAspectRatio="xMidYMid slice"
                          />
                        </svg>
                        {profileImage && (
                          <img
                            src={profileImage}
                            alt="프로필 사진"
                            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--bs-primary-color)'}}
                          />
                        )}
                        <div className="user_info" style={{ marginTop: '20px', textAlign: 'center' }}>
                          <h4>유저 이름</h4>
                          <p>추가 정보 표시</p>
                        </div>
                      </div>
                    </div>
  
                    <animated.div style={springProps}>
                      <div id="mynetwork" style={{ border: '1px solid transparent', marginTop:'30px',position: 'relative', width: '1000px', height: '300px'}}></div>
                    </animated.div>  
                  </div>
                </div>
                
                
             
            )}
            {selectedItem === 'sub2' && (
              <div style={{marginLeft: '-500px', marginTop:'-647px'}}>
                <MpFollowView></MpFollowView>
                {/* <p>표시 되나여?</p> */}
              </div>
            )}
            {selectedItem === 'sub3' && (
              <div>
                <div className ='PM_container' style={{marginLeft: '10px', marginTop:'-670px', height: '1400px', width: '900px'}}>
                  
                
                  <div className= 'profile_modify' style={{ }}>
                    <div className = 'profile_image' style={{ marginLeft: '125px', position: 'relative', height: '200px', width: '200px'}}>
                      <svg
                        className="bd-placeholder-img rounded-circle"
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Placeholder"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                        style={{
                          borderRadius: '50%',
                          border: '2px solid var(--bs-primary-color)',
                          fill: 'black',
                        }}
                      >
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="skyblue"></rect>
                        <image
                            href="/img/User.jpg"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid slice"
                        />
                      </svg>
                      {profileImage && (
                        <img
                          src={profileImage}
                          alt="프로필 사진"
                          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--bs-primary-color)'}}
                        />
                      )}
                      <label htmlFor="profileImageUpload" style={{ position: 'absolute', bottom: '8px', right: '8px', cursor: 'pointer' }}>
                        <PlusCircle size={24} color="black" />
                        
                      </label>
                      <input type="file" id="profileImageUpload" onChange={handleProfileImageUpload} style={{ display: 'none' }} />
                      {isConfirmOpen && (
                        <div>
                          <p>프로필 사진을 변경하시겠습니까?</p>
                          <button onClick={handleConfirmUpload}>확인</button>
                          <button onClick={handleCancelUpload}>취소</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <Form
                    name="changePassword"
                    onFinish={handlePasswordChange}
                    labelCol={{
                      flex: '110px',
                    }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{
                      flex: 1,
                    }}
                    colon={false}
                    style={{
                      maxWidth: 450,
                      marginTop: '50px',
                      height: '50%'
                    }}
                  >
                    <Form.Item
                      label="닉네임"
                      name="nickname"
                      rules={[
                        {
                          required: true,
                          message: '닉네임을 입력해주세요.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
  
                    <Form.Item
                      label="현재 비밀번호"
                      name="currentPassword"
                      rules={[
                        {
                            required: true,
                            message: '현재 비밀번호를 입력해주세요.',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
  
                    <Form.Item
                      label="새로운 비밀번호"
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: '새로운 비밀번호를 입력해주세요.',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
  
                    <Form.Item
                      label="비밀번호 확인"
                      name="confirmPassword"
                      dependencies={['newPassword']}
                      rules={[
                        {
                          required: true,
                          message: '비밀번호 확인을 입력해주세요.',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
  
                    <Form.Item label=" ">
                      <div style={{ marginTop: '30px', display: 'flex', marginLeft: '-110px', justifyContent: 'center', alignItems: 'center' }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: '30px' }}>
                          modify
                        </Button>
                        <Button type="primary" htmlType="submit">
                          cancel
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            )}
          </div>
          <Modal
          visible={isModalOpen}
          onCancel={closeModal}
          onOk={closeModal}
          title={selectedNode ? selectedNode.label : ''}
        >
          {selectedNode && <p>Node ID: {selectedNode.id}</p>}
        </Modal>
        </>
        
    );
}