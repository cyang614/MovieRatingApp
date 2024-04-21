import {Menu} from "semantic-ui-react";
import { Link } from "react-router-dom";
export const Navbar= ()=>{
    return(
        <Menu fixed="top" size="huge">
            <Menu.Item as={Link} to="/" style={{fontSize : "1.5rem"}}>
                    首頁
            </Menu.Item>

            <Menu.Item as={Link} to="/rated" style={{fontSize : "1.5rem"}}>
                    已評價
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item as={Link} to="/auth" style={{fontSize:"1.5rem"}}> 
                    認證 
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}