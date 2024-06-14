import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Authorize = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authorizeUser = async () => {
      const tokenvalue = localStorage.getItem('token');
      
      if (tokenvalue === null) {
        console.log('Navigate to signin');
        navigate('/signin');
      } else {
        console.log(tokenvalue);
        try {
          const response = await axios.post(
            'http://localhost:3002/api/v1/user/authorize',
            {},
            {
              headers: {
                Authorization: 'bearer ' + tokenvalue
              }
            }
          );

          console.log(response.status);

          if (response.status === 200) {
            // Authorization successful, do nothing
            return;
          } else {
            // Authorization failed, navigate to signin
            navigate('/signin');
          }
        } catch (error) {
          console.error('Error occurred during authorization:', error);
          // Navigate to signin on error
          navigate('/signin');
        }
      }
    };

    authorizeUser();
  }, [navigate]);

  return null;
};

export default Authorize;
