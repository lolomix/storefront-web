// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    
    Counters.Counter private itemsCounter;

    // Address of the NFT marketplace contract
    // that will handle the NFTs after mint.
    address private delegateAddress;

    constructor (
        address marketplaceAddress,
        string memory name, 
        string memory symbol) ERC721(name, symbol) {
        delegateAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
        itemsCounter.increment();

        uint256 newItemId = itemsCounter.current();
        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(delegateAddress, true);
        
        return newItemId;
    }
}