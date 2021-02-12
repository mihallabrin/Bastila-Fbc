import React, { useEffect, useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { listBlogs } from './graphql/queries';
import Amplify, { API, graphqlOperation } from 'aws-amplify';

import Dynamsoft from 'dynamsoft-javascript-barcode';

import './App.css';

function App() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const result: any = await API.graphql(graphqlOperation(listBlogs));
      const blogs = result.data.listBlogs.items;

      setBlogs(blogs);
    } catch (error) {
      console.log(error);
    }
  }

  let scanner = null;

  (async () => {
    scanner = await Dynamsoft.BarcodeScanner.createInstance();
    scanner.onFrameRead = (results) => {
      console.log(results);
    };
    scanner.onUnduplicatedRead = (txt, result) => {
      alert(txt);
    };
    await scanner.show();
  })();

  return (
    <div className='App'>
      <header className='App-header'>Header</header>
      <div>
        {blogs.map((blog: any) => (
          <div key={blog.id}>{blog.name}</div>
        ))}
      </div>
    </div>
  );
}

export default withAuthenticator(App);
