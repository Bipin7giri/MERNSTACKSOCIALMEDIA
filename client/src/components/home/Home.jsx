import AddPost from './AddPost';
import Post from './Post';
import SideBar from './SideBar';
import Story from './Story';
import { useDispatch, useSelector } from 'react-redux';
import RightBar from './RightBar';
import {
  BorderBottomOutlined,
  BorderTopOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from '@ant-design/icons';
import { Button, Divider, notification, Space } from 'antd';
function Home() {
  // console.log(notification[0][]);
  const mode = useSelector((state) => state.mode.isMode);

  const openNotification = (placement) => {
    notification.info({
      message: `Notification ${placement}`,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement,
    });
  };
  // openNotification('bottomLeft');
  return (
    <div className='App'>
  
    <div
        class={
          mode === true ? 'flex h-screen' : 'flex h-screen  dark:bg-gray-900'
        }
      >
        {/* // <!-- Desktop sidebar --> */}
        <SideBar />

        <div class='flex flex-col flex-1'>
          <Story />
          <div class='h-full pb-16 overflow-y-auto'>
            {/* <!-- Main Contents --> */}

            <div class='block md:grid md:grid-flow-row-dense md:grid-cols-3 md:grid-rows-3 '>
              <div class='col-span-2'>
                <div class='pt-10 mt-5'>
                  <AddPost />
                </div>
                <Post />
              </div>
              <RightBar />
            </div>
          </div>
        </div>
      </div>
      {/* <Space>
        <Button
          type='primary'
          onClick={() => openNotification('bottomLeft')}
          icon={<RadiusBottomleftOutlined />}
        >
          bottomLeft
        </Button>
        <Button
          type='primary'
          onClick={() => openNotification('bottomRight')}
          icon={<RadiusBottomrightOutlined />}
        >
          bottomRight
        </Button>
      </Space> */}
    </div>
  );
}

export default Home;
