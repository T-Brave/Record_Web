import React from "react";
import menus from "../../router/menus";
import { Menu } from "antd";
import { FileWordOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

class SubMenu extends React.Component{
    constructor(props) {
        super(props);
    };

    renderSubmenu = ({ title,icon,key,subs }) => {
        return(
            <Menu.SubMenu
                key={key}
                title={
                    <span>
                        {icon && <FileWordOutlined />}/>}
                        <span>
                            {title}
                        </span>
                    </span>
                }
            >
                {subs && subs.map(item => {
                    return item.subs && item.subs.length >0 ? this.renderSubmenu(item):this.renderMenuItem(item)
                })}
            </Menu.SubMenu>
        )
    }
    renderMenuItem = ({ title,icon,key }) => {
        return(
            <Menu.Item
                key={key}
                onClick={(e) => this.clickMenu(title,icon)}
            >
                <Link to={key}>
                    {icon && <FileWordOutlined />}
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        )
    }
    
    clickMenu = (title, icon) => {
        this.props.titleData(title)//这个地方把值传递给了props的事件当中
    }

    render() {
        return(
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/recording']}
                style={{ lineHeight: '64px' }}
              >
                {menus.map(item =>{
                    return item.subs && item.subs.length > 0 ? this.renderSubmenu(item):this.renderMenuItem(item)
                })}
              </Menu>
        )
    }
}

export default SubMenu;