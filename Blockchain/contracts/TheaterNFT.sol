// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Theater is ERC721URIStorage {
    address public admin;
    uint256 public ticketPrice;
    uint256 public totalTicketsSold;

    string public showName = "2:30 Show";

    mapping(address => uint256[]) public userTickets;
    mapping(uint256 => address) public ticketOwners; // Mapping token ID to its owner
    mapping(uint256 => bool) public burnedTickets; // Mapping to keep track of burned tickets

    event TicketPurchased(address indexed buyer, uint256 tokenId);
    event TicketBurned(uint256 tokenId);

    constructor() ERC721("TheaterTicket", "TIX") {
        admin = msg.sender;
        ticketPrice = 0.0000000001 ether; // Setting ticket price to 0.001 ether
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function buyTicket(string memory _tokenURI) external payable returns (bool) {
        require(msg.value >= ticketPrice, "Insufficient payment");
        require(totalTicketsSold < 100, "All tickets sold out");

        uint256 tokenId = totalTicketsSold + 1; // Unique token ID based on total tickets sold
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI); // Set the token URI
        totalTicketsSold++;
        userTickets[msg.sender].push(tokenId);
        ticketOwners[tokenId] = msg.sender; // Record the owner of the token

        emit TicketPurchased(msg.sender, tokenId);

        return true; // Return true upon successful ticket purchase
    }

    function getOwnedTickets() external view returns (uint256[] memory) {
        return userTickets[msg.sender];
    }

    function changeTicketPrice(uint256 _newPrice) external onlyAdmin {
        ticketPrice = _newPrice;
    }

    function checkTicket(uint256 _tokenId) external  returns (bool) {
        require(!_isBurned(_tokenId), "Ticket already burned");

        // Perform ticket validation logic here
        bool isValid = true; // Placeholder for validation logic

        if (isValid) {
            _burn(_tokenId);
            emit TicketBurned(_tokenId);
            _removeTicketFromUser(msg.sender, _tokenId);
        }

        return isValid;
    }

    function _removeTicketFromUser(address _user, uint256 _tokenId) internal {
        uint256[] storage tickets = userTickets[_user];
        for (uint256 i = 0; i < tickets.length; i++) {
            if (tickets[i] == _tokenId) {
                tickets[i] = tickets[tickets.length - 1];
                tickets.pop();
                break;
            }
        }
    }

    function _isBurned(uint256 _tokenId) internal view returns (bool) {
        return burnedTickets[_tokenId];
    }

    function withdraw() external onlyAdmin {
        payable(admin).transfer(address(this).balance);
    }
}

// 0xD663f267A074CE8A3580872DbD953981F4d83029  