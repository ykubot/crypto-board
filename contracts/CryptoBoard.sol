pragma solidity ^0.4.18;
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

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

        messages.push(Message(msg.sender, _nickName, _message, _topic, now));
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
