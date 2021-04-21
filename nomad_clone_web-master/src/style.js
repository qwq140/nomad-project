import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  .logo {
    width: 38px;
  }

  .ant-layout-header {
    display:flex;
    position:fixed;
    width:100%;
    align-items:center;
    background:rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(15px);
    padding:0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    z-index: 100;
    .ant-row{
      background:rgba(255, 255, 255, 0.7);
    }
    ul{
      background:transparent;
      border-bottom:none;
    }
  }
  .ant-layout-header .ant-row {width:100%}
  .ant-menu-horizontal{
    width: 100%;
    display:flex; 
  }
  .ant-menu-item.ant-menu-item-only-child{border-bottom: none; }
  .ant-menu-item.ant-menu-item-only-child.ant-menu-item-selected {border-bottom: 0;}
  .ant-menu-item.ant-menu-item-only-child.ant-menu-item-active:hover{border-bottom: 0;}
  .ant-menu-submenu.ant-menu-submenu-horizontal.ant-menu-overflowed-submenu{border-bottom: 0;}
  .ant-menu-submenu.ant-menu-submenu-horizontal.ant-menu-overflowed-submenu:hover{border-bottom: 0;}
  .ant-menu-item.ant-menu-item-only-child.header_right{
    margin-left:auto;
  }
  .ant-layout-content {padding-top:64px;}

  .ant-layout-footer {background-color:white; padding: 24px 30px;}
  .footer_info {display:flex;flex-wrap:wrap; color:#828894;justify-content:center;}
  .footer_info h4 {color:#828894;font-size:900;}
  .footer_info > div {flex:1;padding-top:40px;}
  .footer_company{min-width:350px;}
  .footer_navigations{min-width:350px;display:flex;}
  .footer_navigations ul {padding:0;}
  .footer_navigations li {list-style:none;margin-top:10px}
  .footer_navigations li a {color:#828894;}
  .footer_navigations > div {flex:1;}
  .footer_mark{min-width:350px;display:flex; flex-direction:column;align-items:center;padding-top:40px;}
  .footer_mark img {width: 3.5rem;}
  .footer_copyright {display:flex;flex-wrap:wrap; border-top: 1px solid #E5E7EB;margin-top:30px;padding-top:30px;}

  .footer_copyright svg {width:20px;}
  .footer_copyright p {min-width:350px; color:#828894;}
  .footer_copyright > div > div span {visibility:hidden; width:1px;position:absolute;}
  .footer_copyright > div {margin-left:auto; display:flex; align-items:center;}
  .footer_copyright > div > div {margin-left:15px; color:#828894;}
`;
