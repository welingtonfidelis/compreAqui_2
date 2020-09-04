import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3001',
  cache: new InMemoryCache()
});

function App() {
  const [file, setFile] = useState(null);
  // const [updateFile] = useMutation(UPLOAD);


  useEffect(() => {
    async function test() {
      const query = await client.query({
        query: gql`
          query test {
            test
          }
        `
      });

      console.log('RESULT', query);
    }

    test()
  })

  async function readFileAsDataURL(file) {
    let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });

    console.log(result_base64); // aGV5IHRoZXJl...

    return result_base64;
}

  async function uploadFile() {
    console.log(file);

    let tmp = await readFileAsDataURL(file);

      const query = await client.mutate({
        mutation: gql`
        mutation singleUpload($file: String!) {
          singleUpload(file: $file) 
        }
      `,
        variables: {
          file: tmp
        }
      });

      console.log(query);
      
    // let reader = new FileReader();
    // reader.readAsDataURL(file);

    // if(reader.onloadend) {
    //   console.log(reader.result);
    // }
    // reader.onloadend = async () => {
    //   tmp = reader.result
    //   //   this.setState({
    //   //     file: file,
    //   //     base64: reader.result
    //   //   });
    //   //   this.handleSubmit()
    //   console.log(tmp);
    //   const query = await client.mutate({
    //     mutation: gql`
    //     mutation singleUpload($file: String!) {
    //       singleUpload(file: $file) 
    //     }
    //   `,
    //     variables: {
    //       file: tmp
    //     }
    //   });

    //   console.log(query);
    // };


    // const query = await client.mutate({
    //   mutation: gql`
    //     mutation test($name: String!) {
    //       test(name: $name)
    //     }
    //   `,
    //   variables: {
    //     name: "welington"
    //   }
    // });

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <input
        type="file"
        id="file"
        onChange={(e) => setFile(e.target.files[0])}
      // style={{ display: "none" }}
      />
      <button onClick={uploadFile}>ENVIAR</button>
    </div>
  );
}

export default App;
