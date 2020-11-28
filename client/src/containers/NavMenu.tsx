import React, { Component } from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { AppContext } from "../contexts/AppContext";

export interface AppProps {
}

export interface AppState {
  groups: any[]
}

class NavMenu extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      groups: [
        {
          links: [
            {
              name: 'Dự toán',
              url: '',
              links: [
                {
                  name: 'Activity',
                  url: '',
                  key: 'about',
                  target: '',
                },
                {
                  name: 'MSN',
                  url: '',
                  key: 'key2',
                  target: '',
                }
              ],
              isExpanded: true
            },
            {
              name: 'Khối lượng',
              url: '',
              key: 'key3',
              isExpanded: true,
              links: [
                {
                  name: 'Tạo, sửa mẫu tổng hợp khối lượng',
                  url: '',
                  key: '/TaoMauKhoiLuong',
                  target: '',
                },
                {
                  name: 'MSN',
                  url: '',
                  key: 'key2',
                  target: '',
                }
              ],
            },
            {
              name: 'Công cụ',
              url: '',
              expandAriaLabel: 'Expand Home section',
              collapseAriaLabel: 'Collapse Home section',
              links: [
                {
                  name: 'Định dạng trang in',
                  url: '',
                  key: '/pageFormat',
                  target: '',
                },
                {
                  name: 'Định dạng trang in G8',
                  url: '',
                  key: '/pageFormatG8',
                  target: '',
                },
                {
                  name: 'Chuyển mã tiếng Việt',
                  url: '',
                  key: '/charConvert',
                  target: '',
                },
                {
                  name: 'Công cụ khác',
                  url: '',
                  key: '/otherTools',
                  target: '',
                }
              ],
              isExpanded: true
            }
          ]
        }
      ]
    }
  }
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Nav
          onLinkClick={(e, item) => {context.dismissPanel(item)}}
          selectedKey={context.selectedKey}
          ariaLabel="NavMenu"
          groups={this.state.groups}
        />
        )}
      </AppContext.Consumer>
    );
  }
};

export default NavMenu