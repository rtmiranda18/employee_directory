import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './styles/users.scss';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [update, setUpdate] = useState(false);
    const fetchUsers = async (name, action) => {
        await axios.get('https://randomuser.me/api/?seed=employees&results=20')
        .then((response) => {
            const {results} = response.data;
            setUsers(results); 
            console.log(response);
            switch (action) {
                case 'search':
                    const searchUsers = results.filter(user => user.name.first.includes(name));
                    setUsers(searchUsers);
                    break;
            
                default:
                    setUsers(results)
                    break;
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }   
    useEffect(() => {
        fetchUsers(null, '');
        return () => {
            setUpdate(false);
        }
    }, [update]);
    const [search, setSearch] = useState({user: ''})
    const searchUser = (event) => {
        const {name, value} = event.target;
        setSearch({...search, [name]: value});
        fetchUsers(value, 'search'); 
    }
   
    const sortByName = () => {
        const sortUsers = users.sort((a, b) => a.name.first.localeCompare(b.name.first))
        console.log(sortUsers);
        setUsers(sortUsers);
    }
    return (
      <div className="users">
        UsersTable
        <input type="text" name="user" placeholder="search" onChange={searchUser} value={search.user} />
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th onClick={sortByName}>Name</th>
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
  