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
import { Layout, Menu, Button, Empty } from 'antd';
import {
  MenuUnfoldOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { AppContext } from "./contexts/AppContext";
import socket from "./socket";
import { ws } from "./api/nvExcel";
import { DAU_VAO_OBJECT } from "./constants/values";
const CharConvert = React.lazy(() => import('./components/CharConvert'));
const PageFormat = React.lazy(() => import('./components/PageFormat'));
const PageFormatG8 = React.lazy(() => import('./components/PageFormatG8'));
const TaoMauKhoiLuong = React.lazy(() => import('./components/TaoMauKhoiLuong'));
const TienLuong = React.lazy(() => import('./components/TienLuong'));
const TongHopChiPhi = React.lazy(() => import('./components/TongHopChiPhi'));
const MauBangTra = React.lazy(() => import('./components/MauBangTra'));

export interface AppState {
  isOpen: boolean;
  selectedKey: string;
  dismissPanel: (item: any) => void;
  collapsed: boolean,
  collapsedWidth: number,
  sideWith: string,
  openKeys: string[],
  selectedKeys: string[]
  tlExits: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      isOpen: false,
      selectedKey: history.location.toString(),
      dismissPanel: (item: any) => {
        console.log('this is context');

        history.push(item.key)
        this.setState({ selectedKey: item.key })
        this.setState({ isOpen: false })
      },
      collapsed: true,
      collapsedWidth: 0,
      sideWith: '100%',
      openKeys: ['sub1'],
      selectedKeys: [''],
      tlExits: false
    };
  };
  async componentDidMount() {
    await ws?.getProjectInfo();
    if (ws?.projectInfo[DAU_VAO_OBJECT.name]) {
      this.setState({tlExits: true})
    } else {
      this.setState({tlExits: false})
    }
  }
  openPanel() { this.setState({ isOpen: true }) };
  dismissPanel() { this.setState({ isOpen: false }) };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    // this.onOpenChange(this.state.selectedKeys)
  };
  async _khoiTaoDauVao() {
    await ws.delete(DAU_VAO_OBJECT.name).then(async(x: any) => {
      await ws.newSheetfromObject(DAU_VAO_OBJECT)
    this.setState({tlExits: true})
    })
  }
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  onOpenChange = (openKeys: string[]) => {
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
    history.push(data.key);
    this.setState({ selectedKeys: data.selectedKeys })
    this.setState({ collapsed: !this.state.collapsed })
  }
  render() {
    socket.on('elog', (data: any) => console.log(data));
    const { Header, Sider, Content } = Layout;
    const { SubMenu } = Menu;
    return (
      <AppContext.Provider value={this.state}>
        <div className="App">
          <div hidden={!this.state.tlExits} style={{ margin: 'auto' }}>
            <Empty
              style={{
                paddingTop: 60,
                paddingBottom: 60
              }}
              image="assets/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={
                <span>
                  Hmm~! File dự toán chưa có bảng đầu vào. Hãy Khởi Tạo để bắt đầu lập dự toán
                          </span>
              }
            >
              <Button type="primary" onClick={this._khoiTaoDauVao}>Khởi tạo</Button>
            </Empty>
          </div>
          <Layout hidden={this.state.tlExits}>
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
                  <Menu.ItemGroup key="tracuuThuVienMauKhoiLuong" title="Thao tác">
                    <Menu.Item key="/TienLuong">Bảng tiên lượng</Menu.Item>
                    <Menu.Item key="2">Thống kê thép bê tông</Menu.Item>
                    <Menu.Item key="3">Thống kê thép thép hình</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup key="g2" title="Quản lý thư viện">
                    <Menu.Item key="/TaoMauKhoiLuong">Mẫu khối lượng</Menu.Item>
                    <Menu.Item key="6">Mẫu thống kê thép bê tông</Menu.Item>
                    <Menu.Item key="8">Mẫu thống kê thép hình</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Dự toán">
                  <Menu.Item key="TongHopChiPhi">Tổng hợp chi phí</Menu.Item>
                  <Menu.Item key="MauBangTra">Mẫu bảng tra</Menu.Item>
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
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/?_host_Info:param" component={Home} />
                        <Route path="/charConvert" component={CharConvert} />
                        <Route path="/PageFormat" component={PageFormat} />
                        <Route path="/PageFormatG8" component={PageFormatG8} />
                        <Route path="/TaoMauKhoiLuong" component={TaoMauKhoiLuong} />
                        <Route path="/TienLuong" component={TienLuong} />
                        <Route path="/TongHopChiPhi" component={TongHopChiPhi} />
                        <Route path="/MauBangTra" component={MauBangTra} />
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

export default App;
