import React, { Component, Suspense } from 'react';
import {
  Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import history from './history';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons';
// import CommandBarMain from "./components/CommandBarMain";
// import MenuPanel from "./components/MenuPanel";
import { AppContext } from "./contexts/AppContext";
import socket from "./socket";
// import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
const CharConvert = React.lazy(() => import('./components/CharConvert'));
const PageFormat = React.lazy(() => import('./components/PageFormat'));
const PageFormatG8 = React.lazy(() => import('./components/PageFormatG8'));
const TaoMauKhoiLuong = React.lazy(() => import('./components/TaoMauKhoiLuong'));

export interface AppState {
  isOpen: boolean;
  selectedKey: string;
  dismissPanel: (item: any) => void;
  collapsed: boolean,
  collapsedWidth: number,
  sideWith: string,
  openKeys: string[],
  selectedKeys: string[]
}

class App extends Component<{}, AppState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      isOpen: false,
      selectedKey: history.location.toString(),
      dismissPanel: (item: any) => {
        history.push(item.key)
        this.setState({ selectedKey: item.key })
        this.setState({ isOpen: false })
      },
      collapsed: true,
      collapsedWidth: 0,
      sideWith: '100%',
      openKeys: ['sub1'],
      selectedKeys: ['']
    };
  };
  openPanel() { this.setState({ isOpen: true }) };
  dismissPanel() { this.setState({ isOpen: false }) };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    // this.onOpenChange(this.state.selectedKeys)
  };
  handleClick() {

  }
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  onOpenChange = (openKeys: string[]) => {
    console.log(openKeys);
    
    console.log(this.state.openKeys);
    
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    console.log('latest', latestOpenKey);
    
    if (this.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      this.setState({ openKeys: openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  onSelect = (data: any) => {
    console.log(data);
    
    history.push(data.key);
    this.setState({selectedKeys: data.selectedKeys})
    this.setState({ collapsed: !this.state.collapsed })
  }
  render() {
    socket.on('elog', (data: any) => console.log(data));
    const { Header, Sider, Content } = Layout;
    const { SubMenu } = Menu;
    return (
      <AppContext.Provider value={this.state}>
        <div className="App">
          <Layout>
            <Sider trigger={null} collapsible
              width={this.state.sideWith}
              collapsedWidth={this.state.collapsedWidth}
              collapsed={this.state.collapsed}
              theme='light'
            >
              <div className="logo" />
              <Header className="header" style={{ padding: 0 }}>
                <Button icon={<MenuUnfoldOutlined />} onClick={this.toggle}></Button>
              </Header>
              <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                onSelect={this.onSelect}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <MailOutlined />
                      <span>Khối lượng</span>
                    </span>
                  }
                >
                  <Menu.ItemGroup key="tracuuThuVienMauKhoiLuong" title="Tra cứu thư viện">
                    <Menu.Item key="tracuuMauKhoiLuong">Mẫu khối lượng</Menu.Item>
                    <Menu.Item key="2">Mẫu thống kê thép bê tông</Menu.Item>
                    <Menu.Item key="3">Mẫu thống kê thép thép hình</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup key="g2" title="Quản lý thư viện">
                    <Menu.Item key="/TaoMauKhoiLuong">Tạo mẫu khối lượng</Menu.Item>
                    <Menu.Item key="5">Sửa mẫu khối lượng</Menu.Item>
                    <Menu.Item key="6">Tạo mẫu thống kê thép bê tông</Menu.Item>
                    <Menu.Item key="7">Sửa mẫu thống kê thép bê tông</Menu.Item>
                    <Menu.Item key="8">Tạo mẫu thống kê thép hình</Menu.Item>
                    <Menu.Item key="9">Sửa mẫu thống kê thép hình</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Dự toán">
                  <Menu.Item key="10">Option 5</Menu.Item>
                  <Menu.Item key="11">Option 6</Menu.Item>
                  <SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="12">Option 7</Menu.Item>
                    <Menu.Item key="13">Option 8</Menu.Item>
                  </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" icon={<SettingOutlined />} title="Công cụ">
                  <Menu.Item key="/pageFormat">Định dạng trang in</Menu.Item>
                  <Menu.Item key="/pageFormatG8">Định dạng trang in G8</Menu.Item>
                  <Menu.Item key="/charConvert">Chuyển mã tiếng Viết</Menu.Item>
                  <Menu.Item key="/otherTools">Công cụ khác</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="header" style={{ padding: 0 }}>
                <Button icon={<MenuUnfoldOutlined />} onClick={this.toggle}></Button>
              </Header>
              <Content>
                <Router history={history}>
                  <Suspense fallback="Đang tải">
                    <section className="App-body">
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/charConvert" component={CharConvert} />
                        <Route path="/PageFormat" component={PageFormat} />
                        <Route path="/PageFormatG8" component={PageFormatG8} />
                        <Route path="/TaoMauKhoiLuong" component={TaoMauKhoiLuong} />
                      </Switch>
                    </section>
                  </Suspense>
                </Router>
              </Content>
            </Layout>
          </Layout>
        </div>
      </AppContext.Provider>
    );
  }
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
// function SpinnerLoadinng() {
//   return (
//     <Spinner size={SpinnerSize.small} />
//   )
// }

export default App;
