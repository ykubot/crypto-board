(function($){
    $(function(){

        $('.button-collapse').sideNav();

        const PROVIDER_NETWORK = "http://localhost:8545";

        // Rinkeby
        // const PROVIDER_NETWORK = "https://www.rinkeby.io/";
        // const ETHERSCAN_URL = "https://rinkeby.etherscan.io/tx/";

        // Main net
        const ETHERSCAN_URL = "https://etherscan.io/tx/";

        const CONTRACT_ABI = [
            {
              "constant": true,
              "inputs": [
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "messages",
              "outputs": [
                {
                  "name": "writerAddress",
                  "type": "address"
                },
                {
                  "name": "nickName",
                  "type": "string"
                },
                {
                  "name": "message",
                  "type": "string"
                },
                {
                  "name": "topic",
                  "type": "bytes32"
                },
                {
                  "name": "postTime",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "name": "_index",
                  "type": "uint256"
                }
              ],
              "name": "getWriterAccount",
              "outputs": [
                {
                  "name": "",
                  "type": "address"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "getMessageCount",
              "outputs": [
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "_nickName",
                  "type": "string"
                },
                {
                  "name": "_message",
                  "type": "string"
                },
                {
                  "name": "_topic",
                  "type": "bytes32"
                }
              ],
              "name": "postMessage",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "name": "_index",
                  "type": "uint256"
                }
              ],
              "name": "getMessage",
              "outputs": [
                {
                  "name": "",
                  "type": "address"
                },
                {
                  "name": "",
                  "type": "string"
                },
                {
                  "name": "",
                  "type": "string"
                },
                {
                  "name": "",
                  "type": "bytes32"
                },
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "name": "",
                  "type": "address"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "getWriterCount",
              "outputs": [
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "writerAccounts",
              "outputs": [
                {
                  "name": "",
                  "type": "address"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "getWriterAccounts",
              "outputs": [
                {
                  "name": "",
                  "type": "address[]"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "name": "writerAddress",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "name": "nickName",
                  "type": "string"
                },
                {
                  "indexed": false,
                  "name": "message",
                  "type": "string"
                },
                {
                  "indexed": false,
                  "name": "topic",
                  "type": "bytes32"
                },
                {
                  "indexed": false,
                  "name": "postTime",
                  "type": "uint256"
                }
              ],
              "name": "MessageInfo",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            }
        ];

        // localhost
        // const CONTRACT_ADDRESS = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
        // Rinkeby
        // const CONTRACT_ADDRESS = '0xb21b1416f324c7b07626b91d019febbd396678a0';
        // Mainnet
        const CONTRACT_ADDRESS = '0xca30013b99cf01fe4d9c6f83b66bfa3800d842db';

        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_NETWORK));
        }

        web3.eth.net.getId()
        .then((netId) => {
            switch (netId) {
                case 1:
                    console.log('This is mainnet');
                    web3.eth.getAccounts()
                    .then((accounts) => {
                        let defaultAccount = accounts[0];
                        if (defaultAccount) {
                            $("#myAddress").html('Your Address: ' + defaultAccount);
                            web3.eth.getBalance(defaultAccount, function (error, result) {
                                if (!error) {
                                    let ether_balance = web3.utils.fromWei(result);
                                    $("#myBalance").html('Balance: ' + ether_balance + ' ether');
                                } else {
                                    console.error(error);
                                }
                            });
                        } else {
                            $("#no-send-message").html('Your address is disable. <br>Please unlock Metamask. ');
                            $(".address-area").css("display", "none");
                            $("#button").addClass('disabled');
                        }

                    });
                    break;
                case 2:
                    console.log('This is the deprecated Morden test network.');
                    $("#no-send-message").html('This is the deprecated Morden test network.');
                    $(".address-area").css("display", "none");
                    $("#button").addClass('disabled');
                    break;
                case 3:
                    console.log('This is the Ropsten test network.');
                    $("#no-send-message").html('This is the Ropsten test network.');
                    $(".address-area").css("display", "none");
                    $("#button").addClass('disabled');
                    break;
                case 4:
                    console.log('This is the Rinkeby test network.');
                    $("#no-send-message").html('This is the Rinkeby test network.');
                    web3.eth.getAccounts()
                    .then((accounts) => {
                        console.log(accounts[0]);
                        let defaultAccount = accounts[0];
                        if (defaultAccount) {
                            $("#myAddress").html('Your Address: ' + defaultAccount);
                            web3.eth.getBalance(defaultAccount, function (error, result) {
                                if (!error) {
                                    let ether_balance = web3.utils.fromWei(result);
                                    $("#myBalance").html('Balance: ' + ether_balance + ' ether');
                                } else {
                                    console.error(error);
                                }
                            });
                        } else {
                            $("#no-send-message").html('Your address is disable. <br>Please unlock Metamask. ');
                            $(".address-area").css("display", "none");
                            $("#button").addClass('disabled');
                        }
                    });
                    break;
                case 42:
                    console.log('This is the Kovan test network.');
                    $("#no-send-message").html('This is the Kovan test network.');
                    $(".address-area").css("display", "none");
                    $("#button").addClass('disabled');
                    break;
                default:
                    console.log('This is an unknown network.');
                    $("#no-send-message").html('This is an unknown network. ');
                    $(".address-area").css("display", "none");
                    $("#button").addClass('disabled');
                    break;
            }
        });

        let Cryptoboard = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        // メッセージ更新イベントを定義
        // let cryptoboardEvent = Cryptoboard.MessageInfo({}, 'latest');
        //
        // // メッセージ更新イベントを監視(Metamaskだと動かない)
        // cryptoboardEvent.watch((err, result) => {
        //     if (!err) {
        //         // if (result.blockHash != $("#insTrans").html())
        //         //     $("#loader").hide();
        //
        //         // console.log(result);
        //         // let block_hash_html = 'Block hash: <a href="' + ETHERSCAN_URL + result.blockHash + '">' + result.blockHash + '</a>';
        //         // $("#insTrans").html(block_hash_html);
        //         // // If byte32, use web3.toAscii
        //         // $("#post-user").html(result.args.nickName);
        //         // $("#post-time").html(convertUnixtimeToDate(result.args.postTime.c[0]));
        //         // $("#post-message").html(result.args.message);
        //         get_messages();
        //     } else {
        //         $("#loader").hide();
        //     }
        // });

        // メッセージリストを取得
        async function get_messages() {
            let count = await get_message_count();
            let messages_html = '';
            // console.log(count);
            if(count > 0) {
                $("#messageCount").html(count + ' messages');
                for (let i = 0; i < count; i++) {
                    result = await get_message(i);
                    if (result) {
                        // console.log(result);
                        let message_html = '<div class="message-list">';
                        message_html += '<span id="post-user">' + result[1].toString() + '</span>';
                        message_html += '<span id="post-time">' + convertUnixtimeToDate(result[4]).toString() + '</span>';
                        message_html += '<p id="post-message">' + result[2].toString() + '</p>';
                        message_html += '</div>'
                        messages_html = message_html + messages_html;
                        if (i === count - 1) {
                            $("#messages").html(messages_html);
                            $("#message-loader").hide();
                        }
                    }
                }
            }
        }

        function get_accounts() {
            return web3.eth.getAccounts();
        }

        function get_message_count() {
            return Cryptoboard.methods.getMessageCount().call();
        }

        function get_message(id) {
            return Cryptoboard.methods.getMessage(id).call();
        }

        async function post_message(from, name, message, category) {
            return Cryptoboard.methods.postMessage(name, message, web3.utils.asciiToHex(category))
            .send({from: from, gas: 210000})
            .on("receipt", function(receipt) {
                console.log(receipt);
            })
            .on("error", function(error) {
                $("#loader").hide();
                console.log(error);
            });
        }

        // メッセージ投稿
        $("#button").click(async function() {
            $("#loader").show();
            let accounts = await get_accounts();

            let result = await post_message(accounts[0], $("#name").val(), $("#message").val(), 'main');
            // console.log(result);
            if (result) {
                let block_hash_html = 'Block hash: <a href="' + ETHERSCAN_URL + result.blockHash + '">' + result.blockHash + '</a>';
                $("#insTrans").html(block_hash_html);
                $("#post-user").html($("#name").val());
                $("#post-message").html($("#message").val());
                $("#loader").hide();
                $("#name").val('');
                $("#message").val('');
                $(".posted-message-area").css("display", "block");
            }
        });

        get_messages();

        let convertUnixtimeToDate = (timestamp) => {
            var d = new Date( timestamp * 1000 );
            var year  = d.getFullYear();
            var month = d.getMonth() + 1;
            var day  = d.getDate();
            var hour = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
            var min  = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
            var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
            let result = year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;
            return result;
        }

    }); // end of document ready
})(jQuery); // end of jQuery name space
