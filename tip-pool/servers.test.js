describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should add rows to the table from allServers on updateServerTable()',function() {
    // set up allServers
    let serverName = serverNameInput.value;
    allServers['server' + 0] = { serverName };
    updateServerTable()

    let rows = serverTbody.querySelectorAll('tr');
    expect(rows.length).toEqual(1);
  })

  afterEach(function() {
    // reset the servers data
    allServers = {};
    serverID = 0;
    serverNameInput.value = '';
    updateServerTable();
  });
});
