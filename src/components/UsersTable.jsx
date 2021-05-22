import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
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
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>DOB</th>
                </tr>
            </thead>
            <tbody>
            {
                users.map((user, index) => 
                    <tr key={index}>
                        <td>
                            <div className="profilePicture">
                                <img src={user.picture.medium} alt="profile" />
                            </div>
                        </td>
                        <td>
                            {user.name.first}  {user.name.last}
                        </td>
                        <td>
                            {user.phone}
                        </td>
                        <td>
                            {user.email}
                        </td>
                        <td>
                            {moment(user.dob.date).format('MMMM DD, YYYY')}
                        </td>
                    </tr>
                )
            }
            </tbody>
        </table>
      </div>
    );
  }
  
  
  export default UsersTable;
  