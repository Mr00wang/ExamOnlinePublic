import React from 'react';
import addExam from "../../assets/addExam.jpg"
import addTest from "../../assets/addTest.jpg"
import addTitle from "../../assets/addTitle.jpg"
import lookScore from "../../assets/lookScore.jpg"
export const Nav20DataSource = {
  isScrollLink: true,
  wrapper: { className: 'header2 home-page-wrapper k7kibmleto7-editor_css' },
  page: { className: 'home-page' },
  logo: {
    className: 'header2-logo',
    children:
      'http://m.qpic.cn/psc?/V11aW8sd1QoVup/AAqA*OLIGuMLp9aQ5B1ShJidwUoodKfjzVorEnAHr.ktDNbakLpF2u6rAymPIKL03AuyZaYuLPaiPBmmcjOlkw!!/b&bo=QAGTAEABkwADCSw!&rf=viewer_4',
  },
  LinkMenu: {
    className: 'header2-menu',
    children: [
      {
        name: 'linkNav',
        to: '当前页面 ID 地址，参考如上',
        children: '首页',
        className: 'menu-item',
      },
      {
        name: 'linkNav~k7k9pbp4ew',
        to: 'Feature1_0',
        children: '特点',
        className: 'menu-item',
      },
      {
        name: 'linkNav~k7k9p1o7rj',
        to: '',
        children: '帮助',
        className: 'menu-item',
      },
      {
        name: 'linkNav~k7k9ppscns',
        to: '/register',
        children: '注册',
        className: 'menu-item',
      },
      {
        name: 'linkNav~k7k9psm012a',
        to: '/userlogin',
        children: '登陆',
        className: 'menu-item',
      },
    ],
  },
  mobileMenu: { className: 'header2-mobile-menu' },
};
export const Banner00DataSource = {
  wrapper: { className: 'banner0 k7k8t715ypi-editor_css' },
  textWrapper: { className: 'banner0-text-wrapper' },
  title: {
    className: 'banner0-title',
    children: (
      <>
        <p>让考试更加便捷</p>
      </>
    ),
  },
  content: {
    className: 'banner0-content k7klp1tdik9-editor_css',
    children: (
      <>
        <p>
          {/*<span>一个高效、便捷、简单的在线考试平台</span>*/}
          <br />
        </p>
        <p>
          <span>一个高效、便捷、简单的在线考试平台</span>
          <br />
        </p>
      </>

    ),
  },
  button: {
    className: 'banner0-button k7kltrx89k9-editor_css',
    children: (
      <>
        <p>立即注册</p>
      </>
    ),
  },
};
export const Feature00DataSource = {
  wrapper: { className: 'home-page-wrapper content0-wrapper' },
  page: { className: 'home-page content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: '产品与服务' }],
  },
  childWrapper: {
    className: 'content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children:
                'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: (
                <>
                  <p>发布考试</p>
                </>
              ),
            },
            {
              name: 'content',
              children: (
                <>
                  <p>简单快捷的发布考试</p>
                </>
              ),
            },
          ],
        },
      },
      {
        name: 'block1',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children:
                'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png',
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: (
                <>
                  <p>成绩分析</p>
                </>
              ),
            },
            {
              name: 'content',
              children: (
                <>
                  <p>通过可视化图形清楚看出考试成绩</p>
                </>
              ),
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children:
                'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: (
                <>
                  <p>考生管理</p>
                </>
              ),
            },
            {
              name: 'content',
              children: (
                <>
                  <p>考生信息的有效管理</p>
                </>
              ),
            },
          ],
        },
      },
    ],
  },
};
export const Feature20DataSource = {
  wrapper: { className: 'home-page-wrapper content2-wrapper' },
  OverPack: { className: 'home-page content2', playScale: 0.3 },
  imgWrapper: { className: 'content2-img', md: 10, xs: 24 },
  img: {
    children: addExam,
  },
  textWrapper: { className: 'content2-text', md: 14, xs: 24 },
  title: {
    className: 'content2-title',
    children: (
      <>
        <p>发布考试</p>
      </>
    ),
  },
  content: {
    className: 'content2-content',
    children:
      '用户通过已经导入的试卷,快速创建考试，一“创”即发',
  },
};
export const Feature10DataSource = {
  wrapper: { className: 'home-page-wrapper content1-wrapper' },
  OverPack: { className: 'home-page content1', playScale: 0.3 },
  imgWrapper: { className: 'content1-img', md: 10, xs: 24 },
  img: {
    children: addTest,
  },
  textWrapper: { className: 'content1-text', md: 14, xs: 24 },
  title: {
    className: 'content1-title',
    children: (
      <>
        <p>创建试卷</p>
      </>
    ),
  },
  content: {
    className: 'content1-content',
    children:
      '创建试卷为考试提前做好准备'
  },
};
export const Feature21DataSource = {
  wrapper: { className: 'home-page-wrapper content2-wrapper' },
  OverPack: { className: 'home-page content2', playScale: 0.3 },
  imgWrapper: { className: 'content2-img', md: 10, xs: 24 },
  img: {
    children: addTitle,
  },
  textWrapper: { className: 'content2-text', md: 14, xs: 24 },
  title: {
    className: 'content2-title',
    children: (
      <>
        <p>题库管理</p>
      </>
    ),
  },
  content: {
    className: 'content2-content',
    children:
      '创建题库，试题类型丰富，为考试做准备'
  },
};
export const Feature11DataSource = {
  wrapper: { className: 'home-page-wrapper content1-wrapper' },
  OverPack: { className: 'home-page content1', playScale: 0.3 },
  imgWrapper: { className: 'content1-img', md: 10, xs: 24 },
  img: {
    children: lookScore,
  },
  textWrapper: { className: 'content1-text', md: 14, xs: 24 },
  title: {
    className: 'content1-title',
    children: (
      <>
        <p>成绩分析</p>
      </>
    ),
  },
  content: {
    className: 'content1-content',
    children:
      '考试成绩分析，可视化数据，更加提高工作效率'
  },
};
export const Content110DataSource = {
  OverPack: {
    className: 'home-page-wrapper content11-wrapper k7ka6x4lja-editor_css',
    playScale: 0.3,
  },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children:
          'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        className: 'title-image',
      },
      {
        name: 'title',
        children: (
          <>
            <p>让考试更加方便的在线考试平台</p>
          </>
        ),
        className: 'title-h1',
      },
      {
        name: 'content',
        children: (
          <>
            <p>一个高效、便捷、简单的免费在线考试平台</p>
          </>
        ),
        className: 'title-content',
      },
      {
        name: 'content2',
        children: '快去注册使用吧',
        className: 'title-content',
      },
    ],
  },
  button: {
    className: '',
    children: {
      a: {
        className: 'button',
        href: '#',
        children: (
          <>
            <p>立即注册</p>
          </>
        ),
      },
    },
  },
};
export const Footer10DataSource = {
  wrapper: { className: 'home-page-wrapper footer1-wrapper' },
  OverPack: { className: 'footer1', playScale: 0.2 },
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block0',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          className: 'logo',
          children:
            'http://m.qpic.cn/psc?/V11aW8sd1QoVup/AAqA*OLIGuMLp9aQ5B1ShJidwUoodKfjzVorEnAHr.ktDNbakLpF2u6rAymPIKL03AuyZaYuLPaiPBmmcjOlkw!!/b&bo=QAGTAEABkwADCSw!&rf=viewer_4',
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'content0',
              children: (
                <>
                  <p>
                    <br />
                  </p>
                </>
              ),
            },
          ],
        },
      },
      {
        name: 'block1',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: '产品' },
        childWrapper: {
          children: [
            { name: 'link0', href: '#', children: '产品更新记录' },
            { name: 'link1', href: '#', children: 'API文档' },
            { name: 'link2', href: '#', children: '快速入门' },
            // { name: 'link3', href: '#', children: '参考指南' },
          ],
        },
      },
      {
        name: 'block2',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: '关于' },
        childWrapper: {
          children: [
            // { href: '#', name: 'link0', children: 'FAQ' },
            { href: '#', name: 'link1', children: '联系我们' },
          ],
        },
      },
      {
        name: 'block3',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: '备案号' },
        childWrapper: {
          children: [
            // { href: '#', name: 'link0', children: 'FAQ' },
            { href: '#', name: 'link1', children: '豫ICP备19041193号-1' },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page' },
  copyright: {
    
    className: 'copyright',
    children:
      'Copyright © 2020 Software Innovation Base Of ZhengZhou University Of Industry. All Rights Reserved',
  },
};
