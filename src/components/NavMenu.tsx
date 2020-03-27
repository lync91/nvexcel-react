import React, { Component } from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import history from '../history'

export interface AppProps {
  dismissPanel: () => void;
  selectedKey: string;
}

export interface AppState {
  selectedKey: string;
}

class NavMenu extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedKey: '/home'
    }
  }
  componentWillMount () {
    console.log(history.location.pathname);
    // const lKey = history.location.pathname.toString().substr(1)
    this.setState({selectedKey: history.location.pathname})
    
  }
  _onLinkClick = async (_ev?: React.MouseEvent<HTMLElement, MouseEvent>, item?: any) => {
    if (!item.links) {
      history.push(item.key);
      this.props.dismissPanel();
      // this.props.dispatch({type: 'CHANGE_LOCATION', selectedKey: item.key})
      // this.props.dismissPanel();
    }
  };
  render() {
    return (
      <Nav
        onLinkClick={this._onLinkClick}
        selectedKey={this.state.selectedKey}
        ariaLabel="NavMenu"
        groups={[
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
                    // onClick: () => {console.log('Clicked');
                    // }
                  }
                ],
                isExpanded: true
              },
              {
                name: 'Khối lượng',
                url: '',
                key: 'key3',
                isExpanded: true,
                target: ''
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
                    // onClick: () => {console.log('Clicked');
                    // }
                  }
                ],
                isExpanded: true
              },
              {
                name: 'Communication and Media',
                url: '',
                key: 'key6',
                target: '_blank'
              },
              {
                name: 'News',
                url: '',
                icon: 'News',
                key: 'key7',
                target: '_blank'
              }
            ]
          }
        ]}
      />
    );
  }
};

export default NavMenu