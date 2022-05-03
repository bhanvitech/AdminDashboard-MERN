import * as React from 'react';
import './Navbar.scss'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom'
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
const Navbar = ({heading}) => {
  const status=true;

  let data;
  //Dynamic title for our Navbar heading 
  switch(heading){
    //Dashboard page title
    case 'dashboard':
      data={
        title:"Overview",
        
      };
      break;
      //Query Page titlt
      case 'query':
        data={
          title:"Query",
          
        };
        break;
        case 'users':
          data={
            title:"List",
            
          };
          break;
          case 'profile':
            data={
              title:"Profile",
              
            };
            break;
        default:
          break;

  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  return (
    <div className='navbar'>
        <span className='dashboardspan'>
         {data.title}
        </span>
        <div className="wrapper">
            <div className="title"></div>
           {/* <Avatar src='https://www.flaticon.com/free-icons/avatar' alt='' className='avatar'/> */}
           <span >
              {status? <span style={{marginLeft:'5px',color:'green',fontWeight:'bolder',letterSpacing:'0.5px'}}>ONLINE</span>:<span style={{marginLeft:'5px',color:'red',fontWeight:'bolder',letterSpacing:'0.5px'}}>OFFLINE</span> }
              {status?<FiberManualRecordSharpIcon style={{marginLeft:'5px',width: '12px', height:'12px',color:'green'}}/>:<FiberManualRecordSharpIcon style={{marginLeft:'5px',width: '12px', height:'12px',color:'red'}}/>}

           </span>
           <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar className='avatar'></Avatar>
          </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
         <Link to='/' style={{textDecoration : "none"}}>Logout</Link>
        </MenuItem>
      </Menu>
        </div>
    
    </div>
  )
}

export default Navbar
