pragma solidity ^0.5.13;


contract Animus {

  mapping(address => string) public ids;

  function storeIdentity(address _address, string memory hash) public {
      if (msg.sender != _address) return;
      ids[_address] = hash;
  }

}