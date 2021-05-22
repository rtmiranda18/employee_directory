import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/users.scss';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [update, setUpdate] = useState(false);
    const fetchUsers = async () => {
        await axios.get('https://randomuser.me/api/?results=20')
        .then((response) => {
            const {results} = response.data;
            setUsers(results); 
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }   
    useEffect(() => {
        fetchUsers();
        return () => {
            setUpdate(false);
        }
    }, [update])
    return (
      <div className="users">
        UsersTable
        {
            users.map((user, index) => 
                <div className="user" key={index}>
                    {user.name.first}  {user.name.last}
                </div>
            )
        }
      </div>
    );
  }
  
  
  export default UsersTable;
  