describe('Web3 E2E Test', () => {
  it('opens website', () => {
    cy.visit('http://localhost:3000');
  })

  it('setup secret', () => {
    cy.get('input[placeholder*="password"]')
      .type('secret123')
      .should('have.value', 'secret123');

    cy.get('#saveButton').click();
  })

  it('button "Create" should be visible', () => {
    cy.get('#createButton').should('be.visible');
  })

  it('create a wallet', () => {
    cy.get('#createButton').click();
    cy.contains('Wallet address').should('be.visible');
  })

  it('private key is hidden', () => {
    cy.get('span[data-testid="private-key"]').should('have.text', '*****');
  })

  it('private key shows', () => {
    cy.get('#showButton').click();
    cy.get('span[data-testid="private-key"]').contains('0x').should('be.visible');
  })

  it('balance should be loaded', () => {
    cy.wait(500); // wait async request
    cy.get('span[data-testid="balance"]').should('have.text', '0');
  })

  it('restore after reload', () => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('keystore', '[{"address":"0xF2cf6859Ba8a00c25f38CAB26B82c15a41763a2E"}]');
        window.localStorage.setItem('web3js_wallet', '[{"version":3,"id":"eeed09d4-9887-47f7-b3ec-2c7e84d71cf0","address":"f2cf6859ba8a00c25f38cab26b82c15a41763a2e","crypto":{"ciphertext":"9bf8abf90aedad4aaf5643af0ee3a842b09095c2e8ee858dd64cb5bfad93dc0e","cipherparams":{"iv":"c322e59c77e7c6941bc9bcadbfa4ed5c"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"1fce212cbde9f7152186ae6dfc1040ad285cbce32060b43d78eaef0a94c07358","n":8192,"r":8,"p":1},"mac":"8b50736de459ad83052c41e416e493cbedc9e78c326958fb1a903174347a5024"}}]');
      }
    })

    cy.contains('Wallet address').should('be.visible');
    cy.contains('Wallet address').children('span').should('have.text', '0xF2cf6859Ba8a00c25f38CAB26B82c15a41763a2E');
  })


  it('wrong password case', () => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('keystore', '[{"address":"0xF2cf6859Ba8a00c25f38CAB26B82c15a41763a2E"}]');
        window.localStorage.setItem('web3js_wallet', '[{"version":3,"id":"eeed09d4-9887-47f7-b3ec-2c7e84d71cf0","address":"f2cf6859ba8a00c25f38cab26b82c15a41763a2e","crypto":{"ciphertext":"9bf8abf90aedad4aaf5643af0ee3a842b09095c2e8ee858dd64cb5bfad93dc0e","cipherparams":{"iv":"c322e59c77e7c6941bc9bcadbfa4ed5c"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"1fce212cbde9f7152186ae6dfc1040ad285cbce32060b43d78eaef0a94c07358","n":8192,"r":8,"p":1},"mac":"8b50736de459ad83052c41e416e493cbedc9e78c326958fb1a903174347a5024"}}]');
      }
    })

    cy.wait(300); // wait async request

    cy.get('input[placeholder*="password"]')
      .type('wrongsecret');

    cy.get('#showButton').click();
    cy.contains('Wrong password').should('be.visible');
  })
})