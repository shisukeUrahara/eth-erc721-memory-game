const { assert } = require('chai');

const MemoryToken = artifacts.require('./MemoryToken.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Memory Token', (accounts) => {
  // code goes here...
  let token;

  before(async ()=>{
    token= await MemoryToken.deployed();
  })

  describe('deployment',async ()=>{

    it('shoudl deploy contract properly',async ()=>{
     // get the contract instance

     let address= token.address;

     assert.notEqual(address,'');
     assert.notEqual(address,null);
     assert.notEqual(address,undefined);
     assert.notEqual(address,0x0);
    })

    it('should have the correct name',async ()=>{
      let name= await token.name();

      assert.equal(name,"Memory Token");
    });

    it('should have the correct symbol', async ()=>{
      let symbol= await token.symbol();

      assert.equal(symbol,"MRT");
    })
  })

  describe("token distribution" , async ()=>{
    let result;

    it("mints tokens",async ()=>{
     await token.mint(accounts[0],"https://www.token-uri.com/nft");
 
     // check that total supply is increment
     result = await token.totalSupply();
     assert.equal(result.toString(),"1","total Supply is increment");

     // check that user's token count is incremented
     result= await token.balanceOf(accounts[0]);
     assert.equal(result.toString(),"1","user token balance is updated ");

     // check that accounts [0] is the owner of newly minted token
     result = await token.ownerOf("1");
     assert.equal(result.toString(),accounts[0].toString(),"Onwer is correct");

    //  result = await token.token

    let balance= await token.balanceOf(accounts[0]);
    let tokenIds=[];

    for (let i=0;i<balance;i++){
    let id= await token.tokenOfOwnerByIndex(accounts[0],i);
    tokenIds.push(id.toString());
    }
    
    let expectedArray=['1'];

    assert.equal(expectedArray.toString(),tokenIds.toString(),"Token Ids are correct");

    // check that token URI is correct
    let tokenURI= await token.tokenURI("1");
    assert.equal(tokenURI,"https://www.token-uri.com/nft");


    })
  })
})
