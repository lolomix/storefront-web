// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import './nft.sol';

contract Market is ReentrancyGuard {
    address payable private owner;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 tokenId;
        address nftContract;
        address payable seller;
        address payable owner;
        uint256 price;
        uint8 royalties;
    }

    // Owner address => ( Item ID => Metadata )
    // mapping(address => mapping(uint256 => MarketItem)) private itemsByOwner;
    
    mapping(address => address) private itemCreatorMemory;

    mapping(address => MarketItem) private itemsForSale;

    event MarketItemCreated (
        uint256 tokenId,
        address indexed nftContract,
        address seller,
        address owner,
        uint256 price, 
        uint8 royalties
    );
    
    function createMarketItem(
        uint256 tokenId,
        address nftContract,
        uint256 price,
        uint8 royalties
    ) public nonReentrant {
        require(
            price > 0, 
            "Free items aren't allowed"
            ); // prevent free items
            
        // We might also need to
        //  limit the upper bound so that a 100% royalties
        //  don't wreck the secondary sale.
        require(
            royalties < 50,
            "Royalties can have a maximum of 50% share. Choose a lower percentage.");

        // If the contract has no NFT <> Creator 
        // relationship, it is being marketed for the
        // first time, hence we assume it was just minted
        // and the sender is the creator.
        if (itemCreatorMemory[nftContract] == address(0)) {
            itemCreatorMemory[nftContract] = msg.sender;
        }
        
        itemsForSale[nftContract] = MarketItem(
            tokenId,
            nftContract,
            payable(msg.sender), // seller (creator) address
            payable(msg.sender), // owner (handler) address
            price, 
            royalties
        );

        emit MarketItemCreated(
            tokenId,
            nftContract,
            msg.sender,
            msg.sender,
            price,
            royalties
        );
    }

    function createMarketSale(
        uint256 tokenId,
        address nftContract, 
        bool withdraw) 
        public payable nonReentrant {
        uint256 price = itemsForSale[nftContract].price;
        
        require(
            msg.value == price, 
            string(abi.encodePacked("The required price to complete the purchase is: ", price)
            )); // ensure market price payment
        
        // Ensuring a zero royalties percentage results
        // in no royalties payouts. 
        uint8 royaltiesPercentage = itemsForSale[nftContract].royalties > 0 
            ? itemsForSale[nftContract].royalties 
            : 100;
        
        uint256 royaltiesPayout = price - (price * (royaltiesPercentage / 100));
        uint256 salePayout = price - royaltiesPayout;
        address creator = itemCreatorMemory[nftContract];
        address seller = itemsForSale[nftContract].seller;
        
        // The sale operation is broken down into 
        //  reentrance-safe steps that ensure no
        //  there are no exploitation gaps
        // ------------------------------- 
        // 1 - Execute sale operation
        itemsForSale[nftContract].owner = payable(msg.sender);
        // 2 - Pay royalties to the creator
        payable(creator).transfer(royaltiesPayout);
        // 3 - Pay profits to the seller
        payable(seller).transfer(salePayout);
        // 4 - If the user chooses to move the NFT elsewhere, it is released to his own address
        if (withdraw) {
            ERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        }        
    }
}