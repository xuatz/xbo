import React from 'react';
import moment from 'moment';

const Push = (props) => {
  let { data } = props;
  let { type, modified, title, url } = data;
  switch (type) {
    case 'link': {
      return (
        <div>
          <p>{moment.unix(modified).format('dddd, MMMM Do YYYY, h:mm a')}</p>
          <p> {title} </p>
          <p> {url} </p>
        </div>
      );
    }
    default: {
      return (
        <div>
          <h3>unhandled type: {type}</h3>
          <pre>{JSON.stringify(data, 0, 2)}</pre>
        </div>
      );
    }
  }
};

export default Push;
