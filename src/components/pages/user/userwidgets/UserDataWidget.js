import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import {UserlistContext} from '../../../../context/userlistContext/UserlistContext'
import {deleteUser,getUsers} from '../../../../context/userlistContext/apiCalls'
import './Userdatawidget.scss'
const UserDataWidget = () => {
    const { user, dispatch } = useContext(UserlistContext);
    
    useEffect(() => {
        getUsers(dispatch);
      }, [dispatch]);
    
      const handleDelete = (id) => {
        deleteUser(id, dispatch);
      };
      
      const columns = [
        { field: "_id", headerName: "ID", width: 220 },
       
        { field: "isAdmin", headerName: "admin", width: 220 },
        {
          field: "email",
          headerName: "User",
          width: 300,
          renderCell: (params) => {
            return (
              <div className="productListItem">
               
                {params.row.email}
              </div>
            );
          },
        },
        
        {
          field: "action",
          headerName: "Action",
          width: 300,
          renderCell: (params) => {
            return (
              <>
                <Link
                  to={{ pathname: "/user/" + params.row._id, user: params.row }}
                >
                  <button className="productListEdit">Edit</button>
                </Link>
                <DeleteOutlineIcon
                  className="productListDelete"
                  onClick={() => handleDelete(params.row._id)}
                />
              </>
            );
          },
        },
      ];
 
 
    return (
        <div style={{ height: 500, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
          <DataGrid
          rows={user}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          getRowId={(r) => r._id}
        />
          </div>
        </div>
      </div>
       
  )
}

export default UserDataWidget
