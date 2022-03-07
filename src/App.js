import logo from './logo.svg';
import './App.css';
// import {
//   useMoralis,
//   useMoralisWeb3Api,
//   useMoralisWeb3ApiCall,
// } from "react-moralis";
import {useEffect, useState} from "react";
import {Button,Center,Box,Input,Divider} from "@chakra-ui/react";
import axios from 'axios';
var Web3 = require("web3");
// import {Moralis} from 'moralis';
// const ENS = require('ethjs-ens')
// // const ENS = require('../')
// const HttpProvider = require('ethjs-provider-http')
// import Web3Helper from './Web3Helper';
 



function App() {
  // const {web3,enableWeb3,isWeb3Enabled} = useMoralis();
  // const Web3Api = useMoralisWeb3Api();
  const [domainName, setDomainName] = useState("");
  const [ensAddress, setEnsAddress] = useState("");

  const getDomain = async (wallet) => {
    const endpoint = "https://unstoppabledomains.com/api/v1/resellers/udtesting/domains"

    const apiURL = endpoint + "?owner=" + wallet + "&extension=crypto";

    return await fetch(apiURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let response = {
          success: false,
          cns: "",
        };

        if (responseJson["domains"].length > 0) {
          response.success = true;

          let cns = '';
          responseJson["domains"].map((item, i) => {
            cns = cns + item["name"];

            if (i != responseJson["domains"].length - 1) {
              cns = cns + " | ";
            }
          })

          if (responseJson["domains"].length > 1) {
            cns = `${cns}`;
          }

          response.cns = cns;
        }
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.warn(error);
        return error;
      });
  
  }
  
  const handleDomainChange = (event) => setDomainName(event.target.value);

  // const {
  //   fetch: fetchAddressForDomain,
  //   data,
  //   error,
  //   isLoading,
  // } = useMoralisWeb3ApiCall(
  //   Web3Api.resolve.resolveDomain,
  //   {
  //     currency: "eth",
  //     domain: domainName,
  //   },
  //   {autoFetch: false}
  // );
  // let provider;

  const fetchAddressForDomain = () => {
    
  }

  const ensCall = async() => {
    // const provider = new HttpProvider('https://mainnet.infura.io/v3/96dd03e696ab43f292aace33d937859b')
    // console.log(provider);
    // // const provider = web3.currentProvider
    // // setupEns(provider)

    // const ens = new ENS({ provider, network: '1' })
    // const ens = new ENS({ provider: window.ethereum, network: 1 });
    // const name = 'vitalik.eh';
    // try {
    //   const result = await ens.lookup(name);
    //   console.log("adddress", result);
    //   // console.log("is the same", address === result);
    // } catch (e) {
    //   console.log("lookup", e);
    // }
    // console.log(domainName);
    console.log('function running');
    
    const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/4ff53a5254144d988a8318210b56f47a');
    var web3 = new Web3(provider);
    var ens = web3.eth.ens;
    var address = await ens.getAddress("mrjaf.eth");
    console.log({
      address,
    });
  

    // Web3Helper.resolveBlockchainDomain('vitalik.eth', "ETH")
    //     .then((address) => {
    //       console.log(address);
    //       setEnsAddress(address);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
 
    // ens.lookup('vitalik.eth')
    // ens.lookup(domainName)
    // ens.lookup('vitalik.eth')
    // .then((address) => {
    //   // const expected = '0x5f8f68a0d1cbc75f6ef764a44619277092c32df0'
   
    //   // if (address === expected) {
    //   //   alert("That's how you do it!")
    //   // }
    //   console.log(address);
    //   setEnsAddress(address);
    // })
    // .catch((reason) => {
    //   // There was an issue!
    //   // Maybe the name wasn't registered!
    //   console.error(reason)
    // })
    
    // catch(err => {console.log(err)})
//     console.log(domainName);
//     const options = { currency: 'eth', domain: domainName };
// const resolve = await Moralis.Web3API.resolve.resolveDomain(options );
// console.log(resolve);

  }

//   useEffect(() => {
//   // For MetaMask or Mist compatibility:
// if (typeof window.web3 !== 'undefined') {
//   setupEns(web3.currentProvider)
// } else {
//    provider = new HttpProvider('https://ropsten.infura.io')
//   setupEns(provider)
// }
//   },[]);
  
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
       { "Enter valid Unstoppable domain"}
     </Center>
     <Center style={{fontWeight: "700"}}>
       Ens Domain: {ensAddress ? ensAddress: "Enter valid Ens Domain"}
     </Center>

   </Box>
  );
}

export default App;
