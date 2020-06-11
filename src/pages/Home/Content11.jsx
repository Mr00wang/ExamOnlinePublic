import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import {withRouter} from "react-router-dom";
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import { getChildrenToRender } from './utils';

class Content11 extends React.PureComponent {
    Register = () => {
        this.props.history.push("register");
    }
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <OverPack {...props} {...dataSource.OverPack}>
        <QueueAnim
          type="bottom"
          leaveReverse
          key="page"
          delay={[0, 100]}
          {...dataSource.titleWrapper}
        >
          {dataSource.titleWrapper.children.map(getChildrenToRender)}
        </QueueAnim>
        <TweenOne
          key="button"
          style={{ textAlign: 'center' }}
          {...dataSource.button}
          animation={{ y: 30, opacity: 0, type: 'from', delay: 300 }}
        >
          <Button {...dataSource.button.children.a} onClick={this.Register}>
            {dataSource.button.children.a.children}
          </Button>
        </TweenOne>
      </OverPack>
    );
  }
}

export default withRouter(Content11);
