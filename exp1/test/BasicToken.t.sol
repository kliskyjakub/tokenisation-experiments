// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Test, console2} from "forge-std/Test.sol";
import {BasicToken} from "../src/BasicToken.sol";

contract BasicTokenTest is Test {
    BasicToken public bt;

    address[] recipients;
    address testingAddress = 0x000000000000000000000000000000000000dEaD;
    address testingAddress2 = 0x000000000000000000000000000000000000deA1;
    address testingAddress3 = 0x000000000000000000000000000000000000dEa2;

    function setUp() public {
        // make testingAddress the owner of the contract
        vm.prank(testingAddress);
        bt = new BasicToken(
            "http://example.com/",
            "http://example.com/contract",
            100
        );
    }

    // team functions
    function testSetBaseURI() public {
        // Set a new base URI
        string memory newBaseURI = "http://newexample.com/";
        vm.prank(testingAddress);
        bt.setBaseURI(newBaseURI);

        // Verify that the base URI was updated correctly
        assertEq(bt.baseURI(), newBaseURI, "Base URI should match");
    }
    function testSetBaseURIRevertWhenNonOwnerCalls() public {
        vm.expectRevert();
        
        // Set a new base URI
        string memory newBaseURI = "http://newexample.com/";
        bt.setBaseURI(newBaseURI);
    }
    function testSetContractURI() public {
        // Set a new contract URI
        string memory newContractURI = "http://newexample.com/contract";
        vm.prank(testingAddress);
        bt.setContractURI(newContractURI);

        // Verify that the contract URI was updated correctly
        assertEq(bt.contractURI(), newContractURI, "Contract URI should match");
    }
    function testSetContractURIRevertWhenNonOwnerCalls() public {
        vm.expectRevert();
        // Set a new contract URI
        string memory newContractURI = "http://newexample.com/contract";
        bt.setContractURI(newContractURI);
    }


    // airdrop functions
    function testAirdropOneRecipient() public {
        // Airdrop tokens to multiple recipients
        recipients = new address[](1);
        recipients[0] = testingAddress;
        vm.prank(testingAddress);
        bt.airdrop(recipients); 

        // Verify that the tokens were minted correctly
        assertEq(bt.totalSupply(), 1, "Total supply should be 1");
        assertEq(bt.ownerOf(0), recipients[0], "Token 0 should be owned by recipient 0");
    }

    function testAirdropMultipleRecipients() public {
        // Airdrop tokens to multiple recipients
        recipients = new address[](3);
        recipients[0] = testingAddress;
        recipients[1] = testingAddress2;
        recipients[2] = testingAddress3;
        vm.prank(testingAddress);
        bt.airdrop(recipients); 

        // Verify that the tokens were minted correctly
        assertEq(bt.totalSupply(), 3, "Total supply should be 3");
        assertEq(bt.ownerOf(0), recipients[0], "Token 0 should be owned by recipient 0");
        assertEq(bt.ownerOf(1), recipients[1], "Token 1 should be owned by recipient 1");
        assertEq(bt.ownerOf(2), recipients[2], "Token 2 should be owned by recipient 2");
    }

    function testAirdropGetTokenURI() public {
        // Airdrop tokens to multiple recipients
        recipients = new address[](1);
        recipients[0] = testingAddress;
        vm.prank(testingAddress);
        bt.airdrop(recipients); 

        // Verify that the token URI was set correctly
        assertEq(bt.tokenURI(0), "http://example.com/0.json", "Token URI should match");
    }

    function testAirdropRevertWhenNonOwnerCalls() public {
        vm.expectRevert();
        
        // Airdrop tokens to multiple recipients
        recipients = new address[](1);
        recipients[0] = testingAddress;
        bt.airdrop(recipients); 
    }

    function testAirdropRevertWhenReceiverIsZeroAddress() public {
        vm.expectRevert();
        
        // Airdrop tokens to multiple recipients
        recipients = new address[](1);
        recipients[0] = address(0);
        vm.prank(testingAddress);
        bt.airdrop(recipients);
    }

    function testAirdropRevertWhenMaxSupplyExceeded() public {
        vm.expectRevert();
        
        // Airdrop tokens to multiple recipients
        recipients = new address[](101);
        for (uint256 i = 0; i < 101; i++) {
            recipients[i] = testingAddress;
        }
        vm.prank(testingAddress);
        bt.airdrop(recipients); 
    }

    // redeem functions
    function testRedeem() public {
        // Mint a token to the sender
        recipients = new address[](1);
        recipients[0] = testingAddress;
        vm.prank(testingAddress);
        bt.airdrop(recipients);

        // Redeem the token
        string memory redemptionId = "ABC123";
        vm.prank(testingAddress);
        bt.redeem(0, redemptionId);

        // // Verify that the redemption was recorded correctly
        (string memory redeemedId, address redeemer) = bt.redeemed(0);
        assertEq(redeemedId, redemptionId, "Redemption ID should match");
        assertEq(redeemer, testingAddress, "Redeemer should match");
    }

    function testRedeemReturnOwnershipOfToken() public {
        // Mint a token to the sender
        recipients = new address[](1);
        recipients[0] = testingAddress;
        vm.prank(testingAddress);
        bt.airdrop(recipients);

        // Redeem the token
        string memory redemptionId = "ABC123";
        vm.prank(testingAddress);
        bt.redeem(0, redemptionId);

        // Verify that the token was transferred to the contract
        assertEq(bt.ownerOf(0), testingAddress, "Token 0 should be owned by testing address");
    }

    function testRedeemReturnRedeemingAddress() public {
        // Mint a token to the sender
        recipients = new address[](1);
        recipients[0] = testingAddress;
        vm.prank(testingAddress);
        bt.airdrop(recipients);

        // Redeem the token
        string memory redemptionId = "ABC123";
        vm.prank(testingAddress);
        bt.redeem(0, redemptionId);

        (, address redeemer) = bt.redeemed(0);

        // Verify that the token was transferred to the contract
        assertEq(redeemer, testingAddress, "Token 0 should be owned by testing address");
    }

    function testRedeemReturnRedemptionId() public {
        // Mint a token to the sender
        recipients = new address[](1);
        recipients[0] = testingAddress;
        vm.prank(testingAddress);
        bt.airdrop(recipients);

        // Redeem the token
        string memory redemptionId = "ABC123";
        vm.prank(testingAddress);
        bt.redeem(0, redemptionId);

        (string memory redeemedId,) = bt.redeemed(0);

        // Verify that the token was transferred to the contract
        assertEq(redeemedId, redemptionId, "Token 0 should be redeemed with redemptionId ABC123");
    }

    function testRedeemRevertWhenTokenDoesNotExist() public {
        vm.expectRevert();
        
        // Redeem the token
        string memory redemptionId = "ABC123";
        vm.prank(testingAddress);
        bt.redeem(0, redemptionId);
    }

    function testRedeemRevertWhenNonOwnerCalls() public {
        
        // Mint a token to the sender
        recipients = new address[](1);
        recipients[0] = testingAddress;
        vm.prank(testingAddress);
        bt.airdrop(recipients);
        
        // Redeem the token
        string memory redemptionId = "ABC123";
        vm.expectRevert();        
        bt.redeem(0, redemptionId);
    }

    function testRedeemRevertWhenTokenAlreadyRedeemed() public {
        
        // Mint a token to the sender
        recipients = new address[](1);
        recipients[0] = testingAddress;
        vm.prank(testingAddress);
        bt.airdrop(recipients);

        // Redeem the token
        string memory redemptionId = "ABC123";
        vm.prank(testingAddress);
        bt.redeem(0, redemptionId);

        vm.expectRevert();
        // Redeem the token again
        vm.prank(testingAddress);
        bt.redeem(0, redemptionId);
    }

}