pragma solidity ^0.4.18;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() public {
    owner = msg.sender;
  }


  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }


  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}

contract CryptoBoard is Ownable {
    
    struct Message {
        address writerAddress;
        string nickName;
        string message;
        bytes32 topic;
        uint256 postTime;
    }
    
    address[] public writerAccounts;
    Message[] public messages;
    
    function CryptoBoard() public {
        owner = msg.sender;
    }
    
    event MessageInfo(
        address writerAddress,
        string nickName,
        string message,
        bytes32 topic,
        uint256 postTime
    );
    
    function postMessage(string _nickName, string _message, bytes32 _topic) public {
        
        messages.push(Message({
            writerAddress: msg.sender,
            nickName: _nickName,
            message: _message,
            topic: _topic,
            postTime: now
        }));
        
        writerAccounts.push(msg.sender);
        
        MessageInfo(msg.sender, _nickName, _message, _topic, now);
    }
    
    function getWriterAccounts() view public returns (address[]) {
        return writerAccounts;
    }

    function getWriterAccount(uint256 _index) view public returns (address) {
        return writerAccounts[_index];
    }

    function getWriterCount() view public returns (uint) {
        return writerAccounts.length;
    }

    function getMessage(uint256 _index) view public returns (address, string, string, bytes32, uint256) {
        return (messages[_index].writerAddress, messages[_index].nickName, messages[_index].message, messages[_index].topic, messages[_index].postTime);
    }

    function getMessageCount() view public returns (uint) {
        return messages.length;
    }
        
}
