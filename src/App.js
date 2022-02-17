import logo from './logo.svg';
import './App.css';
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import {useEffect, useState} from "react";
import {Button,Center,Box,Input,Divider} from "@chakra-ui/react";
import {Moralis} from 'moralis';

function App() {
  const {web3,enableWeb3,isWeb3Enabled} = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const [domainName, setDomainName] = useState("");
  const [ensAddress, setEnsAddress] = useState("");
  
  const handleDomainChange = (event) => setDomainName(event.target.value);

  const {
    fetch: fetchAddressForDomain,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(
    Web3Api.resolve.resolveDomain,
    {
      currency: "eth",
      domain: domainName,
    },
    {autoFetch: false}
  );

  const ensCall = async() => {
    // web3.eth.ens.getAddress(domainName).then( (address) => {
    //   setEnsAddress(address);
    // }).
    // catch(err => {console.log(err)})
    console.log(domainName);
    const options = { currency: 'eth', domain: domainName };
const resolve = await Moralis.Web3API.resolve.resolveDomain(options );
console.log(resolve);

  }

  useEffect(() => {
    if(!isWeb3Enabled) {
      enableWeb3();
    }
  },[isWeb3Enabled,enableWeb3]);
  
  return (
   <Box display={"block"} p={35} className="App">
     <Center>
       <Input
        value={domainName}
        onChange = {handleDomainChange}
        placeholder = "enter domain name"
        size="sm"
        style={{
          height:"auto",
          width:"50%"
        }}
       />
       <Button
        onClick={fetchAddressForDomain}
        style={{color:"blue", fontWeight: "700"}}
       >
         Resolve the Unstopable Domain{" "}
       </Button>
       <Button onClick={ensCall} style={{color:"blue", fontWeight:"700"}}>
         Resolve theENS Domain{" "}
       </Button>
     </Center>
     <br />
     <Center style={{fontWeight:"700"}}>
       Unstopable Domains:{" "}
       {data ? data.address: "Enter valid Unstoppable domain"}
     </Center>
     <Center style={{fontWeight: "700"}}>
       Ens Domain: {ensAddress ? ensAddress: "Enter valid Ens Domain"}
     </Center>

   </Box>
  );
}

export default App;
