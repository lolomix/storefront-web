/* test/sample-test.js */
describe("NFT", function() {
  it("Should create and execute market sales", async function() {
    /* deploy the NFT contract */
    const Market = await ethers.getContractFactory("Market")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    /* deploy the NFT contract */
    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress, "Blockparty NFT", "BNFT")
    await nft.deployed()
    const nftAddress = nft.address

    const tokenId = await nft.createToken("https://blockparty.co/img/white-with-green-logo.ea6b87d3.svg")

    const [something, buyersAddress] = await ethers.getSigners()

    console.log('NFT: ', nftAddress)
    console.log('NFT: ', tokenId)
    console.log('Signers LEFT: ', something)
    console.log('Signers RIGHT: ', something)
  })
})