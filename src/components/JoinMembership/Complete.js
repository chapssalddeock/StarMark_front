// Complete.js
import React from "react";
import { BackgroundPage, MainBlock, AlertPart, Content, ButtonBlock, BgLayout } from "../../../styles/Complete_Emotion";
import { Button } from 'antd';
import { useRouter } from 'next/router';

const Complete = () => {
  const router = useRouter();

  return (
    <BgLayout>
      <BackgroundPage>
        <MainBlock>
          <AlertPart>회원가입 완료</AlertPart>
          <Content>
            StarMark의 회원이 되신 걸 축하합니다!<br />
            이제 홈 화면으로 돌아가 편리한 북마크 정리 생활을 시작하세요!
          </Content>
          <ButtonBlock>
            <Button type="primary" block onClick={() => router.push('/')}>
              Go to Home
            </Button>
          </ButtonBlock>
        </MainBlock>
        {/* <GET /> */}
      </BackgroundPage>
    </BgLayout>
  );
};

export default Complete;