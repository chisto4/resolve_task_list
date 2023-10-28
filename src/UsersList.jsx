import React, { useEffect, useState } from 'react';

const UsersList = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);

    const getUsersList = async () => {
        let response;
        let url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`;
        response = await fetch(url);
        let json = await response.json();
        if (response.status === 200) {
            setUsers(json)
        } else {
            console.log('Response Error');
        }
    };

    const nextPage = () => {
        setPage(page + 1);
    };
    const beforePage = () => {
        return page !== 1 ? setPage(page - 1) : null
    };

    useEffect(() => {
        getUsersList();
    }, [nextPage, beforePage])

    useEffect(() => {
        getUsersList();
        console.log('users :>> ', users);
    }, [])

    return (
        <>
            <header>
                <h1>USER's POST's</h1>
            </header>
            <div className='posts_wrapper'>
                {users.length > 0 ? users.map(((item, index) => {
                    return (
                        <div className='postWrapper' key={index}>
                            <h4>{item.title}</h4>
                            <p>{item.body}</p>
                            <span># {item.id}</span>
                        </div>
                    )
                })) : 'please try letter...'}
            </div>
            <div>
                <button onClick={beforePage}>Back</button>
                <button onClick={getUsersList}>Get Users</button>
                <button onClick={nextPage}>Next</button>
            </div>
        </>
    )
};

export default UsersList;
