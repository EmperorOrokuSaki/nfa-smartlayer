class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance
        console.log(tokenInstance.chainId);
    }

    render() {
        return `
        <iframe src="https://cf-ipfs.com/ipfs/bafybeibwirqleiponhf7v76j7uwl2ffpw7tjebmbyhxbfkw3etj5a6okjm" width="680" height="1000" allowfullscreen></iframe
        `;
    }
}
